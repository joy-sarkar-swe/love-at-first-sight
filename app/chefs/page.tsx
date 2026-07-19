import ClientPage from './page.client';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Love at First Sight — Our Chefs', description: 'Discover our roster of exceptional private chefs.' };

export default function Page() {
  return <ClientPage />;
}
