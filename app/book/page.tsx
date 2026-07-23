import ClientPage from './page.client';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Book a Chef — Love at First Sight', description: 'Secure your reservation for an unforgettable dining experience.' };

export default function Page() {
  return <ClientPage />;
}
