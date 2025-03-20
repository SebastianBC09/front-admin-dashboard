import { Roboto } from 'next/font/google';
import Layout from '../components/layout/Layout';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Fortex - Gestión de Tipos y Propiedades',
  description: 'Aplicación para la gestión de tipos y propiedades',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es" className={roboto.className}>
      <head />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default RootLayout;
