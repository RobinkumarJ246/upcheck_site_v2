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
import { useLanguage } from '../../../contexts/LanguageContext';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';

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

const CustomHeading = Heading.configure({
  levels: [1, 2, 3],
}).extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;
    const classes = {
      1: 'text-4xl mb-6 font-bold text-gray-900',
      2: 'text-3xl mb-4 mt-8 font-bold text-gray-900',
      3: 'text-2xl mb-3 mt-6 font-bold text-gray-900',
    };

    return [`h${level}`, { ...HTMLAttributes, class: classes[level] }, 0];
  },
});

const RichTextContent = ({ content }) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: 'mb-4 text-gray-700',
        },
      }),
      Text,
      Bold.configure({
        HTMLAttributes: {
          class: 'font-bold',
        },
      }),
      CustomHeading,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc list-inside space-y-2 my-4 ml-4',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal list-inside space-y-2 my-4 ml-4',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'ml-4',
        },
      }),
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
    ],
    content,
    editable: false,
    parseOptions: {
      preserveWhitespace: 'full',
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none',
      },
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
};

export default function PostPage({ params }) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const unwrappedParams = use(params);
  const postData = posts.find((resource) => resource.id.toString() === unwrappedParams.id);

  // Get translated content
  const localizedPost = postData ? {
    ...postData,
    title: postData.translations[language]?.title || postData.translations.en.title,
    content: postData.translations[language]?.content || postData.translations.en.content
  } : null;

  if (!localizedPost) {
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

  const formattedDate = new Date(localizedPost.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const wordCount = localizedPost.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-gray-50">
      <ReadingProgress />

      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh]">
        <Image
          src={localizedPost.thumbnail}
          alt={localizedPost.title}
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
            {localizedPost.categories.map((category, index) => (
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
            {localizedPost.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              <span>{localizedPost.author}</span>
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
            <RichTextContent content={localizedPost.content} />
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {localizedPost.tags.map((tag, index) => (
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
                <SocialShare url={currentUrl} title={localizedPost.title} />
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
      </div>
    </div>
  );
}