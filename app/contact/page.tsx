import ClientPage from './page.client';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Love at First Sight — Contact Us', description: 'Get in touch with Love at First Sight for inquiries and special requests.' };

export default function Page() {
  return <ClientPage />;
}
