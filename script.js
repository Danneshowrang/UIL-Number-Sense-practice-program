// Main Application State
const AppState = {
    currentScreen: 'menu',
    currentProblem: null,
    currentScore: 0,
    totalProblems: 0,
    problemsInSession: 10,
    currentProblemIndex: 0,
    timer: null,
    timeRemaining: 600,
    isTimerRunning: false,
    userAnswer: '',
    missedProblems: [],
    sessionHistory: [],
    practiceMode: 'quick',
    problemTypes: new Set(),
    stats: {
        totalCorrect: 0,
        totalAttempted: 0,
        bestScore: 0,
        averageScore: 0,
        timeSpent: 0
    }
};

// DOM Elements
const screens = {
    menu: document.getElementById('menu-screen'),
    practice: document.getElementById('practice-screen'),
    formulas: document.getElementById('formulas-screen'),
    results: document.getElementById('results-screen'),
    history: document.getElementById('history-screen')
};

// Initialize the application
function init() {
    loadStats();
    updateUI();
    setupEventListeners();
    showScreen('menu');
    updateCurrentTime();
    
    // Update time every minute
    setInterval(updateCurrentTime, 60000);
}

// Screen Management
function showScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show requested screen
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
        AppState.currentScreen = screenName;
        
        // Initialize screen-specific content
        switch(screenName) {
            case 'menu':
                updateRecentScores();
                break;
            case 'practice':
                startPractice();
                break;
            case 'formulas':
                showFormulaCategory('multiplication');
                break;
            case 'results':
                updateResultsScreen();
                break;
            case 'history':
                updateHistoryScreen();
                break;
        }
    }
}

// Practice Mode Functions
function startPracticeMode(mode) {
    AppState.practiceMode = mode;
    
    switch(mode) {
        case 'quick':
            AppState.problemsInSession = 10;
            AppState.timeRemaining = 600;
            break;
        case 'full':
            AppState.problemsInSession = 80;
            AppState.timeRemaining = 600;
            break;
        case 'focus':
            AppState.problemsInSession = 15;
            AppState.timeRemaining = 0;
            break;
        case 'estimation':
            AppState.problemsInSession = 10;
            AppState.timeRemaining = 300;
            break;
    }
    
    AppState.currentScore = 0;
    AppState.currentProblemIndex = 0;
    AppState.missedProblems = [];
    
    showScreen('practice');
}

function startPractice() {
    AppState.isTimerRunning = false;
    clearInterval(AppState.timer);
    
    if (AppState.practiceMode === 'full' || AppState.practiceMode === 'estimation') {
        startTimer();
    }
    
    loadNextProblem();
}

function loadNextProblem() {
    if (AppState.currentProblemIndex >= AppState.problemsInSession) {
        endPractice();
        return;
    }
    
    AppState.currentProblemIndex++;
    AppState.currentProblem = generateProblem();
    
    updateProblemDisplay();
}

function generateProblem() {
    // Get appropriate problem generator based on mode
    let generator;
    
    switch(AppState.practiceMode) {
        case 'estimation':
            generator = ProblemGenerators.getEstimationProblem();
            break;
        case 'focus':
            generator = ProblemGenerators.getFocusProblem();
            break;
        default:
            generator = ProblemGenerators.getRandomProblem();
    }
    
    const problem = generator();
    AppState.problemTypes.add(problem.type);
    
    return problem;
}

function updateProblemDisplay() {
    document.getElementById('problem-number').textContent = AppState.currentProblemIndex;
    document.getElementById('total-in-session').textContent = AppState.problemsInSession;
    document.getElementById('problem-text').textContent = AppState.currentProblem.problem;
    document.getElementById('problem-type-badge').textContent = AppState.currentProblem.type;
    document.getElementById('current-score').textContent = AppState.currentScore;
    
    // Clear input and feedback
    document.getElementById('answer-input').value = '';
    document.getElementById('feedback-area').innerHTML = '';
    document.getElementById('hint-text').textContent = AppState.currentProblem.hint || '';
    
    // Focus input
    document.getElementById('answer-input').focus();
}

// Timer Functions
function startTimer() {
    AppState.isTimerRunning = true;
    AppState.timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (AppState.timeRemaining <= 0) {
        endPractice();
        return;
    }
    
    AppState.timeRemaining--;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(AppState.timeRemaining / 60);
    const seconds = AppState.timeRemaining % 60;
    document.getElementById('timer').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function stopTimer() {
    AppState.isTimerRunning = false;
    clearInterval(AppState.timer);
}

// Answer Handling
function submitAnswer() {
    const input = document.getElementById('answer-input');
    const answer = input.value.trim();
    
    if (!answer) {
        showToast('Please enter an answer', 'error');
        return;
    }
    
    checkAnswer(answer);
}

function checkAnswer(userAnswer) {
    const problem = AppState.currentProblem;
    const isCorrect = ProblemGenerators.checkAnswer(userAnswer, problem.answer, problem.type);
    
    AppState.totalProblems++;
    
    if (isCorrect) {
        AppState.currentScore++;
        AppState.stats.totalCorrect++;
        showFeedback('✓ Correct!', 'success');
        showToast('Great job!', 'success');
    } else {
        AppState.missedProblems.push({
            problem: problem.problem,
            correctAnswer: problem.answer,
            userAnswer: userAnswer,
            type: problem.type,
            hint: problem.hint
        });
        showFeedback(`✗ Incorrect. Correct answer: ${problem.answer}`, 'error');
        showToast('Try again next time!', 'error');
    }
    
    AppState.stats.totalAttempted++;
    
    // Update stats display
    updateStatsDisplay();
    
    // Load next problem after delay
    setTimeout(() => {
        loadNextProblem();
    }, 1500);
}

function skipProblem() {
    const problem = AppState.currentProblem;
    
    AppState.missedProblems.push({
        problem: problem.problem,
        correctAnswer: problem.answer,
        userAnswer: 'skipped',
        type: problem.type,
        hint: problem.hint
    });
    
    AppState.totalProblems++;
    showFeedback(`↶ Skipped. Answer: ${problem.answer}`, 'info');
    
    setTimeout(() => {
        loadNextProblem();
    }, 1500);
}

function showHint() {
    const hint = AppState.currentProblem.hint;
    if (hint) {
        showToast(hint, 'info');
    } else {
        showToast('No hint available for this problem', 'info');
    }
}

function quitPractice() {
    if (confirm('Are you sure you want to quit? Your progress will be saved.')) {
        endPractice();
    }
}

function endPractice() {
    stopTimer();
    
    // Save session
    const session = {
        date: new Date().toISOString(),
        mode: AppState.practiceMode,
        score: AppState.currentScore,
        total: AppState.problemsInSession,
        timeSpent: 600 - AppState.timeRemaining,
        missedCount: AppState.missedProblems.length
    };
    
    AppState.sessionHistory.push(session);
    saveStats();
    
    showScreen('results');
}

// Results Screen
function updateResultsScreen() {
    const score = AppState.currentScore;
    const total = AppState.problemsInSession;
    const percentage = Math.round((score / total) * 100);
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('total-possible').textContent = total;
    document.getElementById('score-percentage').textContent = `${percentage}%`;
    document.getElementById('correct-count').textContent = score;
    document.getElementById('incorrect-count').textContent = AppState.missedProblems.length;
    document.getElementById('skipped-count').textContent = 0; // Calculate skipped from missed
    document.getElementById('time-taken').textContent = formatTime(600 - AppState.timeRemaining);
    
    updatePerformanceFeedback(percentage);
    updateMissedProblemsList();
}

function updatePerformanceFeedback(percentage) {
    const feedback = document.getElementById('performance-feedback');
    let message = '';
    
    if (percentage >= 90) {
        message = 'Outstanding! National champion level! You\'re ready for state competition.';
    } else if (percentage >= 80) {
        message = 'Great job! Regional finalist level. Focus on speed and the last 20 problems.';
    } else if (percentage >= 70) {
        message = 'Good work! Competitive district level. Practice estimation problems and radicals.';
    } else if (percentage >= 60) {
        message = 'Solid foundation! Keep practicing. Work on fractions and basic algebra.';
    } else {
        message = 'Keep working! Focus on fundamentals. Practice problems 1-40 repeatedly.';
    }
    
    feedback.innerHTML = `<h3><i class="fas fa-chart-line"></i> Performance Analysis</h3><p>${message}</p>`;
}

function updateMissedProblemsList() {
    const container = document.getElementById('missed-problems-container');
    const list = container.querySelector('.missed-list');
    
    if (AppState.missedProblems.length === 0) {
        list.innerHTML = '<p class="empty-state">No missed problems! Great job!</p>';
        return;
    }
    
    let html = '<div class="missed-problems-grid">';
    AppState.missedProblems.forEach((problem, index) => {
        html += `
            <div class="missed-problem">
                <div class="missed-header">
                    <span class="problem-type">${problem.type}</span>
                    <span class="problem-number">#${index + 1}</span>
                </div>
                <div class="problem-text">${problem.problem}</div>
                <div class="correct-answer">Correct: ${problem.correctAnswer}</div>
                ${problem.userAnswer !== 'skipped' ? 
                    `<div class="user-answer">Your answer: ${problem.userAnswer}</div>` : 
                    '<div class="user-answer skipped">Skipped</div>'}
            </div>
        `;
    });
    html += '</div>';
    
    list.innerHTML = html;
}

// Formulas Screen
function showFormulaCategory(category) {
    // Hide all categories
    document.querySelectorAll('.formula-category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    // Update buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected category
    document.getElementById(`${category}-formulas`).classList.add('active');
    event.target.classList.add('active');
}

// History Screen
function updateHistoryScreen() {
    updateHistoryChart();
    updateHistoryList();
    updateHistoryStats();
}

function updateHistoryChart() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    
    const labels = [];
    const data = [];
    
    // Last 7 sessions
    const recentSessions = AppState.sessionHistory.slice(-7);
    
    recentSessions.forEach(session => {
        const date = new Date(session.date);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        data.push(Math.round((session.score / session.total) * 100));
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Score (%)',
                data: data,
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function updateHistoryList() {
    const container = document.getElementById('history-list');
    const sessions = AppState.sessionHistory.slice().reverse(); // Show newest first
    
    if (sessions.length === 0) {
        container.innerHTML = '<p class="empty-state">No practice history yet. Complete a session to see results!</p>';
        return;
    }
    
    let html = '<div class="history-sessions">';
    sessions.forEach(session => {
        const date = new Date(session.date);
        const percentage = Math.round((session.score / session.total) * 100);
        
        html += `
            <div class="history-session">
                <div class="session-date">${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                <div class="session-info">
                    <span class="session-mode">${session.mode}</span>
                    <span class="session-score">${session.score}/${session.total} (${percentage}%)</span>
                </div>
                <div class="session-time">${formatTime(session.timeSpent)}</div>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

function updateHistoryStats() {
    if (AppState.sessionHistory.length === 0) {
        document.getElementById('best-score').textContent = '0/0';
        document.getElementById('average-score').textContent = '0%';
        document.getElementById('total-practice').textContent = '0m';
        return;
    }
    
    // Best score
    const bestSession = AppState.sessionHistory.reduce((best, session) => {
        const percentage = session.score / session.total;
        return percentage > (best.score / best.total) ? session : best;
    }, AppState.sessionHistory[0]);
    
    document.getElementById('best-score').textContent = 
        `${bestSession.score}/${bestSession.total} (${Math.round((bestSession.score / bestSession.total) * 100)}%)`;
    
    // Average score
    const totalPercentage = AppState.sessionHistory.reduce((sum, session) => {
        return sum + (session.score / session.total);
    }, 0);
    
    const averagePercentage = Math.round((totalPercentage / AppState.sessionHistory.length) * 100);
    document.getElementById('average-score').textContent = `${averagePercentage}%`;
    
    // Total practice time
    const totalMinutes = AppState.sessionHistory.reduce((sum, session) => sum + session.timeSpent, 0) / 60;
    document.getElementById('total-practice').textContent = formatTime(totalMinutes * 60);
}

// Stats Management
function loadStats() {
    const saved = localStorage.getItem('numberSenseStats');
    if (saved) {
        const stats = JSON.parse(saved);
        Object.assign(AppState.stats, stats);
    }
    
    const history = localStorage.getItem('numberSenseHistory');
    if (history) {
        AppState.sessionHistory = JSON.parse(history);
    }
    
    updateStatsDisplay();
}

function saveStats() {
    localStorage.setItem('numberSenseStats', JSON.stringify(AppState.stats));
    localStorage.setItem('numberSenseHistory', JSON.stringify(AppState.sessionHistory));
}

function updateStatsDisplay() {
    const accuracy = AppState.stats.totalAttempted > 0 ?
        Math.round((AppState.stats.totalCorrect / AppState.stats.totalAttempted) * 100) : 0;
    
    document.getElementById('daily-score').textContent = AppState.currentScore;
    document.getElementById('total-problems').textContent = AppState.stats.totalAttempted;
    document.getElementById('accuracy').textContent = `${accuracy}%`;
    
    const progress = AppState.problemsInSession > 0 ?
        (AppState.currentProblemIndex / AppState.problemsInSession) * 100 : 0;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
    
    // Update type tags
    updateTypeTags();
}

function updateTypeTags() {
    const container = document.getElementById('type-tags');
    const types = Array.from(AppState.problemTypes);
    
    if (types.length === 0) {
        container.innerHTML = '<span class="type-tag">Start practicing!</span>';
        return;
    }
    
    let html = '';
    types.forEach(type => {
        html += `<span class="type-tag">${type}</span>`;
    });
    container.innerHTML = html;
}

// UI Helpers
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${getIconForType(type)}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function getIconForType(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'info': return 'info-circle';
        default: return 'info-circle';
    }
}

function showFeedback(message, type) {
    const container = document.getElementById('feedback-area');
    container.innerHTML = `
        <div class="feedback-message ${type}">
            <i class="fas fa-${getIconForType(type)}"></i>
            <span>${message}</span>
        </div>
    `;
}

function updateCurrentTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = 
        now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateRecentScores() {
    const container = document.getElementById('recent-scores-list');
    const recentSessions = AppState.sessionHistory.slice(-3).reverse();
    
    if (recentSessions.length === 0) {
        container.innerHTML = '<p class="empty-state">Complete a practice session to see scores</p>';
        return;
    }
    
    let html = '<div class="scores-grid">';
    recentSessions.forEach(session => {
        const percentage = Math.round((session.score / session.total) * 100);
        const date = new Date(session.date);
        
        html += `
            <div class="score-card">
                <div class="score-percent">${percentage}%</div>
                <div class="score-details">
                    <div class="score-mode">${session.mode}</div>
                    <div class="score-date">${date.toLocaleDateString()}</div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Event Listeners
function setupEventListeners() {
    // Answer input keypress
    document.getElementById('answer-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (AppState.currentScreen === 'practice') {
            switch(e.key) {
                case 'Escape':
                    quitPractice();
                    break;
                case ' ':
                    e.preventDefault();
                    skipProblem();
                    break;
                case 'h':
                case 'H':
                    showHint();
                    break;
            }
        }
    });
}

// Modal Functions
function showInstructions() {
    document.getElementById('instructions-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('instructions-modal').style.display = 'none';
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        localStorage.clear();
        location.reload();
    }
}

function exportData() {
    const data = {
        stats: AppState.stats,
        history: AppState.sessionHistory,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'number-sense-progress.json';
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Data exported successfully!', 'success');
}

// Quick Action Functions
function startQuickPractice() {
    startPracticeMode('quick');
}

function startTimedTest() {
    startPracticeMode('full');
}

function reviewMissed() {
    if (AppState.missedProblems.length === 0) {
        showToast('No missed problems to review!', 'info');
        return;
    }
    // Implement review functionality
    showToast('Review mode coming soon!', 'info');
}

function startSimilarPractice() {
    // Start practice with similar problem types
    showToast('Starting similar practice...', 'info');
    startPracticeMode('focus');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);