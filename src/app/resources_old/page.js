'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Search, Tag, Calendar, User } from 'lucide-react';
import { posts } from './posts';
import Image from 'next/image';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Navbar from '../components/Navbar';
import { useLanguage } from '../contexts/LanguageContext';
import {use, useEffect } from 'react';
import { translations } from '../translations';


const RichTextPreview = ({ content }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content.substring(0, 150) + '...',
    editable: false,
  });

  // This effect ensures the editor content updates when the language changes
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content.substring(0, 150) + '...');
    }
  }, [content, editor]);

  return (
    <EditorContent 
      editor={editor} 
      className="prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 overflow-hidden"
    />
  );
};

export default function ResourcesPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const t = translations[language].resources;

  // Transform posts to include translated content
  const localizedPosts = posts.map(post => ({
    ...post,
    title: post.translations[language]?.title || post.translations.en.title,
    content: post.translations[language]?.content || post.translations.en.content,
    // Keep other fields unchanged
    author: post.author,
    publishedAt: post.publishedAt,
    tags: post.tags,
    categories: post.categories,
    thumbnail: post.thumbnail,
    id: post.id
  }));

  // Get unique categories
  const allCategories = ['All', ...new Set(posts.flatMap(post => post.categories))];

// Filter posts based on search and category
const filteredResources = localizedPosts.filter((resource) => {
  const searchTermLower = searchTerm.toLowerCase();
  
  // Check if title matches
  const matchesTitle = resource.title.toLowerCase().includes(searchTermLower);
  
  // Check if any tag matches
  const matchesTags = resource.tags.some(tag => 
    tag.toLowerCase().includes(searchTermLower)
  );
  
  // Check if category matches
  const matchesCategory = selectedCategory === 'All' || resource.categories.includes(selectedCategory);
  
  // Return true if either title or tags match, and category matches
  return (matchesTitle || matchesTags) && matchesCategory;
});

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-16">
        {/* Page Header */}
        <div className="text-center mb-12 mt-12">
          <h1 className="text-4xl font-bold text-teal-700">{t.headerTitle}</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          {t.headerSubtitle}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder={t.searchPosts}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto ml-10">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                    ${selectedCategory === category
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-teal-50'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail with Categories */}
              <div className="relative h-48">
                <Image
                  src={resource.thumbnail}
                  alt={resource.title}
                  fill
                  className="object-cover rounded-t-xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-xl" />
                <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                  {resource.categories.map((category, index) => (
                    <span
                      key={index}
                      className="flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-semibold rounded-full"
                    >
                      <Tag size={14} className="mr-1 text-teal-500" />
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">{resource.title}</h2>
                <div className="h-20 overflow-hidden mb-4">
                  <RichTextPreview content={resource.content} language={language} />
                </div>
                
                {/* Metadata */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <User size={16} className="mr-1" />
                    {resource.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {new Date(resource.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <Link href={`/resources/posts/${resource.id}`}>
                  <button className="w-full py-2 px-4 bg-teal-50 text-teal-600 font-semibold rounded-lg hover:bg-teal-100 transition-colors">
                    {t.readMore}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredResources.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p>No resources found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}