import { FC } from "react"
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useContractAddressStore } from "../stores/contractAddressStore"
import wcbet from "../constants/abi.json";
import { ethers } from "ethers";
import { Box, Button, Image, Text } from "@chakra-ui/react";

interface Props {
    winnerId: number;
    teamList: any[]
    classname: string
}

const WithdrawFunds: FC<Props> = ({winnerId, teamList, classname}) => {
    const team = teamList[winnerId]
    console.log(team)
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
    console.log({userProcceds})

  return (
    <Box className={classname} sx={{
        width: ["100%", "100%", "100%", "37%"],
        marginTop: ["40px", "50px", "10vh"],
        borderRadius: ["10px", "10px", "55px 30px"],
        background: "#131014",
        marginLeft: "auto",
        padding: ["30px 15px", "30px 15px", "30px"],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: ["unset","unset","unset", "sticky"],
        top: ["0", "0", "10vh"],
    }}>
        <Box>
            <Text as="h2" sx={{fontSize: "18px", textAlign: "center"}}>¡TENEMOS UN GANADOR!</Text>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                margin: "40px 0",
                cursor: "pointer"
            }}
            >
                <Box sx={{
                    height: "80px",
                    width: "80px",
                    borderRadius: "80px",
                    overflow: "hidden",
                    flexShrink: "0"
                }}>
                    <Image src={`/images/countries/${team[1].toString().replace(" ", "")}.jpeg`} sx={{
                        height: "100%",
                        minWidth: "100%",
                        objectFit: "cover",
                        objectPosition: "center"
                    }}></Image>
                </Box>
                <Text className="text-center" sx={{
                    fontSize: "16px",
                    marginTop: "10px"
                }}>{team[1].toString()}</Text>
            </Box>
        </Box>
        {Number(userProcceds) <= 0 ? <Text sx={{fontSize: "12px"}}>No tienes fondos para reclamar</Text> : (
            <>
                <Text sx={{
                    fontSize: "12px"
                }}>Enhorabuena has apostado por el equipo ganador! </Text>
                <Box sx={{
                    padding: "15px 10px",
                    borderRadius: "10px",
                    background: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minWidth: "100%",
                    marginTop: "15px",
                    border: "1px dashed #D9F40B"
                }}>
                    <Text sx={{
                        color: "#f2f2f2",
                        textTransform: "uppercase",
                        fontFamily: "'Monument'",
                        fontSize: "14px",
                        width: "max-content",
                        marginRight: "30px"
                    }}>has ganado</Text>
                    <Text sx={{
                        color: "#D9F40B",
                        textTransform: "uppercase",
                        fontFamily: "'Monument'",
                        fontSize: "14px",
                        width: "max-content"
                    }}>{(Number(userProcceds) / 1e18).toFixed(3)} ETH</Text>
                </Box>
                <Button onClick={() => write?.()} disabled={isLoading} sx={{
                    padding: "14px 30px",
                    background: "linear-gradient(98.16deg, #D9F40B 1.81%, rgba(217, 244, 11, 0.51) 100%)",
                    borderRadius: "8px",
                    fontFamily: "Monument",
                    color: "#000",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    width: "100%",
                    marginTop: "10px"
                }}>{isLoading ? <span>lds-dual-ring</span> : "Reclamar fondos"}</Button>
                {error && <p className="text-red-500">algo ha ido mal :( comprueba que tienes suficiente saldo para apostar</p>}
            </>
        )}
        
    </Box>
  )
}

export default WithdrawFunds