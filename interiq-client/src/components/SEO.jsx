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
  canonical 
}) => {
  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
    </>
  );
};

export default SEO;
