import ClientPage from './page.client';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'For Chefs — Love at First Sight', description: 'Join Love at First Sight as a private chef.' };

export default function Page() {
  return <ClientPage />;
}
