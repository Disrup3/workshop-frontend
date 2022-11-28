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
        setIsFormOpen(!isFormOpen)
    }

    // team id + msg.value
    const bet = () => {        
        write?.();
    }

    return (
        <div className=" shadow-md rounded border-red-100 m-5 p-5">
            <h3 className="text-center mb-2">{Number(team[0]) + 1} - {team[1].toString()}</h3>
            <p>cantidad apostada: {team[2] > 0 ? ethers.utils.formatEther(team[2]) : 0} matic</p>
            <button style={isFormOpen ? {display: "none"} : {display: "block"}} onClick={handleFormOpen} className="center">apostar</button>
            {isFormOpen && (
                <div>
                    <div>
                        <div className="flex flex-col">
                            <label>Cantidad a apostar (eth) </label>
                            <input onChange={(e) => setBetValue(Number(e.target.value))} type="number" />
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