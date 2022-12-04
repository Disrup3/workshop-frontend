import { abi } from "../constants/abi.json";
import { useContractRead } from "wagmi";
import SelectContractAddress from "../components/SelectContractAddress";
import TeamList from "../components/TeamList";
import AppLayout from "../components/layouts/AppLayout";
import {useContractAddressStore} from "../stores/contractAddressStore"
import { ethers } from "ethers";
import WithdrawFunds from "../components/WithdrawFunds";


export default function Home() {
  
  const contractAddress = useContractAddressStore((state) => state.contractAddress)

  const {data: totalBetAmount = 0} = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "totalBettedAmount",
    chainId: 5,
    watch: true
  })

  const {data: winnerId = 99} = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "winnerId",
    chainId: 5,
    watch: true, 
    cacheTime: 60000 // 1min 
  })

  console.log(Number(winnerId))

  const {data: teamList = [], error, isLoading}  = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: "getTeamList",
    chainId: 5,
    watch: true,
    cacheTime: 10000
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

                  <p className="mt-5">Adivina que equipo ganará la copa del mundo de Qatar 2022. ¿ Cuál de los 16 equipos será el ganador ?</p>

                  <div className="flex flex-col mt-10">
                  { contractAddress.length > 1 &&  <p className="text-xl">Conectado a:
                   <span className="ml-3 text-[#D9F40B]" >{contractAddress}</span></p> } 

                    <p className="text-xl">Cantidad total apostada:
                     <span className="ml-3 text-purple-500">{ethers.utils.formatEther(String(totalBetAmount))} eth </span>
                    </p>                    
                  </div>
                  
                  { Number(winnerId) < 16 && (
                    <WithdrawFunds winnerId={Number(winnerId)}/>
                  )}
                  
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
