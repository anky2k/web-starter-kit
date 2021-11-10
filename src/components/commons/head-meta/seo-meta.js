import React from 'react';
import { NextSeo, VideoJsonLd } from 'next-seo';

// This link relation is used to indicate a relation between a desktop and a mobile website to search engines.

// mobileAlternate={{
//   media: 'only screen and (max-width: 640px)',
//   href: 'https://m.canonical.ie',
// }}

// language alternates

// languageAlternates={[{
//   hrefLang: 'de-AT',
//   href: 'https://www.canonical.ie/de',
// }]}

const defaultMeta = {
  title: 'Download Games',
  // eslint-disable-next-line max-len
  description: 'Buy games and enjoy uninterrupted fun playing them',
  canonical: 'http://localhost:3000/',
  openGraph: {
    url: 'http://localhost:3000/',
    title: 'Download Games',
    // eslint-disable-next-line max-len
    description: 'Buy games and enjoy uninterrupted fun playing them',
    images: [
      {
        url: 'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg',
        width: 800,
        height: 600,
        alt: 'localhost'
      },
      {
        url: 'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg',
        width: 900,
        height: 800,
        alt: 'localhost'
      },
      { url: 'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg' },
      { url: 'https://prismic-io.s3.amazonaws.com/gary-blog%2F3297f290-a885-4cc6-9b19-3235e3026646_default.jpg' }
    ],
    site_name: 'localhost'
  },
  twitter: {
    handle: '@localhost',
    site: '@localhost',
    cardType: 'summary_large_image'
  }
};

const SeoMeta = ({ data = {} }) => {
  const meta = { ...defaultMeta, ...data };
  return (
    <NextSeo
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...meta}
    />
  );
};

const DonotIndex = () => (<NextSeo noindex />);

export {
  SeoMeta,
  DonotIndex,
  VideoJsonLd
};
