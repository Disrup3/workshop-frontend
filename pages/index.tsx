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

  const {data: teamList = [], error}  = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getTeamList",
    chainId: 5
  })

  if(error) return(
    <AppLayout>
      <div className="mt-10 flex flex-col items-center justify-center">
        <h2 className=" text-xl mb-6 text-center text-red-400">Selecciona un smart contract valido </h2>
        <SelectContractAddress />
      </div>
    </AppLayout >
  )

  return (
    <AppLayout>
      <main>     

        {contractAddress.length < 1 
          ? (
            <div className="flex justify-center">
              <SelectContractAddress />
            </div>
          )
          : (
            <div className="mt-5">
              <div className="flex flex-wrap mb-10 gap-10 mr-10 ml-10 pt-[5rem]">
                <div className="flex-1">
                  <h1 className=" text-[82px]  text-[#D9F40B]">Workshop</h1>

                  <p className="mt-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam repellendus saepe fuga voluptate commodi debitis itaque soluta deleniti, odio molestiae, repellat iure impedit ipsum magni ab, modi deserunt rerum asperiores.</p>

                  <div className="flex flex-col mt-10">
                  { contractAddress.length > 1 &&  <p className="text-xl">Connected to:
                   <span className="ml-3 text-[#D9F40B]" >{contractAddress}</span></p> } 

                    <p className="text-xl">Cantidad total apostada:
                     <span className="ml-3 text-purple-500">{ethers.utils.formatEther(String(totalBetAmount))} eth </span>
                    </p>                    
                  </div>
                  

                </div>
                <TeamList totalBetValue={totalBetAmount as number} teamList={teamList as any[]}/>
              </div>

            </div>
          )
        }   
      </main>
   </AppLayout>
  )
}
