export default async function middleware(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  
  // Check if the request is coming from the custom domain
if (hostname === 'interiqinteriors.com' || hostname === 'www.interiqinteriors.com') {
  return new Response(
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Website Not Available</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0f0f0f;
      color: #eaeaea;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .message {
      text-align: center;
      font-size: 14px;
      color: #cfcfcf;
    }
    .status {
      margin-top: 10px;
      font-size: 12px;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="message">
    <div>This domain is not connected to any hosting service.</div>
    <div class="status">Hosting not configured</div>
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
