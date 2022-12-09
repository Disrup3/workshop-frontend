import { Box, Image, Text } from "@chakra-ui/react"
import { ethers } from "ethers"
import { FC } from "react"


interface TeamListStatsProps{
    teamList: any[]
}

export const TeamListStats:FC<TeamListStatsProps> = ({teamList})=>{
    return(
        <Box sx={{
            width: "100%",
            margin: ["40px 0", "50px 0", "50px 0"],
            background: "#131014",
            borderRadius: ["10px", "10px", "30px"],
            padding: ["20px 15px", "20px 15px", "55px 30px"],
        }}>
            <Text as="h3" sx={{
                fontSize: ["18px", "18px", "22px"],
                textTransform: "uppercase",
                marginBottom: "30px"
            }}>Apuestas totales</Text> 
            <Box sx={{
                width: "100%"
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%"
                }}>
                    <Text sx={{
                        textTransform: "uppercase",
                        opacity: "0.5",
                        fontSize: ["10px", "12px", null, "14px"]
                    }}>Selección</Text>
                    <Text sx={{
                        textTransform: "uppercase",
                        opacity: "0.5",
                        fontSize: ["10px", "12px", null, "14px"]
                    }}>Total apostado</Text>
                </Box>
                <Box>
                    {
                        teamList.map((item, index)=>(
                            <TeamTableRow key={index} team={item} />
                        ))
                    }
                </Box>

            </Box>

        </Box>
    )
}

interface TeamTableProps{
    team: any[]
}

const TeamTableRow:FC<TeamTableProps> = ({team})=>{
    return(
        <Box sx={{
            width: "100%",
            padding: "30px 0",
            borderBottom: "1px solid rgba(255,255,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <Box sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Box sx={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "30px",
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
                <Text sx={{
                    fontSize: "14px",
                    marginLeft: "20px",
                }}>{team[1].toString()}</Text>
            </Box>
            <Text color={team[2] > 0 ? "#D9F40B" : "#fff"} sx={{
                fontSize: "14px",
                marginLeft: "20px"
            }}>{team[2] > 0 ? ethers.utils.formatEther(team[2]) : 0} Matic</Text>
        </Box>
    )
}