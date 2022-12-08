import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from "wagmi/connectors/injected";
import { beautifyAddress } from '../utils/address';

const Navbar = () => {
    const {address: wagmiaddress, isConnected: wIsconnected} = useAccount();
    const [address, setAddress] = useState("")
    const [isConnected, setIsconnected] = useState(true)

    useEffect(() => {
      setAddress(wagmiaddress || "");
      setIsconnected(wIsconnected);
    }, [wagmiaddress, wIsconnected])   

    const { connect } = useConnect({
        connector: new InjectedConnector()
    })
    const {disconnect} = useDisconnect();

  return (
    <nav className='flex justify-between items-center' style={{
      padding: "40px 80px",
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%"
    }}>
        <img className='w-[200px] object-contain' src='./images/mrlogo.png' />
        <div>
          {isConnected 
              ?   <p>{beautifyAddress(address)}</p>
              :               
                  <button onClick={() => connect()}> Connect wallet </button>                
          }
        </div>            
    </nav>
  )
}

export default Navbar