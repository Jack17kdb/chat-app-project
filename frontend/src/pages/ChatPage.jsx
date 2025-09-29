import React, { useState, useEffect, useRef } from "react";



const ChatPage = () => {

    const [messages, setMessages] = useState([

        { id: 1, name: "Justin", avatar: "https://i.pravatar.cc/40?img=3", text: "Hi, how are you? 🙂", online: true },

        { id: 2, name: "Alan", avatar: "https://i.pravatar.cc/40?img=5", text: " Am well, wty?  🫡", online: false },

        { id: 3, name: "System", avatar: "https://justin.jpg", text: "⚡ Project developed by Justin", online: true },

    ]);



    const [newMessage, setNewMessage] = useState("");

    const [typing, setTyping] = useState(false);

    const audioRef = useRef(null);



    // Typing indicator simulation

    useEffect(() => {

        if (newMessage.length > 0) {

            setTyping(true);

        } else {

            setTyping(false);

        }

    }, [newMessage]);



    // Sound on new message

    useEffect(() => {

        if (messages.length > 3) {

            audioRef.current.play();

        }

    }, [messages]);



    const handleSend = (e) => {

        e.preventDefault();

        if (!newMessage.trim()) return;



        const newMsg = {

            id: Date.now(),

            name: "You",

            avatar: "https://i.pravatar.cc/40?img=10",

            text: newMessage,

            online: true,

        };

        setMessages([...messages, newMsg]);

        setNewMessage("");

    };



    return (

        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4">



            {/* Header */}

            <header className="py-4 px-6 flex items-center justify-between border-b border-gray-700">

                <h1 className="text-2xl font-bold text-cyan-400">💬 Chat Room</h1>



                {/* Right-side menu */}

                <div className="flex items-center gap-4">

                    <a

                        href="/status"

                        className="px-3 py-1 rounded-lg bg-gray-800/70 hover:bg-cyan-500 hover:text-gray-900 transition text-sm"

                    >

                        👤 Profile

                    </a>

                    <a

                        href="/profile"

                        className="px-3 py-1 rounded-lg bg-gray-800/70 hover:bg-cyan-500 hover:text-gray-900 transition text-sm"

                    >

                        ⚙ Settings

                    </a>

                    <a

                        href="/"

                        className="px-3 py-1 rounded-lg bg-gray-800/70 hover:bg-cyan-500 hover:text-gray-900 transition text-sm"

                    >

                        💬 New Chat

                    </a>

                    <a

                        href="/chat-ai"

                        className="px-3 py-1 rounded-lg bg-gray-800/70 hover:bg-cyan-500 hover:text-gray-900 transition text-sm"

                    >

                        🤖 Chat AI

                    </a>

                </div>

            </header>



            {/* Chat messages */}

            <div className="flex-1 overflow-y-auto p-6 space-y-4">

                {messages.map((msg) => (

                    <div

                        key={msg.id}

                        className={`flex items-start gap-3 ${

                            msg.name === "You" ? "justify-end" : "justify-start"

                        }`}

                    >

                        {msg.name !== "You" && (

                            <img

                                src={msg.avatar}

                                alt="avatar"

                                className="w-10 h-10 rounded-full border-2 border-cyan-500"

                            />

                        )}

                        <div

                            className={`p-4 rounded-xl shadow-lg max-w-xs ${

                                msg.name === "You"

                                    ? "bg-cyan-500 text-gray-900"

                                    : "bg-gray-800/70 border border-gray-700 text-white"

                            }`}

                        >

                            <div className="flex items-center justify-between mb-1">

                                <span className="font-semibold text-sm">{msg.name}</span>

                                {msg.name !== "System" && (

                                    <span

                                        className={`text-xs ${

                                            msg.online ? "text-green-400" : "text-red-400"

                                        }`}

                                    >

                    {msg.online ? "🟢 Online" : "🔴 Offline"}

                  </span>

                                )}

                            </div>

                            <p>{msg.text}</p>

                        </div>

                        {msg.name === "You" && (

                            <img

                                src={msg.avatar}

                                alt="avatar"

                                className="w-10 h-10 rounded-full border-2 border-cyan-500"

                            />

                        )}

                    </div>

                ))}



                {/* Typing indicator */}

                {typing && (

                    <div className="flex items-center gap-2 text-gray-400 text-sm animate-pulse">

                        <span>Someone is typing</span>

                        <span className="dot">...</span>

                    </div>

                )}

            </div>



            {/* Divider */}

            <hr className="border-gray-700" />



            {/* Chat input */}

            <form

                onSubmit={handleSend}

                className="flex items-center gap-3 p-4 fixed bottom-0 w-full bg-gray-900/70 border-t border-gray-700"

            >
                <div className="">
                    <input

                        type="text"

                        name="message"

                        value={newMessage}

                        onChange={(e) => setNewMessage(e.target.value)}

                        placeholder="Text Console 📩🇰🇪..."

                        className="flex-1 px-6 py-3 ml-100 w-[800px] rounded-xl bg-gray-800 text-white border border-gray-600 focus:border-cyan-400 focus:ring focus:ring-cyan-500/40 outline-none"

                    />

                    <button

                        type="submit"

                        className="px-6 py-3 ml-3 bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold rounded-xl shadow-md transition"

                    >

                        Send

                    </button>
                </div>

            </form>



            {/* Footer */}

            <footer className="py-4 text-center text-xs text-gray-500">

                © {new Date().getFullYear()} MyChatApp (Justin). All rights reserved.

            </footer>



            {/* Notification sound */}

            <audio ref={audioRef} src="https://assets.mixkit.co/sfx/download/mixkit-message-pop-alert-2354.wav" />

        </div>

    );

};



export default ChatPage;