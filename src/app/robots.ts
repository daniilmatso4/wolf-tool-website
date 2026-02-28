import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wolfpack.ai';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/account', '/download', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
