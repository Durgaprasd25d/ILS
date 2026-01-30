export default async function middleware(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  
  // Check if the request is coming from the custom domain
if (hostname === 'interiqinteriors.com' || hostname === 'www.interiqinteriors.com') {
  return new Response(
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>INTERIQ INTERIORS - Hosting Not Connected</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
      color: #fff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      max-width: 780px;
      text-align: center;
      animation: fadeIn 0.8s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .logo {
      font-family: 'Playfair Display', serif;
      font-size: 44px;
      letter-spacing: 0.15em;
      color: #c9a961;
      margin-bottom: 8px;
    }

    .subtitle {
      font-size: 12px;
      letter-spacing: 0.4em;
      color: rgba(255,255,255,0.6);
      margin-bottom: 50px;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 40px;
      margin-bottom: 20px;
      font-weight: 400;
    }

    p {
      font-size: 18px;
      line-height: 1.7;
      color: rgba(255,255,255,0.75);
      margin-bottom: 30px;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 26px;
      border: 1px solid rgba(201,169,97,0.35);
      background: rgba(201,169,97,0.12);
      color: #c9a961;
      font-size: 13px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }

    .status::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #c9a961;
      border-radius: 50%;
    }

    .contact {
      margin-top: 50px;
      font-size: 14px;
      color: rgba(255,255,255,0.55);
    }

    .contact a {
      color: #c9a961;
      text-decoration: none;
    }

    .contact a:hover {
      color: #d4bc85;
    }

    @media (max-width: 768px) {
      h1 { font-size: 30px; }
      p { font-size: 16px; }
      .logo { font-size: 34px; }
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="logo">INTERIQ</div>
    <div class="subtitle">INTERIORS</div>

    <h1>Website Not Connected</h1>

    <p>
      This domain is currently not connected to any hosting or backend services.
      To activate this website, please purchase hosting and complete the required service configuration.
    </p>

    <div class="status">Hosting Not Configured</div>

    <div class="contact">
      Need assistance? Contact
      <a href="mailto:info@interiqinteriors.com">info@interiqinteriors.com</a>
    </div>
  </div>

</body>
</html>`,
{
  status: 200,
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store'
  }
});
}

  
  // For Vercel default domain and all other requests, continue normally
  // Return null to let Vercel serve the static files
  return null;
}

export const config = {
  matcher: '/:path*',
};
