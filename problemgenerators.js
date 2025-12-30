return {
    getRandomProblem: function() {
        const generator = randomChoice(allGenerators);
        const problem = generator();
        console.log('Generated problem:', problem);
        return problem;
    },
    
    getFocusProblem: function() {
        const generator = randomChoice(focusGenerators);
        const problem = generator();
        console.log('Generated focus problem:', problem);
        return problem;
    },
    
    getEstimationProblem: function() {
        const generator = randomChoice(estimationGenerators);
        const problem = generator();
        console.log('Generated estimation problem:', problem);
        return problem;
    },
    
    checkAnswer: function(userAnswer, correctAnswer, problemType) {
        console.log('Checking answer:', { userAnswer, correctAnswer, problemType });
        
        // Handle estimation tolerance
        if (problemType && (problemType.includes("Estimation") || problemType.includes("*"))) {
            const userNum = parseFloat(userAnswer);
            const correctNum = parseFloat(correctAnswer);
            
            if (isNaN(userNum) || isNaN(correctNum)) {
                return userAnswer.trim() === correctAnswer.toString().trim();
            }
            
            const tolerance = Math.abs(correctNum * 0.05);
            const isCorrect = Math.abs(userNum - correctNum) <= tolerance;
            console.log('Estimation check:', { userNum, correctNum, tolerance, isCorrect });
            return isCorrect;
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
                const isCorrect = Math.abs(decimal - correctDecimal) <= 0.01;
                console.log('Fraction check:', { decimal, correctDecimal, isCorrect });
                return isCorrect;
            }
        }
        
        // Regular number comparison
        const userNum = parseFloat(userAnswer);
        const correctNum = parseFloat(correctAnswer);
        
        if (isNaN(userNum) || isNaN(correctNum)) {
            const isCorrect = userAnswer.trim() === correctAnswer.toString().trim();
            console.log('String comparison:', { userAnswer, correctAnswer, isCorrect });
            return isCorrect;
        }
        
        const isCorrect = Math.abs(userNum - correctNum) <= 0.01;
        console.log('Number comparison:', { userNum, correctNum, isCorrect });
        return isCorrect;
    }
};