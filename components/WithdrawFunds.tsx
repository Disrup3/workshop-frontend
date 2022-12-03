import { FC } from "react"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useContractAddressStore } from "../stores/contractAddressStore"
import wcbet from "../constants/abi.json";

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
        args: ["0x7eC7aF8CFF090c533dc23132286f33dD31d13E29"],
        abi: wcbet.abi,
        watch: true
    });

    const {write, data, error, isLoading, isSuccess} = useContractWrite(config)
    console.log(isLoading)

  return (
    <div className="mt-10">
        {Number(userProcceds) <= 0 ? <p>No tienes fondos que reclamar</p> : (
            <>
                <p>El id del equipo ganador es {winnerId}</p>
                <button onClick={() => write?.()} className="bg-purple-600 p-4 rounded-sm">Reclamar fondos</button>
                {error && <p>Algo salió mal</p>}
            </>
        )}
        
    </div>
  )
}

export default WithdrawFunds