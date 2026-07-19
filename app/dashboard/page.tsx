import ClientPage from './page.client';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Love at First Sight — Dashboard', description: 'Manage your private chef bookings.' };

export default function Page() {
  return <ClientPage />;
}
