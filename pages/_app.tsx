import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient, configureChains, chain, useSwitchNetwork} from 'wagmi'
import {publicProvider} from "wagmi/providers/public"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider } from '@chakra-ui/react';

const { chains, provider } = configureChains(
  [chain.localhost, chain.goerli, chain.polygon],
  [  publicProvider() ]
)

const client = createClient({
  autoConnect: true,
  provider
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>    
        <Component {...pageProps} />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <ToastContainer />
      </WagmiConfig>
    </ChakraProvider>
    )
}
