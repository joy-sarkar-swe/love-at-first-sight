import ClientPage from './page.client';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Love at First Sight — For Chefs', description: 'Join Love at First Sight as a private chef.' };

export default function Page() {
  return <ClientPage />;
}
