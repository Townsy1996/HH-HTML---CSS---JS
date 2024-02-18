const menuToggle = document.getElementById('menu-toggle');
const menuContainer = document.getElementById('menu-container');
menuToggle.addEventListener('click', function () {
    menuContainer.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM content loaded');

    const apiKey = '6cd62baf9d4e40be81836d219063a41e';


    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        console.log('Search button found on index.html page');
        searchButton.addEventListener('click', function () {
            console.log('Search button clicked');
            const gamertag = document.getElementById('gamertag').value.trim();
            if (gamertag) {
                console.log('Gamertag entered:', gamertag);
                window.location.href = `stats.html?gamertag=${encodeURIComponent(gamertag)}`;
            } else {
                console.log('No gamertag entered');
            }
        });
    } else {
        console.log('Search button not found on index.html page');
    }

    // Check if on stats.html page
    if (window.location.pathname.includes('stats.html')) {
        console.log('On stats.html page');
        const params = new URLSearchParams(window.location.search);
        const gamertag = params.get('gamertag');
        if (gamertag) {
            console.log('Gamertag found in URL:', gamertag);
            fetchPlayerStats(gamertag, apiKey);
        } else {
            console.log('No gamertag found in URL');
        }
    }
});

function fetchPlayerStats(gamertag, apiKey) {
    console.log('Fetching player stats for gamertag:', gamertag);
    fetch(`https://www.haloapi.com/stats/h5/servicerecords/arena?players=${encodeURIComponent(gamertag)}`, {
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        }
    })
        .then(response => {
            console.log('Response received from API');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Player stats:', data);
            
            //Populate stat boxes with API data 
            document.getElementById('spartanRankValue').textContent = data.Results[0].Result.SpartanRank;

            populateStatBox('totalKills', data.Results[0].Result.ArenaStats.TotalKills);
            populateStatBox('totalDeaths', data.Results[0].Result.ArenaStats.TotalDeaths);
            populateStatBox('totalAssists', data.Results[0].Result.ArenaStats.TotalAssists);
            populateStatBox('totalGamesCompleted', data.Results[0].Result.ArenaStats.TotalGamesCompleted);
            populateStatBox('totalGamesWon', data.Results[0].Result.ArenaStats.TotalGamesWon);
            populateStatBox('totalGamesLost', data.Results[0].Result.ArenaStats.TotalGamesLost);
            populateStatBox('totalGamesTied', data.Results[0].Result.ArenaStats.TotalGamesTied);


        })
        .catch(error => {
            console.error('Error fetching player stats:', error);
        });
}

//Function that populates stat data 

function populateStatBox(statBoxId, statValue) {
    const statBoxElement = document.getElementById(statBoxId);
    statBoxElement.querySelector('p').textContent = statValue;
}

