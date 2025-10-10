export const notFound = (req, res, next) => {
  res.status(404).send(`
    <html>
    <head>
    <title>404 - Page Not Found</title>
    <style>
    body {
        background: linear-gradient(135deg, #0f172a, #1e293b, #111827);
        color: #e2e8f0;
        font-family: 'Inter', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
    }
    .container {
        text-align: center;
        background: rgba(30, 41, 59, 0.7);
        padding: 3rem 4rem;
        border-radius: 1rem;
        border: 1px solid #334155;
        box-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
    }
    h1 {
        font-size: 3rem;
        color: #22d3ee;
        margin-bottom: 1rem;
    }
    p {
        font-size: 1.2rem;
        color: #94a3b8;
        margin-bottom: 2rem;
    }
    a {
        display: inline-block;
        background: #06b6d4;
        color: #0f172a;
        padding: 0.8rem 1.5rem;
        border-radius: 0.5rem;
        text-decoration: none;
        font-weight: 600;
        transition: background 0.3s;
    }
    a:hover {
        background: #0891b2;
    }
    </style>
    </head>
    <body>
    <div class="container">
    <h1>404</h1>
    <p>Oops! The page you’re looking for doesn’t exist.</p>
    </div>
    </body>
    </html>
    `);
};
