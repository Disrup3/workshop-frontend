import { abi } from "../constants/abi.json";
import { useContractRead } from "wagmi";
import TeamList from "../components/TeamList";
import AppLayout from "../components/layouts/AppLayout";
import { ethers } from "ethers";
import WithdrawFunds from "../components/WithdrawFunds";
import {chainData} from "../constants/chainData"
import { useEffect, useState } from "react";
import { useContractAddressStore } from "../stores/contractAddressStore";
import { Banner } from "../components/Banner";
import TeamListBet from "../components/TeamListBet";
import { Box } from "@chakra-ui/react";
import { TeamListStats } from "../components/TeamListStats";

export default function Home() {  

  const { updateAddress, contractAddress} = useContractAddressStore((state) => state);

  useEffect(() => {
    updateAddress(chainData[137].contractAddress)
  }, [])
  

  const {data: totalBetAmount = 0} = useContractRead({
    address: contractAddress || "",
    abi: abi,
    functionName: "totalBettedAmount",
    chainId: 5,
    watch: true
  })

  const {data: winnerId = 99} = useContractRead({
    address: contractAddress || "",
    abi: abi,
    functionName: "winnerId",
    chainId: 5,
    watch: true, 
    cacheTime: 60000 // 1min 
  })

  console.log(Number(winnerId))

  const {data: teamList = [], error = false, isLoading}  = useContractRead({
    address: contractAddress || "",
    abi: abi,
    functionName: "getTeamList",
    chainId: 5,
    watch: true,
    cacheTime: 10000
  })

  return (
    <AppLayout>
      <main >    
            <Box sx={{
              display: "flex",
              alignItems: "flex-start",
              margin: ["0 20px", "0 20px", "0 80px"],
              justifyContent: "space-between",
              position: "relative"
            }}>
              <Box sx={{
                width: ["100%", "100%", "100%", "60%"],
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}>
                <Banner totalBetAmount={`${ethers.utils.formatEther(String(totalBetAmount))} eth`} />
                <TeamListBet
                  classname="desktop-hidden"
                  totalBetValue={totalBetAmount as number} 
                  teamList={teamList as any[]} 
                  error={false} 
                  isLoading={true}
                />
                <TeamListStats teamList={teamList as any[]} />
              </Box>
                <TeamListBet
                  classname="mobile-hidden"
                  totalBetValue={totalBetAmount as number} 
                  teamList={teamList as any[]} 
                  error={false} 
                  isLoading={true}
                />
            </Box>
            <div style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              overflow: "hidden",
              zIndex: "-1"
            }}>
              <div style={{
                position: "absolute",
                top: "0",
                right: "0",
                transform: "translate(50%, -50%)",
                width: "100vw",
                height: "100vw",
                background: "radial-gradient(50% 50% at 50% 50%, rgba(217, 244, 11, 0.2) 0%, rgba(0, 0, 0, 0) 100%)"
              }}></div>  
              <div style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                transform: "translate(-50%, 50%)",
                width: "100vw",
                height: "100vw",
                background: "radial-gradient(50% 50% at 50% 50%, rgba(217, 244, 11, 0.2) 0%, rgba(0, 0, 0, 0) 100%)"
              }}></div>  
            </div>     
      </main>
   </AppLayout>
  )
}
