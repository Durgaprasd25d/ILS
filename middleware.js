export default async function middleware(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  
  // Check if the request is coming from the custom domain
  if (hostname === 'interiqinteriors.com' || hostname === 'www.interiqinteriors.com') {
    // Serve the "Under Work Process" page
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>INTERIQ INTERIORS - Under Construction</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      color: #ffffff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }
    
    body::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at 20% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(201, 169, 97, 0.08) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .container {
      max-width: 800px;
      text-align: center;
      position: relative;
      z-index: 1;
      animation: fadeIn 1s ease-in;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .logo {
      font-family: 'Playfair Display', serif;
      font-size: 48px;
      font-weight: 700;
      letter-spacing: 0.15em;
      margin-bottom: 10px;
      color: #c9a961;
      text-shadow: 0 2px 20px rgba(201, 169, 97, 0.3);
    }
    
    .subtitle {
      font-size: 12px;
      letter-spacing: 0.4em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 60px;
    }
    
    .divider {
      width: 80px;
      height: 1px;
      background: linear-gradient(90deg, transparent, #c9a961, transparent);
      margin: 40px auto;
    }
    
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 42px;
      font-weight: 400;
      line-height: 1.3;
      margin-bottom: 20px;
      color: #ffffff;
    }
    
    p {
      font-size: 18px;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 30px;
    }
    
    .status {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(201, 169, 97, 0.1);
      border: 1px solid rgba(201, 169, 97, 0.3);
      padding: 12px 24px;
      border-radius: 2px;
      margin-top: 40px;
      font-size: 13px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #c9a961;
    }
    
    .status::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #c9a961;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.2);
      }
    }
    
    .contact {
      margin-top: 60px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
    }
    
    .contact a {
      color: #c9a961;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .contact a:hover {
      color: #d4bc85;
    }
    
    @media (max-width: 768px) {
      .logo {
        font-size: 36px;
      }
      
      h1 {
        font-size: 32px;
      }
      
      p {
        font-size: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">INTERIQ</div>
    <div class="subtitle">INTERIORS</div>
    
    <div class="divider"></div>
    
    <h1>Crafting Your Digital Experience</h1>
    <p>Our website is currently undergoing a premium transformation to better showcase our luxury interior design services. We're refining every detail to provide you with an exceptional online experience.</p>
    
    <div class="status">
      Under Construction
    </div>
    
    <div class="contact">
      For inquiries, please contact us at <a href="mailto:info@interiqinteriors.com">info@interiqinteriors.com</a>
    </div>
  </div>
</body>
</html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=0, must-revalidate',
        },
      }
    );
  }
  
  // For Vercel default domain and all other requests, continue normally
  // Return null to let Vercel serve the static files
  return null;
}

export const config = {
  matcher: '/:path*',
};
