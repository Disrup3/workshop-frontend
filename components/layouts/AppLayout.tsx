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
            <title>Disrup3 - workshop</title>
        </Head>
        <Navbar /> 
        {children}
    </>    
  )
}

export default AppLayout