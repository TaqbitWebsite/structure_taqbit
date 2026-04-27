// blog-data.js - Modern ES Module version

// Import createClient from Sanity (named import)
import { createClient } from 'https://esm.sh/@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: 'c4hmiq4c',
  dataset: 'production',
  apiVersion: '2025-07-28',
  useCdn: true
});

// Fetch blog posts function
export async function fetchBlogPosts() {
  try {
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      publishedAt,
      "mainImage": mainImage.asset->url,
      estimatedReadingTime,
      categories[]->{title}
    }[0...20]`;
    
    const posts = await client.fetch(query);
    
    if (!Array.isArray(posts)) {
      throw new Error('Invalid data format received from Sanity');
    }

    return posts.map(post => ({
      ...post,
      slug: post.slug?.current || 'no-slug',
      publishedAt: post.publishedAt || new Date().toISOString(),
      categories: post.categories || [{ title: 'General' }]
    }));
    
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Render blog posts function
export function renderBlogPosts(posts, containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container #${containerId} not found`);
    return;
  }

  // Handle empty state
  if (!posts || posts.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12">
        <i class="fas fa-newspaper text-gray-300 text-4xl mb-4"></i>
        <p class="text-gray-500">No blog posts found</p>
      </div>
    `;
    return;
  }

  const { limit = null, masonry = false, featured = false } = options;
  const postsToRender = limit ? posts.slice(0, limit) : posts;

  // Generate HTML for each post
  const postsHTML = postsToRender.map(post => {
    const dateFormatted = new Date(post.publishedAt).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });

    return `
      <div class="${masonry ? 'masonry-item' : ''} ${featured ? 'featured-post' : ''}">
        <article class="card-hover-effect h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <a href="test.html?slug=${post.slug}">    
            ${post.mainImage ? `
              <img src="${post.mainImage}" 
                   alt="${post.title}" 
                   class="w-full h-48 object-cover"
                   loading="lazy">
            ` : `
              <div class="w-full h-48 bg-gradient-to-r from-blue-50 to-gray-100 flex items-center justify-center">
                <i class="fas fa-newspaper text-gray-300 text-4xl"></i>
              </div>
            `}
            
            <div class="p-6 flex-1 flex flex-col">
              <div class="flex flex-wrap gap-2 mb-3">
                ${(post.categories || []).map(cat => `
                  <span class="tag bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                    ${cat.title}
                  </span>
                `).join('')}
              </div>
              
              <h3 class="text-xl font-semibold text-gray-900 mb-3 leading-snug">
                ${post.title}
              </h3>
              
              ${post.description ? `
                <p class="text-gray-600 mb-4 flex-1">${post.description}</p>
              ` : ''}
              
              <div class="flex items-center justify-between text-sm text-gray-500 mt-auto pt-2">
                <time datetime="${post.publishedAt}">${dateFormatted}</time>
                ${post.estimatedReadingTime ? `
                  <span class="flex items-center">
                    <i class="far fa-clock mr-1"></i>
                    ${post.estimatedReadingTime} min read
                  </span>
                ` : ''}
              </div>
            </div>
          </a>
        </article>
      </div>
    `;
  }).join('');

  // Container HTML
  if (masonry) {
    container.innerHTML = `
      <div class="masonry-container grid gap-6" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))">
        ${postsHTML}
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="grid gap-8 ${featured ? 'lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}">
        ${postsHTML}
      </div>
    `;
  }
}