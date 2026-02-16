import allPosts from './allPosts.js';

export default function() {
  const posts = allPosts();

  // Extract unique categories from posts
  const categorySet = new Set();
  posts.forEach(post => {
    if (post.category) {
      categorySet.add(post.category);
    }
  });

  // Return array of category objects with their posts
  return Array.from(categorySet).map(category => {
    const categoryPosts = posts.filter(post => post.category === category);
    return {
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, '-'),
      posts: categoryPosts
    };
  });
}
