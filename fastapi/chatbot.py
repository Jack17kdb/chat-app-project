from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import random

app = FastAPI()

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")

class ChatRequest(BaseModel):
    message: str = ""

@app.post("/chat")
async def chat(request: ChatRequest):
    input_text = request.message
    inputs = tokenizer(input_text, return_tensors="pt")
    reply_ids = model.generate(**inputs, max_length=50)
    reply = tokenizer.decode(reply_ids[:, inputs["input_ids"].shape[-1]:][0], skip_special_tokens=True)
    return {"reply": reply}


@app.post("/suggestions")
async def get_suggestions(request: ChatRequest):
    input_text = request.message or "continue conversation"

    inputs = tokenizer(input_text, return_tensors="pt")
    reply_ids = model.generate(**inputs, max_length=100, num_return_sequences=1, do_sample=True)
    reply_text = tokenizer.decode(reply_ids[0], skip_special_tokens=True)

    sentences = [s.strip() for s in reply_text.split(".") if len(s.strip()) > 5]
    random.shuffle(sentences)
    suggestions = sentences[:3] if len(sentences) >= 3 else sentences + ["Tell me more!", "What do you think?", "That's interesting!"]

    return {"suggestions": suggestions[:3]}
