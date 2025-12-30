// ===========================================
// BAUHAUS NUMBER SENSE APPLICATION
// Complete rewrite with all functionality
// ===========================================

class NumberSenseApp {
    constructor() {
        this.state = {
            currentScreen: 'menu',
            currentProblem: null,
            currentScore: 0,
            totalProblems: 0,
            problemsInSession: 10,
            currentProblemIndex: 0,
            timer: null,
            timeRemaining: 600,
            isTimerRunning: false,
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
        
        this.init();
    }
    
    init() {
        this.loadStats();
        this.setupEventListeners();
        this.updateUI();
        this.showScreen('menu');
        this.updateCurrentTime();
        
        setInterval(() => this.updateCurrentTime(), 60000);
        
        console.log('App initialized with Bauhaus design');
    }
    
    // Screen Management
    showScreen(screenName) {
        console.log(`Showing screen: ${screenName}`);
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show requested screen
        const screen = document.getElementById(`${screenName}-screen`);
        if (screen) {
            screen.classList.add('active');
            this.state.currentScreen = screenName;
            
            // Update navigation
            this.updateNavigation();
            
            // Initialize screen-specific content
            switch(screenName) {
                case 'menu':
                    this.updateRecentScores();
                    break;
                case 'practice':
                    this.startPractice();
                    break;
                case 'formulas':
                    this.showFormulaCategory('multiplication');
                    break;
                case 'results':
                    this.updateResultsScreen();
                    break;
                case 'history':
                    this.updateHistoryScreen();
                    break;
            }
        }
    }
    
    updateNavigation() {
        const homeBtn = document.getElementById('home-btn');
        if (homeBtn) {
            homeBtn.style.display = this.state.currentScreen === 'menu' ? 'none' : 'flex';
        }
    }
    
    goHome() {
        if (this.state.currentScreen !== 'menu') {
            if (this.state.currentScreen === 'practice' && this.state.currentProblemIndex > 0) {
                if (!confirm('Are you sure you want to quit? Your progress will be saved.')) {
                    return;
                }
            }
            this.endPractice();
            this.showScreen('menu');
        }
    }
    
    // Practice Mode Functions
    startPracticeMode(mode) {
        console.log(`Starting practice mode: ${mode}`);
        
        this.state.practiceMode = mode;
        this.state.currentScore = 0;
        this.state.currentProblemIndex = 0;
        this.state.missedProblems = [];
        
        switch(mode) {
            case 'quick':
                this.state.problemsInSession = 10;
                this.state.timeRemaining = 600;
                break;
            case 'full':
                this.state.problemsInSession = 80;
                this.state.timeRemaining = 600;
                break;
            case 'focus':
                this.state.problemsInSession = 15;
                this.state.timeRemaining = 0;
                break;
            case 'estimation':
                this.state.problemsInSession = 10;
                this.state.timeRemaining = 300;
                break;
            default:
                this.state.problemsInSession = 10;
                this.state.timeRemaining = 600;
        }
        
        this.showScreen('practice');
    }
    
    startPractice() {
        console.log(`Starting practice, mode: ${this.state.practiceMode}`);
        
        this.state.isTimerRunning = false;
        clearInterval(this.state.timer);
        
        if (this.state.practiceMode === 'full' || this.state.practiceMode === 'estimation') {
            this.startTimer();
        }
        
        this.loadNextProblem();
    }
    
    loadNextProblem() {
        if (this.state.currentProblemIndex >= this.state.problemsInSession) {
            this.endPractice();
            return;
        }
        
        this.state.currentProblemIndex++;
        this.state.currentProblem = this.generateProblem();
        
        this.updateProblemDisplay();
    }
    
    generateProblem() {
        let problem;
        
        try {
            switch(this.state.practiceMode) {
                case 'estimation':
                    problem = ProblemGenerators.getEstimationProblem();
                    break;
                case 'focus':
                    problem = ProblemGenerators.getFocusProblem();
                    break;
                default:
                    problem = ProblemGenerators.getRandomProblem();
            }
        } catch (error) {
            console.error('Error generating problem:', error);
            // Fallback to basic problem
            problem = {
                problem: "25 + 17 =",
                answer: 42,
                type: "Addition",
                hint: "Add the ones place first: 5 + 7 = 12, then add the tens"
            };
        }
        
        if (!problem || typeof problem !== 'object') {
            console.error('Invalid problem generated:', problem);
            problem = {
                problem: "10 × 10 =",
                answer: 100,
                type: "Multiplication",
                hint: "10 times 10 equals 100"
            };
        }
        
        this.state.problemTypes.add(problem.type);
        
        return problem;
    }
    
    updateProblemDisplay() {
        document.getElementById('problem-number').textContent = this.state.currentProblemIndex;
        document.getElementById('total-in-session').textContent = this.state.problemsInSession;
        document.getElementById('problem-text').textContent = this.state.currentProblem.problem;
        document.getElementById('problem-type-badge').textContent = this.state.currentProblem.type;
        document.getElementById('current-score').textContent = this.state.currentScore;
        document.getElementById('hint-text').textContent = this.state.currentProblem.hint || '';
        
        // Clear input and feedback
        const answerInput = document.getElementById('answer-input');
        answerInput.value = '';
        document.getElementById('feedback-area').innerHTML = '';
        
        // Focus input
        setTimeout(() => {
            answerInput.focus();
        }, 100);
    }
    
    // Timer Functions
    startTimer() {
        this.state.isTimerRunning = true;
        this.updateTimerDisplay();
        this.state.timer = setInterval(() => this.updateTimer(), 1000);
    }
    
    updateTimer() {
        if (this.state.timeRemaining <= 0) {
            this.endPractice();
            return;
        }
        
        this.state.timeRemaining--;
        this.updateTimerDisplay();
    }
    
    updateTimerDisplay() {
        const minutes = Math.floor(this.state.timeRemaining / 60);
        const seconds = this.state.timeRemaining % 60;
        document.getElementById('timer').textContent = 
            `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    stopTimer() {
        this.state.isTimerRunning = false;
        clearInterval(this.state.timer);
    }
    
    // Answer Handling
    submitAnswer() {
        const input = document.getElementById('answer-input');
        const answer = input.value.trim();
        
        if (!answer) {
            this.showToast('Please enter an answer', 'error');
            return;
        }
        
        this.checkAnswer(answer);
    }
    
    checkAnswer(userAnswer) {
        const problem = this.state.currentProblem;
        const isCorrect = ProblemGenerators.checkAnswer(userAnswer, problem.answer, problem.type);
        
        this.state.totalProblems++;
        
        if (isCorrect) {
            this.state.currentScore++;
            this.state.stats.totalCorrect++;
            this.showFeedback('✓ Correct!', 'success');
            this.showToast('Great job!', 'success');
        } else {
            this.state.missedProblems.push({
                problem: problem.problem,
                correctAnswer: problem.answer,
                userAnswer: userAnswer,
                type: problem.type,
                hint: problem.hint
            });
            this.showFeedback(`✗ Incorrect. Correct answer: ${problem.answer}`, 'error');
            this.showToast('Try again next time!', 'error');
        }
        
        this.state.stats.totalAttempted++;
        this.updateStatsDisplay();
        
        // Load next problem after delay
        setTimeout(() => {
            this.loadNextProblem();
        }, 1500);
    }
    
    skipProblem() {
        console.log('Skipping problem');
        const problem = this.state.currentProblem;
        
        this.state.missedProblems.push({
            problem: problem.problem,
            correctAnswer: problem.answer,
            userAnswer: 'skipped',
            type: problem.type,
            hint: problem.hint
        });
        
        this.state.totalProblems++;
        this.showFeedback(`↶ Skipped. Answer: ${problem.answer}`, 'info');
        
        setTimeout(() => {
            this.loadNextProblem();
        }, 1500);
    }
    
    showHint() {
        const hint = this.state.currentProblem.hint;
        if (hint) {
            this.showToast(hint, 'info');
        } else {
            this.showToast('No hint available for this problem', 'info');
        }
    }
    
    quitPractice() {
        console.log('Quitting practice');
        if (confirm('Are you sure you want to quit? Your progress will be saved.')) {
            this.endPractice();
        }
    }
    
    endPractice() {
        console.log('Ending practice');
        this.stopTimer();
        
        // Save session
        const session = {
            date: new Date().toISOString(),
            mode: this.state.practiceMode,
            score: this.state.currentScore,
            total: this.state.problemsInSession,
            timeSpent: (this.state.practiceMode === 'full' || this.state.practiceMode === 'estimation') 
                ? 600 - this.state.timeRemaining 
                : 0,
            missedCount: this.state.missedProblems.length
        };
        
        this.state.sessionHistory.push(session);
        this.saveStats();
        
        this.showScreen('results');
    }
    
    // Quick Actions
    handleQuickAction(action) {
        switch(action) {
            case 'quick':
                this.startPracticeMode('quick');
                break;
            case 'timed':
                this.startPracticeMode('full');
                break;
            case 'formulas':
                this.showScreen('formulas');
                break;
            case 'results':
                this.showScreen('results');
                break;
        }
    }
    
    // Results Screen
    updateResultsScreen() {
        const score = this.state.currentScore;
        const total = this.state.problemsInSession;
        const percentage = Math.round((score / total) * 100);
        
        document.getElementById('final-score').textContent = score;
        document.getElementById('total-possible').textContent = total;
        document.getElementById('score-percentage').textContent = `${percentage}%`;
        document.getElementById('correct-count').textContent = score;
        document.getElementById('incorrect-count').textContent = this.state.missedProblems.length;
        
        const skippedCount = this.state.missedProblems.filter(p => p.userAnswer === 'skipped').length;
        document.getElementById('skipped-count').textContent = skippedCount;
        
        const timeTaken = (this.state.practiceMode === 'full' || this.state.practiceMode === 'estimation')
            ? 600 - this.state.timeRemaining
            : 0;
        document.getElementById('time-taken').textContent = this.formatTime(timeTaken);
        
        this.updatePerformanceFeedback(percentage);
        this.updateMissedProblemsList();
    }
    
    updatePerformanceFeedback(percentage) {
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
    
    updateMissedProblemsList() {
        const container = document.getElementById('missed-problems-container');
        const list = container.querySelector('.missed-list');
        
        if (this.state.missedProblems.length === 0) {
            list.innerHTML = '<p class="empty-state">No missed problems! Great job!</p>';
            return;
        }
        
        let html = '<div class="missed-problems-grid">';
        this.state.missedProblems.forEach((problem, index) => {
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
    showFormulaCategory(category) {
        // Hide all categories
        document.querySelectorAll('.formula-category').forEach(cat => {
            cat.classList.remove('active');
        });
        
        // Update buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected category
        const categoryElement = document.getElementById(`${category}-formulas`);
        if (categoryElement) {
            categoryElement.classList.add('active');
        }
        
        // Add active class to clicked button
        event.target.classList.add('active');
    }
    
    // History Screen
    updateHistoryScreen() {
        this.updateHistoryChart();
        this.updateHistoryList();
        this.updateHistoryStats();
    }
    
    updateHistoryChart() {
        const ctx = document.getElementById('progress-chart');
        if (!ctx) return;
        
        // Create simple chart data
        const labels = [];
        const data = [];
        
        // Last 7 sessions
        const recentSessions = this.state.sessionHistory.slice(-7);
        
        recentSessions.forEach(session => {
            const date = new Date(session.date);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            data.push(Math.round((session.score / session.total) * 100));
        });
        
        // If no data, show empty state
        if (recentSessions.length === 0) {
            ctx.parentElement.innerHTML = '<p class="empty-state">Complete practice sessions to see progress</p>';
            return;
        }
    }
    
    updateHistoryList() {
        const container = document.getElementById('history-list');
        const sessions = this.state.sessionHistory.slice().reverse();
        
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
                    <div class="session-date">${date.toLocaleDateString()}</div>
                    <div class="session-info">
                        <span class="session-mode">${session.mode}</span>
                        <span class="session-score">${session.score}/${session.total} (${percentage}%)</span>
                    </div>
                    <div class="session-time">${this.formatTime(session.timeSpent)}</div>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
    }
    
    updateHistoryStats() {
        if (this.state.sessionHistory.length === 0) {
            document.getElementById('best-score').textContent = '0/0';
            document.getElementById('average-score').textContent = '0%';
            document.getElementById('total-practice').textContent = '0m';
            return;
        }
        
        // Best score
        const bestSession = this.state.sessionHistory.reduce((best, session) => {
            const percentage = session.score / session.total;
            return percentage > (best.score / best.total) ? session : best;
        }, this.state.sessionHistory[0]);
        
        document.getElementById('best-score').textContent = 
            `${bestSession.score}/${bestSession.total}`;
        
        // Average score
        const totalPercentage = this.state.sessionHistory.reduce((sum, session) => {
            return sum + (session.score / session.total);
        }, 0);
        
        const averagePercentage = Math.round((totalPercentage / this.state.sessionHistory.length) * 100);
        document.getElementById('average-score').textContent = `${averagePercentage}%`;
        
        // Total practice time
        const totalMinutes = this.state.sessionHistory.reduce((sum, session) => sum + session.timeSpent, 0) / 60;
        document.getElementById('total-practice').textContent = this.formatTime(totalMinutes * 60);
    }
    
    // Stats Management
    loadStats() {
        const saved = localStorage.getItem('bauhausNumberSenseStats');
        if (saved) {
            const stats = JSON.parse(saved);
            Object.assign(this.state.stats, stats);
        }
        
        const history = localStorage.getItem('bauhausNumberSenseHistory');
        if (history) {
            this.state.sessionHistory = JSON.parse(history);
        }
        
        this.updateStatsDisplay();
    }
    
    saveStats() {
        localStorage.setItem('bauhausNumberSenseStats', JSON.stringify(this.state.stats));
        localStorage.setItem('bauhausNumberSenseHistory', JSON.stringify(this.state.sessionHistory));
    }
    
    updateStatsDisplay() {
        const accuracy = this.state.stats.totalAttempted > 0 ?
            Math.round((this.state.stats.totalCorrect / this.state.stats.totalAttempted) * 100) : 0;
        
        document.getElementById('daily-score').textContent = this.state.currentScore;
        document.getElementById('total-problems').textContent = this.state.stats.totalAttempted;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
        
        const progress = this.state.problemsInSession > 0 ?
            (this.state.currentProblemIndex / this.state.problemsInSession) * 100 : 0;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${Math.round(progress)}%`;
        
        this.updateTypeTags();
    }
    
    updateTypeTags() {
        const container = document.getElementById('type-tags');
        const types = Array.from(this.state.problemTypes);
        
        if (types.length === 0) {
            container.innerHTML = '<span class="type-tag">Start practicing!</span>';
            return;
        }
        
        let html = '';
        types.slice(-8).forEach(type => {
            html += `<span class="type-tag">${type}</span>`;
        });
        container.innerHTML = html;
    }
    
    // UI Helpers
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        
        // Remove existing toasts
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${this.getIconForType(type)}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            if (toast.parentNode === container) {
                toast.remove();
            }
        }, 3000);
    }
    
    getIconForType(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'info': return 'info-circle';
            default: return 'info-circle';
        }
    }
    
    showFeedback(message, type) {
        const container = document.getElementById('feedback-area');
        container.innerHTML = `
            <div class="feedback-message ${type}">
                <i class="fas fa-${this.getIconForType(type)}"></i>
                <span>${message}</span>
            </div>
        `;
    }
    
    updateCurrentTime() {
        const now = new Date();
        document.getElementById('current-time').textContent = 
            now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    updateRecentScores() {
        const container = document.getElementById('recent-scores-list');
        const recentSessions = this.state.sessionHistory.slice(-3).reverse();
        
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
    
    updateUI() {
        this.updateStatsDisplay();
        this.updateRecentScores();
    }
    
    setupEventListeners() {
        // Answer input
        const answerInput = document.getElementById('answer-input');
        if (answerInput) {
            answerInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.submitAnswer();
                }
            });
        }
        
        // Quick action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                if (action) {
                    this.handleQuickAction(action);
                }
            });
        });
        
        // Command buttons
        document.getElementById('skip-btn')?.addEventListener('click', () => this.skipProblem());
        document.getElementById('hint-btn')?.addEventListener('click', () => this.showHint());
        document.getElementById('quit-btn')?.addEventListener('click', () => this.quitPractice());
        
        // Submit button
        document.getElementById('submit-btn')?.addEventListener('click', () => this.submitAnswer());
        
        // Home button
        document.getElementById('home-btn')?.addEventListener('click', () => this.goHome());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.state.currentScreen === 'practice') {
                switch(e.key) {
                    case 'Escape':
                        this.quitPractice();
                        break;
                    case ' ':
                        e.preventDefault();
                        this.skipProblem();
                        break;
                    case 'h':
                    case 'H':
                        e.preventDefault();
                        this.showHint();
                        break;
                }
            }
        });
    }
    
    // Modal Functions
    showInstructions() {
        document.getElementById('instructions-modal').style.display = 'flex';
    }
    
    closeModal() {
        document.getElementById('instructions-modal').style.display = 'none';
    }
    
    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.clear();
            location.reload();
        }
    }
    
    exportData() {
        const data = {
            stats: this.state.stats,
            history: this.state.sessionHistory,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'number-sense-progress.json';
        a.click();
        URL.revokeObjectURL(url);
        
        this.showToast('Data exported successfully!', 'success');
    }
}

// Initialize the app
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new NumberSenseApp();
    
    // Make app methods globally available
    window.app = app;
    
    // Global event handlers for HTML onclick attributes
    window.startPracticeMode = (mode) => app.startPracticeMode(mode);
    window.showScreen = (screen) => app.showScreen(screen);
    window.showFormulaCategory = (category) => app.showFormulaCategory(category);
    window.submitAnswer = () => app.submitAnswer();
    window.skipProblem = () => app.skipProblem();
    window.showHint = () => app.showHint();
    window.quitPractice = () => app.quitPractice();
    window.showInstructions = () => app.showInstructions();
    window.closeModal = () => app.closeModal();
    window.resetProgress = () => app.resetProgress();
    window.exportData = () => app.exportData();
    window.reviewMissed = () => app.showToast('Review mode coming soon!', 'info');
    window.startSimilarPractice = () => {
        app.showToast('Starting similar practice...', 'info');
        app.startPracticeMode('focus');
    };
});