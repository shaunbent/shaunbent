import markdownItImplicitFigures from 'markdown-it-implicit-figures';

export default function(eleventyConfig) {
  // Configure markdown-it with implicit figures plugin
  eleventyConfig.amendLibrary("md", mdLib => {
    mdLib.use(markdownItImplicitFigures, {
      figcaption: true,  // Enable figcaption from alt text or title
      copyAttrs: 'class' // Copy class attributes to figure element
    });
  });

  // Copy static assets to output directory
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("*.svg");
  eleventyConfig.addPassthroughCopy("*.ico");
  eleventyConfig.addPassthroughCopy("*.webmanifest");
  eleventyConfig.addPassthroughCopy("CNAME");

  // Add custom groupBy filter
  eleventyConfig.addFilter("groupby", (array, key) => {
    const groups = {};
    array.forEach(item => {
      const groupKey = item[key];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
    });
    return Object.entries(groups);
  });

  // Add date filters for article pages
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return '';
    const date = new Date(dateObj);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (!dateObj) return '';
    const date = new Date(dateObj);
    return date.toISOString().split('T')[0];
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}
