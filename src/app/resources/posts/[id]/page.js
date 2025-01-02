// src/app/resources_beta/posts/[id]/page.js
'use client';

import { posts } from '../../posts';
import { 
  Copy, 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Link as LinkIcon 
} from 'lucide-react';
import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Reading Progress Component
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    const handleScroll = () => {
      const currentProgress = window.scrollY;
      const percentageProgress = (currentProgress / totalHeight) * 100;
      setProgress(Math.min(100, Math.max(0, percentageProgress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        className="h-full bg-teal-600 transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Social Share Component
const SocialShare = ({ url, title }) => {
  const shareUrls = {
    x: `https://x.com/intent/tweet?url=${url}&text=${title}`,
    linkedin: `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
  };

  const handleShare = (platform) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex gap-4">
      <button 
        onClick={() => handleShare('x')}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400" />
      </button>
      <button 
        onClick={() => handleShare('linkedin')}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-600" />
      </button>
      <button 
        onClick={() => handleShare('facebook')}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-500" />
      </button>
    </div>
  );
};

// Rich Text Content Component
const RichTextContent = ({ content }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  });

  return (
    <EditorContent 
      editor={editor} 
      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-teal-600"
    />
  );
};

export default function PostPage({ params }) {
  const [copied, setCopied] = useState(false);
  const unwrappedParams = use(params);
  const postData = posts.find((resource) => resource.id.toString() === unwrappedParams.id);

  if (!postData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-16">
        <div className="text-center text-xl font-semibold text-gray-500">
          Post not found
        </div>
      </div>
    );
  }

  const copyPostUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formattedDate = new Date(postData.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const wordCount = postData.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <ReadingProgress />

      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image
          src={postData.thumbnail}
          alt={postData.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10 mb-20">
        {/* Back Button */}
        <Link 
          href="/resources"
          className="inline-flex items-center text-white mb-6 hover:text-teal-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Resources
        </Link>

        {/* Article Card */}
        <article className="bg-white rounded-xl shadow-xl p-6 md:p-10">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {postData.categories.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-teal-100 text-teal-700 text-sm font-medium rounded-full"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {postData.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span>{postData.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Rich Text Content */}
          <div className="prose prose-lg max-w-none">
            <RichTextContent content={postData.content} />
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {postData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-900">Share this post</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <SocialShare url={currentUrl} title={postData.title} />
                <button
                  onClick={copyPostUrl}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Navigation Suggestions */}
        {/*}
        <div className="mt-12 mb-20 grid md:grid-cols-2 gap-6">
          <Link href="/resources_beta" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <span className="text-sm text-gray-500">Previous Article</span>
              <h3 className="text-lg font-semibold text-gray-900 mt-1">Previous post title</h3>
            </div>
          </Link>
          <Link href="/resources_beta" className="block">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <span className="text-sm text-gray-500">Next Article</span>
              <h3 className="text-lg font-semibold text-gray-900 mt-1">Next post title</h3>
            </div>
          </Link>
        </div>
        {*/}
      </div>
    </div>
  );
}