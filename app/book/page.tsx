import ClientPage from './page.client';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Love at First Sight — Book a Chef', description: 'Secure your reservation for an unforgettable dining experience.' };

export default function Page() {
  return <ClientPage />;
}
