const notFoundMiddleware = (req, res) => {
  res.status(404).send(`
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>404 | Insurance Management API</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Poppins,sans-serif;
}

body{
background:linear-gradient(135deg,#2563eb,#0f172a);
height:100vh;
display:flex;
justify-content:center;
align-items:center;
padding:30px;
}

.card{
background:#fff;
max-width:700px;
width:100%;
padding:50px;
border-radius:25px;
box-shadow:0 20px 50px rgba(0,0,0,.25);
text-align:center;
}

h1{
font-size:90px;
color:#2563eb;
margin-bottom:10px;
}

h2{
font-size:32px;
margin-bottom:15px;
color:#1e293b;
}

p{
font-size:18px;
color:#64748b;
margin-bottom:35px;
}

.links{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
gap:15px;
}

a{
text-decoration:none;
padding:15px;
border-radius:12px;
background:#2563eb;
color:#fff;
font-weight:600;
transition:.3s;
}

a:hover{
background:#1d4ed8;
transform:translateY(-3px);
}

.footer{
margin-top:40px;
font-size:14px;
color:#94a3b8;
}

</style>

</head>

<body>

<div class="card">

<h1>404</h1>

<h2>Endpoint Not Found</h2>

<p>
The endpoint you are looking for does not exist.
</p>

<div class="links">

<a href="/">
🏠 API Home
</a>

<a href="/api-docs">
📘 Swagger
</a>

<a href="/health">
💚 Health Check
</a>

</div>

<div class="footer">

Insurance Management System API

<br><br>

Version 1.0.0

<br><br>

Developed by <strong>Aayush Mahadik</strong>

</div>

</div>

</body>

</html>
`);
};

export default notFoundMiddleware;s