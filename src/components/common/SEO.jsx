import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Yan BTY';
const BASE_URL = 'https://www.yanbty.ma';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=1200&q=85';

export default function SEO({
  title,
  description = "Morocco's premium multi-brand beauty destination. Discover makeup, skincare, fragrance and more from the world's finest brands alongside Yan&One, our signature collection.",
  image = DEFAULT_IMAGE,
  path = '',
  type = 'website',
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Be You`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="fr_MA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: BASE_URL,
        description,
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/shop?search={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      })}</script>
    </Helmet>
  );
}
