import markdownItImageFigures from 'markdown-it-image-figures';
import markdownItAttrs from 'markdown-it-attrs';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import Image from '@11ty/eleventy-img';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function(eleventyConfig) {
  // Configure markdown-it with attrs and image figures plugins
  eleventyConfig.amendLibrary('md', mdLib => {
    mdLib.use(markdownItAttrs);
    mdLib.use(markdownItImageFigures, {
      figcaption: 'title',  // Use title attribute for caption, preserving alt text
      copyAttrs: 'class'    // Copy class attributes to figure element
    });
  });

  // Add Eleventy Image Transform Plugin
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: 'html',
    formats: ['webp', 'jpeg'], // WebP for modern browsers, JPEG fallback
    widths: [400, 800, 1200],  // Mobile, tablet, desktop
    defaultAttributes: {
      loading: 'lazy',
      decoding: 'async',
      sizes: '(min-width: 1024px) 920px, 100vw'
    },
    urlPath: '/blog/',
    outputDir: './_site/blog/',
    cacheOptions: {
      duration: '1d',
      directory: '.cache',
      removeUrlQueryParams: false,
    }
  });

  // Copy static assets to output directory
  eleventyConfig.addPassthroughCopy('src/images');
  eleventyConfig.addPassthroughCopy('*.png');
  eleventyConfig.addPassthroughCopy('*.svg');
  eleventyConfig.addPassthroughCopy('*.ico');
  eleventyConfig.addPassthroughCopy('*.webmanifest');
  eleventyConfig.addPassthroughCopy('CNAME');
  eleventyConfig.addPassthroughCopy('robots.txt');

  // Add custom groupBy filter
  eleventyConfig.addFilter('groupby', (array, key) => {
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
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    if (!dateObj) return '';
    // If it's already a Date object, use it directly
    // If it's a string, parse it as UTC to avoid timezone issues
    const date = dateObj instanceof Date ? dateObj : new Date(dateObj + 'T00:00:00Z');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    if (!dateObj) return '';
    const date = new Date(dateObj);
    return date.toISOString().split('T')[0];
  });

  // Add reading time filter
  // Calculates estimated reading time based on word count
  // Average reading speed: 200 words per minute
  eleventyConfig.addFilter('readingTime', (content) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  });

  // Add OG image processing filter
  // Generates optimized Open Graph images (1200x630) from relative paths
  eleventyConfig.addFilter('ogImage', async function(imagePath, pageInputPath) {
    if (!imagePath) return null;

    // If it's already an absolute URL, return as-is
    if (imagePath.startsWith('http') || imagePath.startsWith('//')) {
      return imagePath;
    }

    // If it's already an absolute path from site root, convert to file system path
    let inputPath;
    if (imagePath.startsWith('/')) {
      inputPath = path.join(__dirname, 'src', imagePath);
    } else {
      // Relative path - resolve relative to the page's directory
      const pageDir = path.dirname(pageInputPath);
      inputPath = path.join(pageDir, imagePath);
    }

    try {
      // Generate OG-optimized image (1200x630 for optimal social sharing)
      const metadata = await Image(inputPath, {
        widths: [1200],
        formats: ['jpeg'],
        outputDir: './_site/images/og/',
        urlPath: '/images/og/',
        sharpJpegOptions: {
          quality: 90,
        },
        filenameFormat: function (id, src, width, format) {
          const extension = path.extname(src);
          const name = path.basename(src, extension);
          return `${name}-${id}.${format}`;
        },
        cacheOptions: {
          duration: '1d',
          directory: '.cache',
        }
      });

      // Return the URL of the generated image
      return metadata.jpeg[0].url;
    } catch (error) {
      console.error(`Error processing OG image ${imagePath}:`, error);
      return null;
    }
  });

  // Create collection for blog posts
  eleventyConfig.addCollection('blog', (collectionApi) => {
    return collectionApi.getFilteredByGlob('src/blog/**/*.md');
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data'
    },
    templateFormats: ['njk', 'md', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
}
