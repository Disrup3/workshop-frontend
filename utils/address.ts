export const beautifyAddress = (address: string) => {
    return `${address.slice(0,6)}...${address.slice(-4)}`
}

export const isValidAddress = (address: string): boolean => {
    return false;
}