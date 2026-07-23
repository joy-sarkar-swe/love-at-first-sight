import ClientPage from './page.client';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Journal — Love at First Sight', description: 'Stories, recipes, and notes from our private chefs.' };

export default function Page() {
  return <ClientPage />;
}
