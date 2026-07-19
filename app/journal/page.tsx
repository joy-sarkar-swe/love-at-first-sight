import ClientPage from './page.client';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Love at First Sight — Journal', description: 'Stories, recipes, and notes from our private chefs.' };

export default function Page() {
  return <ClientPage />;
}
