import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from "wagmi/connectors/injected";
import { beautifyAddress } from '../utils/address';

const Navbar = () => {

    const {address, isConnected} = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector()
    })
    const {disconnect} = useDisconnect();

  return (
    <nav className='flex justify-between p-5'>
        <img className='w-[120px] object-contain' src='./images/logonegativo.png' />
        <div>
          {isConnected 
              ?   <p>{beautifyAddress(address!)}</p>
              :               
                  <button onClick={() => connect()}> Connect wallet </button>                
          }
        </div>            
    </nav>
  )
}

export default Navbar