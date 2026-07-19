import { Metadata } from 'next';
import { getChef } from '@/data/chefs';
import ClientPage from './page.client';

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const chef = getChef(slug);
  if (!chef) return { title: 'Chef Not Found' };
  return {
    title: chef.name,
    description: chef.headline,
  };
}

export default function Page(props: any) {
  return <ClientPage {...props} />;
}
