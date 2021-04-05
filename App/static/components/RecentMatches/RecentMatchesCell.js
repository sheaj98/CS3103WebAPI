import { RecentMatchesCellTemplate } from '../../templates/RecentMatches/RecentMatchesCellTemplate.js'

const RecentMatchesCell = {
    data: function() {
        return {
            user1: {
                firstName: "Ethan",
                lastName: "Eddy",
                points: 100
            },
            user2: {
                firstName: "Shea",
                lastName: "Sullivan",
                points: 80
            },
        }
    },
    template: RecentMatchesCellTemplate
}

export { RecentMatchesCell }