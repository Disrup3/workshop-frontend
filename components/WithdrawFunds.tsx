import { FC } from "react"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useContractAddressStore } from "../stores/contractAddressStore"
import wcbet from "../constants/abi.json";
import { ethers } from "ethers";

interface Props {
    winnerId: number;
}

const WithdrawFunds: FC<Props> = ({winnerId}) => {
    const {address: userAddress} = useAccount();

    const contractAddress = useContractAddressStore((state) => state.contractAddress)
    const {config} = usePrepareContractWrite({
        address: contractAddress,
        functionName: "withdraw",
        abi: wcbet.abi,       
    })

    const {data: userProcceds = 0} = useContractRead({
        address: contractAddress,
        functionName: "getUserProceeds",
        args: [userAddress || ""],
        abi: wcbet.abi,
        watch: true
    });

    const {write, data, error, isLoading, isSuccess} = useContractWrite(config)
    console.log(isLoading)

  return (
    <div className="mt-10">
        {Number(userProcceds) <= 0 ? <p>No tienes fondos que reclamar</p> : (
            <>
                <p>Enhorabuena has apostado por el equipo ganador! </p>
                <p>Puedes reclamar {Number(userProcceds) / 1e18} ETH</p>
                <button  onClick={() => write?.()} disabled={isLoading} className="bg-purple-600 mt-2 p-4 rounded-sm">{isLoading ? <span>lds-dual-ring</span> : "Reclamar fondos"}</button>
                {error && <p>Algo salió mal</p>}
            </>
        )}
        
    </div>
  )
}

export default WithdrawFunds