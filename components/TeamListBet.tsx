import { Box, Button, Image, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { FC, useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import  wcbet  from "../constants/abi.json"
import { chainData } from "../constants/chainData";

interface Props {
    teamList: any[];
    totalBetValue?: number;
    classname: string
    isLoading: boolean;
    error: boolean;
}

const TeamListBet: FC<Props> = ({teamList, totalBetValue, classname}) => {
    const [selectedTeam, setSelectedTeam] = useState<number>()
    const [betValue, setBetValue] = useState(0);

    //calcular betvalue * (valueBettedToteam + betvalu) / totalBetValue + betvalue
    const getPotentialProfit = (
        betValue: number,
        valueBettedToTeam: number,
        totalBetValue: number
    ) => {
        console.log(betValue, "-1-", valueBettedToTeam, "-2-", totalBetValue, "-3-")
        return (betValue * (totalBetValue + betValue)  / (valueBettedToTeam + betValue)).toFixed(3)
    }

    const contractAddress = chainData[137].contractAddress || ""

    const {config} = usePrepareContractWrite({
        address: contractAddress,
        functionName: "bet",
        abi: wcbet.abi,
        args: [selectedTeam!],
        overrides: {            
            value: ethers.utils.parseEther(String(betValue)),
        }                
    })


    const {write, data, error, isLoading, isSuccess} = useContractWrite(config)


    // team id + msg.value
    const bet = () => {        
        write?.();
    }


    const selectTeam = (teamId: number) => {
        if(teamId < 0 ) return;
        setSelectedTeam(teamId);
    }

  return (        

        <Box className={classname} sx={{
            width: ["100%", "100%", "100%", "37%"],
            marginTop: ["40px", "50px", "10vh"],
            borderRadius: ["10px", "10px", "30px"],
            background: "#131014",
            marginLeft: "auto",
            padding: ["30px 15px", "30px 15px", "55px 30px"],
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            position: ["unset","unset","unset", "sticky"],
            top: ["0", "0", "10vh"],
        }}>        
            <Text as="h2" sx={{fontSize: ["18px", "18px", "22px"]}}>PLACE YOUR BET</Text>
            <Text as="p" sx={{
                color: "#9B9B9B",
                fontSize: ["10px", "10px", "12px"],
                margin: "10px 0 20px"
            }}>Selecciona el equipo por el que quieres apostar, introduce la cantidad y participa.</Text>
            <Box sx={{
                borderRadius: "8px",
                padding:["20px 5px", "20px 5px", "25px"],
                background: "#1B171D",
                width: "100%"
            }}>
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 25%)",
                    alignItems: "flex-start"
                }}>
                    {isLoading && <p>Loading</p>}
                    {teamList.map((team, i)  => (
                        <TeamCard key={i} team={team} selectTeam={selectTeam} selectedTeam={selectedTeam} />
                    ))}   
                </Box>             
            <Box sx={{
                display:"flex",
                flexDirection: "column",
            }}>
                <input className="p-4" style={{borderRadius: "8px", background: "#544959", marginBottom: "10px", fontSize: "10px"}} value={typeof betValue !== "undefined" ? betValue : "0.01... eth"} onChange={(e) => setBetValue(Number(e.target.value))} type="number" step="0.01" placeholder={`Cantidad a apostar ${ selectedTeam ? "a " + teamList[Number(selectedTeam!.toString())][1] : ""}`} />                   
                <Button disabled={isLoading} onClick={bet} sx={{
                    padding: "14px 30px",
                    background: "linear-gradient(98.16deg, #D9F40B 1.81%, rgba(217, 244, 11, 0.51) 100%)",
                    borderRadius: "8px",
                    fontFamily: "Monument",
                    color: "#000",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    width: "100%"
                }}>{isLoading  ? <span className="lds-dual-ring"></span> : "Apostar"}</Button>
                {selectedTeam && betValue > 0 && <p className=" mt-4 opacity-50 text-sm" style={{fontSize: "10px"}}>Si {teamList[selectedTeam][1]} gana el mundial y apuestas {betValue} recibirás al dia de hoy: {getPotentialProfit(betValue, Number(ethers.utils.formatEther(teamList[selectedTeam!][2])), Number(ethers.utils.formatEther(totalBetValue?.toString()!)))} Matic</p> }
                {error && <p className="text-red-400 mt-2">algo ha ido mal :( comprueba que tienes suficiente saldo para apostar</p>}
            </Box>
            </Box>
        </Box>
  )
}
interface TeamProps {
    team: any[];
    selectTeam: (teamId: number) => void;
    selectedTeam?: number;
}
const TeamCard: FC<TeamProps> = ({team, selectTeam, selectedTeam}) => {      
    const isSelectedTeam = selectedTeam?.toString() === team[0]?.toString()
    return (
        <Box onClick={() => selectTeam(team[0])} sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: "40px",
            cursor: "pointer"
        }}
        >
            <Box border={isSelectedTeam ? "2px solid #D9F40B" : "none"} sx={{
                height: "50px",
                width: "50px",
                borderRadius: "50px",
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
            <Text className="text-center" color={isSelectedTeam ? "#D9F40B" : "#fff"} sx={{
                fontSize: "10px",
                marginTop: "10px"
            }}>{team[1].toString()}</Text>
        </Box>
    )
}

export default TeamListBet