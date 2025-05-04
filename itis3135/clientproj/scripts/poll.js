document.addEventListener('DOMContentLoaded', function() {
    // displays results 
    function displayResults(data) {
        const pollResults = document.getElementById('poll-results');
        let resultsHTML = `<h3>Poll Results (Total Votes: ${data.totalVotes})</h3>`;
        
        for (const [option, votes] of Object.entries(data)) {
            if (option !== 'totalVotes') { 
                const percentage = data.totalVotes > 0 ? (votes / data.totalVotes) * 100 : 0;
                const roundedPercentage = Math.round(percentage * 10) / 10; // Round to 1 decimal place
                
                resultsHTML += `
                    <div class="result-item">
                        <span>${option}: ${votes} votes (${roundedPercentage}%)</span>
                        <div class="result-bar">
                            <div class="result-fill" style="width: ${percentage}%">${roundedPercentage}%</div>
                        </div>
                    </div>
                `;
            }
        }

        pollResults.innerHTML = resultsHTML;
        pollResults.style.display = 'block';
        
        // disables voting controls after submission
        document.querySelectorAll('input[name="poll"]').forEach((radio) => {
            radio.disabled = true;
        });
        const submitBtn = document.getElementById('submit-poll');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Vote Submitted';
        submitBtn.style.backgroundColor = '#cccccc';
    }
    //initializes poll data 
    function initializePollData() {
        if (!localStorage.getItem('pollData')) {
            const initialData = {
                "Tekken": 1,
                "Workshop": 0,
                "Unity": 0,
                "Collection Showcase": 0,
                "totalVotes": 1
            };
            localStorage.setItem('pollData', JSON.stringify(initialData));
        }
        return JSON.parse(localStorage.getItem('pollData'));
    }

    const pollData = initializePollData();
    const submitBtn = document.getElementById('submit-poll');

    submitBtn.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="poll"]:checked');
        
        if (!selectedOption) {
            alert('Please select an option before submitting.');
            return;
        }

        //updating poll
        pollData[selectedOption.value]++;
        pollData.totalVotes++;
        localStorage.setItem('pollData', JSON.stringify(pollData));
        localStorage.setItem('hasVoted', 'true');

        displayResults(pollData);
    });

    //Check for existing vote
    if (localStorage.getItem('hasVoted')) {
        displayResults(pollData);
    }
});
//dev console reset
// localStorage.removeItem('pollData');
// localStorage.removeItem('hasVoted');
// location.reload(); 