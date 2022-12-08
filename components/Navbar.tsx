import { Box, Button, Image, Text } from '@chakra-ui/react';
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
    <Box className='flex justify-between items-center' sx={{
      padding: ["15px 20px", "15px 20px", "40px 80px"]
    }}>
        <Image sx={{
          width: ["100px", "100px", "200px"]
        }} src='./images/mrlogo.png' />
        <div>
          {isConnected 
              ?   <Text sx={{
                    padding: ["8px 15px", "8px 15px",  "14px 30px"],
                    background: "linear-gradient(98.16deg, #D9F40B 1.81%, rgba(217, 244, 11, 0.51) 100%)",
                    borderRadius: "8px",
                    fontFamily: "Monument",
                    color: "#000",
                    fontSize: ["12px", "12px", "14px"],
              }}>{beautifyAddress(address)}</Text>
              :               
                  <Button onClick={() => connect()} sx={{
                    padding: ["8px 15px", "8px 15px",  "14px 30px"],
                    background: "linear-gradient(98.16deg, #D9F40B 1.81%, rgba(217, 244, 11, 0.51) 100%)",
                    borderRadius: "8px",
                    fontFamily: "Monument",
                    color: "#000",
                    fontSize: ["12px", "12px", "14px"],
                    textTransform: "uppercase"
                  }}> Connect wallet </Button>                
          }
        </div>            
    </Box>
  )
}

export default Navbar