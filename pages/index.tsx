import { useState } from "react";
import { abi } from "../constants/abi.json";
import { useContractRead } from "wagmi";
import SelectContractAddress from "../components/SelectContractAddress";
import TeamList from "../components/TeamList";
import AppLayout from "../components/layouts/AppLayout";
import {useContractAddressStore} from "../stores/contractAddressStore"
import { ethers } from "ethers";



export default function Home() {
  
  const contractAddress = useContractAddressStore((state) => state.contractAddress)
  const {data: totalBetAmount = 0} = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "totalBettedAmount",
    chainId: 5
  })

  const {data: teamList}  = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getTeamList",
    chainId: 5
  })


  return (
    <AppLayout>
      <main>
        {/* HERO */}
        <section>
          <h1  className="text-gray-900 text-center text-xl mt-20 mb-20"> WorldCup winner predictor</h1>
          { contractAddress.length > 1 &&  <p className=" text-center">Connected to: {contractAddress}</p> }   
        </section>

        {contractAddress.length < 1 
          ? (
            <div className="flex justify-center">
              <SelectContractAddress />
            </div>
          )
          : (
            <div>
              <h2 className="text-center">Cantidad total apostada: {ethers.utils.formatEther(String(totalBetAmount))} eth</h2>
              <TeamList teamList={teamList as any[]}/>
            </div>
          )
        }   
      </main>
   </AppLayout>
  )
}
