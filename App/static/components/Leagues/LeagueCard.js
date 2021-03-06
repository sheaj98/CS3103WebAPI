import { LeagueCardTemplate } from '../../templates/Leagues/LeagueCardTemplate.js'

const LeagueCard = {
    //------- props -------
    props: {
        leagueId: String,
        leagueName: String, 
        leagueDescription: String,
    },
    
    //------- data --------
    data: {
        serviceURL: "https://cs3103.cs.unb.ca:8005",
    },

    template: LeagueCardTemplate,

}

export { LeagueCard }