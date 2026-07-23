import ClientPage from './page.client';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Our Chefs — Love at First Sight', description: 'Discover our roster of exceptional private chefs.' };

export default function Page() {
  return <ClientPage />;
}
