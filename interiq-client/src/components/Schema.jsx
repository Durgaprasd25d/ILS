import React from 'react';

/**
 * Reusable Schema component for React 19.
 * Injects JSON-LD structured data into the <head>.
 */
const Schema = ({ type, data }) => {
  const buildSchema = () => {
    if (type === "LocalBusiness") {
      return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "INTERIQ INTERIORS",
        "image": "https://interiqinteriors.com/logo.png",
        "@id": "https://interiqinteriors.com",
        "url": "https://interiqinteriors.com",
        "telephone": "+919437222340",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Janpath Road, Saheed Nagar",
          "addressLocality": "Bhubaneswar",
          "postalCode": "751007",
          "addressRegion": "Odisha",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 20.2847,
          "longitude": 85.8412
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "10:00",
          "closes": "20:00"
        },
        "sameAs": [
          "https://www.facebook.com/interiqinteriors",
          "https://www.instagram.com/interiqinteriors",
          "https://wa.me/919437222340"
        ],
        ...data
      };
    }

    if (type === "BreadcrumbList") {
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": (Array.isArray(data) ? data : []).map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
    }

    if (type === "BlogPosting") {
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": data?.url
        },
        "headline": data?.title,
        "description": data?.description,
        "image": data?.image,  
        "author": {
          "@type": "Person",
          "name": data?.author || "Arjun S."
        },  
        "publisher": {
          "@type": "Organization",
          "name": "INTERIQ INTERIORS",
          "logo": {
            "@type": "ImageObject",
            "url": "https://interiqinteriors.com/logo.png"
          }
        },
        "datePublished": data?.date
      };
    }

    return data;
  };

  const schemaData = buildSchema();

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  );
};

export default Schema;
