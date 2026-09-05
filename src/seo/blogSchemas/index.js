// src/seo/blogSchemas/index.js
const BASE_URL = "https://www.mrssupplychain.com";
const LOGO_URL = `${BASE_URL}/assets/MRS-Logo-8bef6X_s.svg`;

// Feature image paths contain spaces and typographic apostrophes
// ("Blog_img/... Mundra’s Renewable Energy.png"). Those must be
// percent-encoded or the resulting "image" value is not a fetchable URL.
const toAbsoluteImageUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const encoded = path
    .replace(/^\/+/, "")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${BASE_URL}/${encoded}`;
};

export const generateBlogSchema = (post) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${BASE_URL}/blog/${post.slug}`,
  },
  headline: post.title,
  description: post.metaDescription,
  image: toAbsoluteImageUrl(post.featureImage),
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
  dateModified: post.updatedDate || post.publishDate,
});
