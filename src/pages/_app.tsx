import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Sidebar from '../components/ui/SideBar';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const show: boolean = router.pathname === '/auth/signin' || router.pathname === '/auth/signup'
          ? false
          : true;
  return (
    <Sidebar showSideBar={show}>
      <Component {...pageProps} />
    </Sidebar>
  ); 
}
