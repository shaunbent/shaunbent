import { readFileSync, readdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function() {
  // Read external posts from JSON file
  const postsPath = join(__dirname, 'posts.json');
  const externalPosts = JSON.parse(readFileSync(postsPath, 'utf-8')).map(post => {
    const postDate = post.date ? new Date(post.date + 'T00:00:00Z') : null;
    return {
      ...post,
      date: postDate
        ? postDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC'
          })
        : post.date,
      rawDate: postDate
    };
  });

  // Read blog posts from src/blog directory
  const blogDir = join(__dirname, '../blog');
  let internalPosts = [];

  try {
    const files = readdirSync(blogDir, { withFileTypes: true });

    internalPosts = files.flatMap(entry => {
      // Handle legacy .md files directly in blog directory
      if (entry.isFile() && extname(entry.name) === '.md') {
        const filePath = join(blogDir, entry.name);
        const fileContent = readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        // Skip unlisted posts
        if (data.unlisted === true) {
          return [];
        }

        const postDate = data.date ? new Date(data.date) : new Date();
        const url = `/blog/${entry.name.replace('.md', '')}/`;

        return {
          year: postDate.getFullYear(),
          title: data.title,
          url: url,
          date: postDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
          }),
          rawDate: postDate,
          description: data.description || data.subtitle || '',
          category: data.category || null
        };
      }
      // Handle new directory structure with index.md
      else if (entry.isDirectory()) {
        const indexPath = join(blogDir, entry.name, 'index.md');
        if (existsSync(indexPath)) {
          const fileContent = readFileSync(indexPath, 'utf-8');
          const { data } = matter(fileContent);

          // Skip unlisted posts
          if (data.unlisted === true) {
            return [];
          }

          const postDate = data.date ? new Date(data.date) : new Date();
          const url = `/blog/${entry.name}/`;

          return {
            year: postDate.getFullYear(),
            title: data.title,
            url: url,
            date: postDate.toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            }),
            rawDate: postDate,
            description: data.description || data.subtitle || '',
            category: data.category || null
          };
        }
      }
      return [];
    });
  } catch (err) {
    // Blog directory doesn't exist yet or is empty
    console.log('No blog posts found');
  }

  // Merge external and internal posts
  const allPosts = [...externalPosts, ...internalPosts];

  // Sort by year (descending), then by date (descending)
  return allPosts.sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }
    // If both have rawDate, sort by date descending
    if (a.rawDate && b.rawDate) {
      return b.rawDate - a.rawDate;
    }
    return 0;
  });
}
