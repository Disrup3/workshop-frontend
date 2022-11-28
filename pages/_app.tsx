import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient, configureChains, chain, useSwitchNetwork} from 'wagmi'
import {publicProvider} from "wagmi/providers/public"
import { useEffect } from 'react'
// alchemyProvider({apiKey: "bfSzgTmgSKMUvNh1nW2CiQdUKLNO9K-e"})

const { chains, provider } = configureChains(
  [chain.polygon, chain.goerli],
  [  publicProvider() ]
)

const client = createClient({
  autoConnect: false,
  provider
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>    
      <Component {...pageProps} />
    </WagmiConfig>
    )
}
