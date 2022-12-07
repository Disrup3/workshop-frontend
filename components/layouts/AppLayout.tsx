import Head from 'next/head'
import { FC, ReactNode, useEffect } from 'react'
import Navbar from '../Navbar'
import {chain, useNetwork, useSwitchNetwork} from "wagmi"

interface Props {
    children?: ReactNode;
}

const AppLayout: FC<Props> = ({children}) => {

  const {chain: currChain, chains} = useNetwork();
  const {switchNetwork} = useSwitchNetwork()

  useEffect(() => {
    if(currChain?.unsupported) {
      switchNetwork?.(5)
    }
  }, [currChain])
  

  return (
    <>
        <Head>
            <title>Mr crypto - world cup</title>
            <link rel="icon" type='image/avif' href="./images/logomrc.avif" />
        </Head>
        <div className='bgImage' style={{minHeight: "100vh"}}>    
          <Navbar /> 
          {children}
        </div>
    </>    
  )
}

export default AppLayout