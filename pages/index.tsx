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
        <section className="mt-[10vh]">
          { contractAddress.length > 1 &&  <p className=" text-center">Connected to: <span >{contractAddress}</span></p> }   
        </section>

        {contractAddress.length < 1 
          ? (
            <div className="flex justify-center">
              <SelectContractAddress />
            </div>
          )
          : (
            <div className="mt-5">
              <h2 className="text-center">Cantidad total apostada: {ethers.utils.formatEther(String(totalBetAmount))} eth</h2>
              <TeamList teamList={teamList as any[]}/>
            </div>
          )
        }   
      </main>
   </AppLayout>
  )
}
