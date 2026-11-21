import React from 'react';

export const WebsiteSchema = ({ url = 'https://rentthevastra.com' }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RentTheVastra',
    description: 'Rent premium designer fashion wear in Delhi NCR. Discover ethnic, western, and bridal outfits.',
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const LocalBusinessSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'RentTheVastra',
    image: 'https://rentthevastra.com/images/logo.png',
    '@id': 'https://rentthevastra.com',
    url: 'https://rentthevastra.com',
    telephone: '+91-11-00000000',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Connaught Place',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6304,
      longitude: 77.2177
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const ProductSchema = ({ product, url }: { product: any, url: string }) => {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title || product.name,
    image: product.images || [product.image],
    description: product.description,
    sku: product.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: 'RentTheVastra'
    },
    offers: {
      '@type': 'Offer',
      url: url,
      priceCurrency: 'INR',
      price: product.rental_price_3d || product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'RentTheVastra'
      }
    }
  };
  
  if (product.rating && product.review_count) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.review_count
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const BreadcrumbSchema = ({ items }: { items: { name: string, url: string }[] }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const FAQSchema = ({ faqs }: { faqs: { question: string, answer: string }[] }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
