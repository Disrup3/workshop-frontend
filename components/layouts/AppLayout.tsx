import Head from 'next/head'
import { FC, ReactNode } from 'react'
import Navbar from '../Navbar'

interface Props {
    children?: ReactNode;
}

const AppLayout: FC<Props> = ({children}) => {
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