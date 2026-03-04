import React from 'react';

/**
 * Reusable SEO component for React 19.
 * React 19 automatically hoists <title>, <meta>, and <link> tags to the <head>.
 */
const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  ogImage,
  ogType = 'website',
  ogUrl,
  canonical,
  twitterHandle = '@interiqinteriors'
}) => {
  const siteName = 'INTERIQ INTERIORS';
  
  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={siteName} />
      {ogType && <meta property="og:type" content={ogType} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
      {ogTitle && <meta name="twitter:title" content={ogTitle} />}
      {ogDescription && <meta name="twitter:description" content={ogDescription} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </>
  );
};

export default SEO;
