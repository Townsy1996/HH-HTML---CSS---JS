const menuToggle = document.getElementById('menu-toggle');
const menuContainer = document.getElementById('menu-container');
menuToggle.addEventListener('click', function() {
    menuContainer.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded');

    const apiKey = '6cd62baf9d4e40be81836d219063a41e'; // Replace with your Halo API key

    // Event listener for search button on index.html page
    const searchButton = document.getElementById('search-button');
    if (searchButton) {
        console.log('Search button found on index.html page');
        searchButton.addEventListener('click', function() {
            console.log('Search button clicked');
            const gamertag = document.getElementById('gamertag').value.trim();
            if (gamertag) {
                console.log('Gamertag entered:', gamertag);
                window.location.href = `stats.html?gamertag=${encodeURIComponent(gamertag)}`; // Navigate to stats.html with gamertag in URL
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
            // Update the statsContainer with the fetched data
            const statsContainer = document.getElementById('statsContainer');
            // Example: statsContainer.textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching player stats:', error);
        });
}
