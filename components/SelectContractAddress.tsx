import { FC, useState } from "react";

interface Props {
    setContractAddress: (address: string) => void;
}

const SelectContractAddress: FC<Props> = ({setContractAddress}) => {

  const [formAddress, setFormAddress] = useState("");

  const setMainAddress = () => {
    if(formAddress.length < 1) return
    setContractAddress(formAddress);
    setFormAddress("")
  }

  return (
    <form className="w-full max-w-sm">    
      <div className="flex flex-col align-center">
        <label>Select contract address:</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          placeholder="0x..." 
          type="text" 
          value={formAddress}  
          onChange={(e) => setFormAddress(e.target.value)}
        />
        <button className=" p-1 mt-2 bg-red-200 rounded hover:bg-red-300" onClick={() => setMainAddress()}>Confirmar</button>
      </div>
    </form>
  )
}

export default SelectContractAddress