// Update the return statement at the end of the file
return {
    getRandomProblem: function() {
        const generator = randomChoice(allGenerators);
        return generator();
    },
    
    getFocusProblem: function() {
        const generator = randomChoice(focusGenerators);
        return generator();
    },
    
    getEstimationProblem: function() {
        const generator = randomChoice(estimationGenerators);
        return generator();
    },
    
    checkAnswer: function(userAnswer, correctAnswer, problemType) {
        // Handle estimation tolerance
        if (problemType && (problemType.includes("Estimation") || problemType.includes("*"))) {
            const userNum = parseFloat(userAnswer);
            const correctNum = parseFloat(correctAnswer);
            
            if (isNaN(userNum) || isNaN(correctNum)) {
                return userAnswer.trim() === correctAnswer.toString().trim();
            }
            
            const tolerance = Math.abs(correctNum * 0.05); // 5% tolerance
            return Math.abs(userNum - correctNum) <= tolerance;
        }
        
        // Handle fractions
        if (userAnswer.includes("/")) {
            const parts = userAnswer.split("/");
            if (parts.length === 2) {
                const numerator = parseFloat(parts[0]);
                const denominator = parseFloat(parts[1]);
                if (denominator === 0) return false;
                
                const decimal = numerator / denominator;
                const correctDecimal = parseFloat(correctAnswer);
                return Math.abs(decimal - correctDecimal) <= 0.01;
            }
        }
        
        // Regular number comparison
        const userNum = parseFloat(userAnswer);
        const correctNum = parseFloat(correctAnswer);
        
        if (isNaN(userNum) || isNaN(correctNum)) {
            return userAnswer.trim() === correctAnswer.toString().trim();
        }
        
        return Math.abs(userNum - correctNum) <= 0.01;
    }
};