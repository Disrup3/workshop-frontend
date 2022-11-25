import { FC } from "react";
import {TEAM_LIST, team} from "../constants/teams";

const TeamList = () => {

  return (
    <div className="flex flex-wrap justify-center mt-10">
        {TEAM_LIST.map(team  => (
            <TeamCard key={team.teamId} team={team}/>
        ))}
    </div>
  )
}
interface Props {
    team: team;
}
const TeamCard: FC<Props> = ({team}) => {

    

    return (
        <div className=" shadow-md rounded border-red-100 m-5 p-5">
            <h3 className="text-center mb-2">{team.teamName} - {team.teamEmoji}</h3>
            <p>cantidad apostada: 100matic</p>
        </div>
    )
}

export default TeamList