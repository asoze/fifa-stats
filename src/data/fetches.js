const axios = require('axios');

const fetches = {
    getMatches: function() {
        return axios({
            "method":"GET",
            "url":"https://montanaflynn-fifa-world-cup.p.rapidapi.com/games",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"montanaflynn-fifa-world-cup.p.rapidapi.com",
            "x-rapidapi-key":"40e59020e0mshc0803894d97393bp103acbjsn351b37664b6f",
            "accepts":"json"
        }
        });
    },
    getTeams: function() {
        return axios({
            "method":"GET",
            "url":"https://montanaflynn-fifa-world-cup.p.rapidapi.com/teams",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"montanaflynn-fifa-world-cup.p.rapidapi.com",
            "x-rapidapi-key":"40e59020e0mshc0803894d97393bp103acbjsn351b37664b6f",
            "accepts":"json"
            }
        });
    },
    getPersons: function() {
        return axios({
            "method":"GET",
            "url":"https://montanaflynn-fifa-world-cup.p.rapidapi.com/persons",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"montanaflynn-fifa-world-cup.p.rapidapi.com",
            "x-rapidapi-key":"40e59020e0mshc0803894d97393bp103acbjsn351b37664b6f",
            "accepts":"json"
            }
        });
    }
}

module.exports = {
    fetches
}
