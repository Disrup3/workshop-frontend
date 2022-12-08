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
            <div className="mt-5">
              <div className="flex flex-wrap mb-10 gap-10 pt-[5rem] pl-20 pr-20">
                {/* <div className="flex-1">
                  <h1 className=" text-[60px]  text-[#D9F40B]">Mr crypto betting app</h1>

                  <p className="mt-5">Adivina que equipo ganará la copa del mundo de Qatar 2022.</p>

                  <div className="flex flex-col mt-10">
                    <p className="text-xl">Cantidad total apostada:
                     <span className="ml-3 text-purple-500">{ethers.utils.formatEther(String(totalBetAmount))} eth </span>
                    </p>                    
                  </div>
                  
                  { Number(winnerId) < 16 && (
                    <WithdrawFunds winnerId={Number(winnerId)}/>
                  )}
                  
                </div> */}
                <Banner totalBetAmount={`${ethers.utils.formatEther(String(totalBetAmount))} eth`} />
                {/* <TeamList 
                  totalBetValue={totalBetAmount as number} 
                  teamList={teamList as any[]} 
                  error={false} 
                  isLoading={true}
                /> */}
              </div>
            </div>   

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
