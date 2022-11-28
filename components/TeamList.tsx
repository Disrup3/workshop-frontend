import { ethers } from "ethers";
import { FC, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import  wcbet  from "../constants/abi.json"
import {useContractAddressStore} from "../stores/contractAddressStore"

interface Props {
    teamList: any[];
}

const TeamList: FC<Props> = ({teamList}) => {

    if(!teamList) return (
        <div>
            
        </div>
    )

  return (
    <div className="flex flex-wrap justify-center mt-10">
        {teamList.map(team  => (
            <TeamCard key={team.teamId} team={team}/>
        ))}
    </div>
  )
}
interface TeamProps {
    team: any[];
}
const TeamCard: FC<TeamProps> = ({team}) => {   
    
    const contractAddress = useContractAddressStore((state) => state.contractAddress)
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [betValue, setBetValue] = useState(0);


    const {config} = usePrepareContractWrite({
        address: contractAddress,
        functionName: "bet",
        abi: wcbet.abi,
        args: [team[0]],
        overrides: {            
            value: ethers.utils.parseEther(String(betValue)),
          }
    })

    const {write, data, error, isLoading, isSuccess} = useContractWrite(config)

    const handleFormOpen = () => {
        setBetValue(0)
        setIsFormOpen(!isFormOpen)
    }

    // team id + msg.value
    const bet = () => {        
        write?.();
    }

    return (
        <div className=" max-h-fit flex flex-col shadow-md rounded border-red-100 m-5 p-5">
            <h3 className="text-center mb-2">{Number(team[0]) + 1} - {team[1].toString()}</h3>
            <p className=" m-3 text-center">cantidad apostada a {team[1]} {team[2] > 0 ? ethers.utils.formatEther(team[2]) : 0} matic</p>
            <button        
             style={isFormOpen ? {display: "none"} : {display: "block"}} 
             onClick={handleFormOpen} 
             className=" rounded bg-gray-300 p-2 center"
            > apostar
            </button>
            {isFormOpen && (
                <div>
                    <div className="mt-4">
                        <div className="flex flex-col">
                            <label>Cantidad a apostar {betValue} ( eth ) </label>
                            <input  
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(e) => setBetValue(Number(e.target.value))} 
                                type="number" 
                            />
                        </div>
                        <div className="flex align-center justify-between mt-4">
                            <button  onClick={bet}>Apostar</button>
                            <button onClick={handleFormOpen}>cerrar</button>  
                        </div>                       
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeamList