// src/seo/blogSchemas/index.js
const BASE_URL = "https://www.mrssupplychain.com";
const LOGO_URL = `${BASE_URL}/assets/MRS-Logo-8bef6X_s.svg`;

export const generateBlogSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${BASE_URL}/blog/${post.slug}`,
  },
  headline: post.title,
  description: post.metaDescription,
  image: `${BASE_URL}/${post.featureImage}`,
  author: {
    "@type": "Organization",
    name: "MRS Supply Chain",
    url: `${BASE_URL}/`,
  },
  publisher: {
    "@type": "Organization",
    name: "MRS Supply Chain",
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
  },
  datePublished: post.publishDate,
  dateModified: post.publishDate,
});
