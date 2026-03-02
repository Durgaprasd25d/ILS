export default async function middleware(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  
  // If request is from the custom domain, allow complete website
  if (hostname === 'interiqinteriors.com' || hostname === 'www.interiqinteriors.com') {
    return null; // Continue to the website
  }

  // For all other domains (including Vercel preview URLs), show the restricted message
  return new Response(
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Under Development</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      background: #050505;
      color: #c9a961;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }
    .container {
      padding: 40px;
      border: 1px solid rgba(201, 169, 97, 0.2);
      max-width: 400px;
    }
    .message {
      font-size: 18px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .status {
      font-size: 12px;
      color: rgba(255,255,255,0.4);
      letter-spacing: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="message">Private Access Only</div>
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

export const config = {
  matcher: '/:path*',
};
