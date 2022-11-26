import { useEffect, useState } from "react";
import { abi } from "../constants/abi.json";
import { useContractRead } from "wagmi";
import Navbar from "../components/Navbar";
import SelectContractAddress from "../components/SelectContractAddress";
import TeamList from "../components/TeamList";


export default function Home() {

  const [contractAddress, setContractAddress] = useState("");

  const {data: totalSupply} = useContractRead({
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

  console.log(teamList)

  return (
   <main>
    <Navbar />

    {/* HERO */}
    <section>
      <h1  className="text-gray-900 text-center text-xl mt-20 mb-20"> WorldCup winner predictor</h1>
      { contractAddress.length > 1 &&  <p className=" text-center">Connected to: {contractAddress}</p> }   
    </section>

    {contractAddress.length < 1 
      ? (
        <div className="flex justify-center">
          <SelectContractAddress setContractAddress={setContractAddress}/>
        </div>
      )
      : (
        <div>
          <h2 className="text-center">Cantidad total apostada: {totalSupply?.toString()} matic</h2>
          <TeamList teamList={teamList as any[]}/>
        </div>
      )
    }    

   </main>
  )
}
