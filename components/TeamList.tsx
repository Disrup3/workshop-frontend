import { FC } from "react";
import {TEAM_LIST, team} from "../constants/teams";

interface Props {
    teamList: any[];
}

const TeamList: FC<Props> = ({teamList}) => {

    if(!teamList) return (
        <div>

        </div>
    )

  return (
    <div className="flex flex-wrap justify-center mt-10">
        {teamList.map(team  => (
            <TeamCard key={team.teamId} team={team}/>
        ))}
    </div>
  )
}
interface TeamProps {
    team: any[];
}
const TeamCard: FC<TeamProps> = ({team}) => {    

    return (
        <div className=" shadow-md rounded border-red-100 m-5 p-5">
            <h3 className="text-center mb-2">{team[0].toString()} - {team[1].toString()}</h3>
            <p>cantidad apostada: {team[2].toString()}matic</p>
        </div>
    )
}

export default TeamList