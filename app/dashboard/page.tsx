import ClientPage from './page.client';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard — Love at First Sight', description: 'Manage your private chef bookings.' };

export default function Page() {
  return <ClientPage />;
}
