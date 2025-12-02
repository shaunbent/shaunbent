import { readFileSync, readdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function() {
  // Read external posts from JSON file
  const postsPath = join(__dirname, 'posts.json');
  const externalPosts = JSON.parse(readFileSync(postsPath, 'utf-8'));

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
          description: data.description || data.subtitle || ''
        };
      }
      // Handle new directory structure with index.md
      else if (entry.isDirectory()) {
        const indexPath = join(blogDir, entry.name, 'index.md');
        if (existsSync(indexPath)) {
          const fileContent = readFileSync(indexPath, 'utf-8');
          const { data } = matter(fileContent);

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
            description: data.description || data.subtitle || ''
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

  // Sort by year (descending), then by title
  return allPosts.sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }
    return a.title.localeCompare(b.title);
  });
}
