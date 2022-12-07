import create from "zustand";

interface ContractAddressStoreState {
  contractAddress: string;
  updateAddress: (newAddress: string) => void;
}

export const useContractAddressStore = create<ContractAddressStoreState>((set) => (
    {
      contractAddress: "",
      updateAddress: (newAddress: string) => set((state:any) => ({
        ...state,
        contractAddress: newAddress
      }))
    }
  ))