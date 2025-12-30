// Add this function to show problem type count
function showProblemTypeCount() {
    if (ProblemGenerators && ProblemGenerators.getGeneratorCount) {
        const counts = ProblemGenerators.getGeneratorCount();
        console.log(`Available problem generators: ${counts.total} total, ${counts.focus} focus, ${counts.estimation} estimation`);
        
        // Update UI if we want to show this
        const typeTags = document.getElementById('typeTags');
        if (typeTags) {
            const countText = `${counts.total}+ Problem Types`;
            if (!typeTags.querySelector('.type-count')) {
                const countElement = document.createElement('span');
                countElement.className = 'type-tag type-count';
                countElement.textContent = countText;
                typeTags.prepend(countElement);
            }
        }
    }
}

// Update the init function to show counts
init: function() {
    console.log('App initializing...');
    this.setupEventListeners();
    this.showScreen('menu');
    this.updateTime();
    setInterval(() => this.updateTime(), 60000);
    
    // Load saved data
    this.loadStats();
    
    // Show problem type count
    setTimeout(() => {
        showProblemTypeCount();
    }, 1000);
    
    console.log('App initialized successfully');
},

// Update the updateStats function to show more types
updateStats: function() {
    // ... existing code ...
    
    // Update type tags with more variety
    if (ProblemGenerators && ProblemGenerators.getProblemTypes) {
        try {
            const allTypes = ProblemGenerators.getProblemTypes();
            const container = document.getElementById('typeTags');
            if (container) {
                // Show 8 random types
                const randomTypes = [...allTypes]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 8);
                
                let html = `<span class="type-tag type-count">${allTypes.length}+ Types</span>`;
                randomTypes.forEach(type => {
                    html += `<span class="type-tag">${type}</span>`;
                });
                container.innerHTML = html;
            }
        } catch (e) {
            console.log('Could not load problem types:', e);
        }
    }
},