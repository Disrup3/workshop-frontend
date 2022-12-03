import { FC, useState } from "react";
import {useContractAddressStore} from "../stores/contractAddressStore"

interface Props {
    setContractAddress?: (address: string) => void;
}

const SelectContractAddress: FC<Props> = () => {

  const [formAddress, setFormAddress] = useState("");
  const changeContractAddress = useContractAddressStore((state) => state.updateAddress)

  const setMainAddress = () => {
    if(formAddress.length < 1) return
    changeContractAddress(formAddress)
    setFormAddress("")
  }

  return (
    <div className="w-full max-w-sm">    
      <div className="flex flex-col align-center">
        <label>Select contract address:</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          placeholder="0x..." 
          type="text" 
          value={formAddress}  
          onChange={(e) => setFormAddress(e.target.value)}
        />
        <button className=" p-1 mt-2 bg-purple-700 rounded hover:bg-purple-500" onClick={() => setMainAddress()}>Confirmar</button>       
      </div>
    </div>
  )
}

export default SelectContractAddress