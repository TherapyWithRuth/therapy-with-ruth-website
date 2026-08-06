import type { PortableTextBlock } from '@portabletext/types';

export interface BlogImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt: string;
  caption?: string;
}

export interface BlogPostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  mainImage: BlogImage;
}

export interface BlogPost extends BlogPostSummary {
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
}
