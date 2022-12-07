import { abi } from "../constants/abi.json";
import { useContractRead } from "wagmi";
import TeamList from "../components/TeamList";
import AppLayout from "../components/layouts/AppLayout";
import { ethers } from "ethers";
import WithdrawFunds from "../components/WithdrawFunds";
import {chainData} from "../constants/chainData"
import { useEffect, useState } from "react";
import { useContractAddressStore } from "../stores/contractAddressStore";

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
      <main>    
            <div className="mt-5">
              <div className="flex flex-wrap mb-10 gap-10 mr-10 ml-10 pt-[5rem]">
                <div className="flex-1">
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
                  
                </div>
                <TeamList 
                  totalBetValue={totalBetAmount as number} 
                  teamList={teamList as any[]} 
                  error={false} 
                  isLoading={true}
                />
              </div>
            </div>          
      </main>
   </AppLayout>
  )
}
