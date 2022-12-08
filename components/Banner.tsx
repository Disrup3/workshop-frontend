import { Box, Image, Text } from "@chakra-ui/react"
import { FC } from "react";

interface BannerProps {
    totalBetAmount: String;
}


export const Banner:FC<BannerProps> = ({totalBetAmount})=>{
    return(
        <Box sx={{
            display:"flex",
            padding: ["15px", "25px", "55px"],
            borderRadius: ["10px", "10px", "30px"],
            background: "linear-gradient(98.16deg, #D9F40B 1.81%, rgba(217, 244, 11, 0.51) 100%)",
            position: "relative",
            marginTop: ["5vh", "10vh", "10vh"],
            width: "100%",
            zIndex: "1"
            }}>
            <Box sx={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexDirection: "column",
                color: "#000"
            }}>
                <Text as="h1" sx={{
                    fontSize: ["25px", "25px", "40px"],
                    lineHeight: ["30px", "30px", "45px"],
                    textTransform: "uppercase",
                    color: "#000",
                    marginBottom:"15px"
                }}>Mrcrypto <br></br>betting app</Text>
                <Text as="p" sx={{
                    width: ["100%", "60%"],
                    fontSize: ["12px", "12px", "14px"]
                    }}>Adivina que equipo ganará la copa del mundo de Qatar 2022.</Text>
                <Box sx={{
                    padding: "10px",
                    borderRadius: "10px",
                    background: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    minWidth: "45%",
                    marginTop: "15px"
                }}>
                    <Text sx={{
                        color: "#f2f2f2",
                        textTransform: "uppercase",
                        fontFamily: "'Monument'",
                        fontSize: "14px",
                        width: "max-content",
                        marginRight: "30px"
                    }}>Total betted</Text>
                    <Text sx={{
                        color: "#D9F40B",
                        textTransform: "uppercase",
                        fontFamily: "'Monument'",
                        fontSize: "14px",
                        width: "max-content"
                    }}>{totalBetAmount}</Text>
                </Box>
            </Box>
            <Image src={"/images/Neymar.png"} sx={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: ["150px", "200px", "250px"],
                zIndex: "-1"
            }}></Image>
        </Box>
    )
}