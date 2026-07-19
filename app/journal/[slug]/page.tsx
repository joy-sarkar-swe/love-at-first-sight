import { Metadata } from 'next';
import { getPost } from '@/data/journal';
import ClientPage from './page.client';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
