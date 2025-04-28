document.addEventListener('DOMContentLoaded', function() {
    // First, define all functions
    function displayResults(data) {
        const pollResults = document.getElementById('poll-results');
        let resultsHTML = '<h3>Poll Results</h3>';
        
        for (const [option, votes] of Object.entries(data)) {
            if (option !== 'totalVotes') {  // Fixed typo here (was 'totalVotes')
                const percentage = data.totalVotes > 0 ? Math.round((votes / data.totalVotes) * 100) : 0;
                resultsHTML += `
                    <div class="result-item">
                        <span>${option}: ${votes} votes (${percentage}%)</span>
                        <div class="result-bar">
                            <div class="result-fill" style="width: ${percentage}%">${percentage}%</div>
                        </div>
                    </div>
                `;
            }
        }

        pollResults.innerHTML = resultsHTML;
        pollResults.style.display = 'block';
        
        // Disable voting controls
        document.querySelectorAll('input[name="poll"]').forEach((radio) => {
            radio.disabled = true;
        });
        const submitBtn = document.getElementById('submit-poll');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Vote Submitted';
        submitBtn.style.backgroundColor = '#cccccc';
    }

    function initializePollData() {
        if (!localStorage.getItem('pollData')) {
            const initialData = {
                "JavaScript": 0,
                "Python": 0,
                "Java": 0,
                "C++": 0,
                "Other": 0,
                "totalVotes": 0  // Fixed typo here (consistent naming)
            };
            localStorage.setItem('pollData', JSON.stringify(initialData));
        }
        return JSON.parse(localStorage.getItem('pollData'));
    }

    // Main execution flow
    const pollData = initializePollData();
    const submitBtn = document.getElementById('submit-poll');

    submitBtn.addEventListener('click', function() {
        const selectedOption = document.querySelector('input[name="poll"]:checked');
        
        if (!selectedOption) {
            alert('Please select an option before submitting.');
            return;
        }

        // Update poll data
        pollData[selectedOption.value]++;
        pollData.totalVotes++;
        localStorage.setItem('pollData', JSON.stringify(pollData));
        localStorage.setItem('hasVoted', 'true');

        displayResults(pollData);
    });

    // Check for existing vote
    if (localStorage.getItem('hasVoted')) {
        displayResults(pollData);
    }
});