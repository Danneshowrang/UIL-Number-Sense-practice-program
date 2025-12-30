// Problem Generators Module
const ProblemGenerators = (function() {
    // Utility functions
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    function gcd(a, b) {
        while (b) [a, b] = [b, a % b];
        return a;
    }
    
    // 1. Basic Arithmetic Generators
    function generateAddition() {
        const a = randomInt(1000, 9999);
        const b = randomInt(100, 999);
        return {
            problem: `${a} + ${b} =`,
            answer: a + b,
            type: "Addition",
            hint: "Add the thousands, hundreds, tens, and ones separately"
        };
    }
    
    function generateSubtraction() {
        const a = randomInt(1500, 9999);
        const b = randomInt(500, a - 100);
        return {
            problem: `${a} - ${b} =`,
            answer: a - b,
            type: "Subtraction",
            hint: "Borrow when necessary, work from right to left"
        };
    }
    
    function generateMultiplication() {
        const a = randomInt(10, 99);
        const b = randomInt(10, 99);
        return {
            problem: `${a} × ${b} =`,
            answer: a * b,
            type: "Multiplication",
            hint: `Use FOIL: ${a} × ${b} = ${Math.floor(a/10)*10}×${b} + ${a%10}×${b}`
        };
    }
    
    function generateDivision() {
        const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const divisor = randomChoice(divisors);
        const dividend = divisor * randomInt(50, 200);
        return {
            problem: `${dividend} ÷ ${divisor} =`,
            answer: dividend / divisor,
            type: "Division",
            hint: `Since ${dividend} is ${divisor} × ${dividend/divisor}`
        };
    }
    
    // 2. Fractions, Decimals, Percents
    function generateFractionToDecimal() {
        const fractions = [
            ["1/8", 0.125, "Divide 1 by 8 = 0.125"],
            ["1/4", 0.25, "Divide 1 by 4 = 0.25"],
            ["3/8", 0.375, "3/8 = 0.375 (half of 0.75)"],
            ["1/2", 0.5, "1/2 = 0.5"],
            ["5/8", 0.625, "5/8 = 0.625"],
            ["3/4", 0.75, "3/4 = 0.75"],
            ["7/8", 0.875, "7/8 = 0.875"],
            ["1/3", 0.333, "1/3 ≈ 0.333..."],
            ["2/3", 0.667, "2/3 ≈ 0.667"]
        ];
        const choice = randomChoice(fractions);
        return {
            problem: `${choice[0]} = (decimal)`,
            answer: choice[1],
            type: "Fraction Conversion",
            hint: choice[2]
        };
    }
    
    function generatePercentToFraction() {
        const percents = [
            [25, "1/4", "25% = 25/100 = 1/4"],
            [33, "1/3", "33% ≈ 1/3"],
            [50, "1/2", "50% = 1/2"],
            [66, "2/3", "66% ≈ 2/3"],
            [75, "3/4", "75% = 3/4"],
            [20, "1/5", "20% = 1/5"],
            [40, "2/5", "40% = 2/5"],
            [60, "3/5", "60% = 3/5"],
            [80, "4/5", "80% = 4/5"]
        ];
        const choice = randomChoice(percents);
        return {
            problem: `${choice[0]}% = (fraction)`,
            answer: choice[1],
            type: "Percent Conversion",
            hint: choice[2]
        };
    }
    
    // 3. Squares and Cubes
    function generateSquares() {
        const num = randomInt(11, 25);
        return {
            problem: `${num}² =`,
            answer: num * num,
            type: "Squares",
            hint: `${num} × ${num} = ${num * num}`
        };
    }
    
    // 4. Order of Operations
    function generateOrderOfOperations() {
        const a = randomInt(1, 10);
        const b = randomInt(1, 10);
        const c = randomInt(1, 10);
        const d = randomInt(1, 10);
        const problem = `${a} + ${b} × ${c} - ${d} ÷ 2 =`;
        const answer = a + (b * c) - (d / 2);
        return {
            problem: problem,
            answer: answer,
            type: "Order of Operations",
            hint: `Multiply and divide first: ${b*c} and ${d/2}, then add/subtract`
        };
    }
    
    // 5. Remainders and Divisibility
    function generateRemainder() {
        const divisors = [3, 4, 5, 6, 7, 8, 9, 11];
        const divisor = randomChoice(divisors);
        let number = randomInt(1000, 9999);
        number = Math.floor(number / divisor) * divisor + randomInt(1, divisor - 1);
        return {
            problem: `${number} ÷ ${divisor} has remainder ______`,
            answer: number % divisor,
            type: "Remainders",
            hint: `${number} mod ${divisor} = ${number % divisor}`
        };
    }
    
    // 6. Multiplication Tricks
    function generateMultiplicationBy11() {
        const num = randomInt(12, 89);
        const tens = Math.floor(num / 10);
        const ones = num % 10;
        const sum = tens + ones;
        let hint;
        if (sum < 10) {
            hint = `11 × ${num} = ${tens}${sum}${ones}`;
        } else {
            hint = `11 × ${num} = ${tens+1}${sum-10}${ones}`;
        }
        return {
            problem: `${num} × 11 =`,
            answer: num * 11,
            type: "Multiplication Trick (×11)",
            hint: hint
        };
    }
    
    // 7. Averages
    function generateAverage() {
        const count = randomInt(3, 5);
        const numbers = [];
        let sum = 0;
        for (let i = 0; i < count; i++) {
            const num = randomInt(10, 100);
            numbers.push(num);
            sum += num;
        }
        const avg = Math.round(sum / count * 10) / 10;
        return {
            problem: `Average of ${numbers.join(", ")} =`,
            answer: avg,
            type: "Averages",
            hint: `Sum: ${sum}, Count: ${count}, Average = ${sum} ÷ ${count} = ${avg}`
        };
    }
    
    // 8. Percent of Number
    function generatePercentOfNumber() {
        const percent = randomChoice([25, 33, 50, 66, 75, 20, 40, 60, 80]);
        const number = randomInt(50, 200);
        const answer = Math.round(number * percent / 100);
        return {
            problem: `${percent}% of ${number} =`,
            answer: answer,
            type: "Percentages",
            hint: `${percent}% = ${percent/100}, so ${number} × ${percent/100} = ${answer}`
        };
    }
    
    // 9. Unit Conversion
    function generateUnitConversion() {
        const type = randomChoice(["inches-feet", "feet-yards", "quarts-cups"]);
        
        if (type === "inches-feet") {
            const feet = randomInt(1, 5);
            const inches = randomInt(0, 11);
            const answer = (feet * 12) + inches;
            return {
                problem: `${feet} ft ${inches} in = ______ in`,
                answer: answer,
                type: "Unit Conversion",
                hint: `${feet} ft × 12 = ${feet*12} in, + ${inches} in = ${answer} in`
            };
        } else if (type === "feet-yards") {
            const yards = randomInt(1, 4);
            const feet = randomInt(0, 2);
            const answer = (yards * 3) + feet;
            return {
                problem: `${yards} yd ${feet} ft = ______ ft`,
                answer: answer,
                type: "Unit Conversion",
                hint: `${yards} yd × 3 = ${yards*3} ft, + ${feet} ft = ${answer} ft`
            };
        } else {
            const quarts = randomInt(1, 3);
            const cups = randomInt(0, 3);
            const answer = (quarts * 4) + cups;
            return {
                problem: `${quarts} qt ${cups} cups = ______ cups`,
                answer: answer,
                type: "Unit Conversion",
                hint: `${quarts} qt × 4 = ${quarts*4} cups, + ${cups} cups = ${answer} cups`
            };
        }
    }
    
    // 10. Roman Numerals
    function generateRomanNumerals() {
        const romanMap = [
            [27, "XXVII", "10+10+5+1+1 = XXVII"],
            [34, "XXXIV", "10+10+10+4 = XXXIV"],
            [42, "XLII", "40+2 = XLII"],
            [49, "XLIX", "40+9 = XLIX"],
            [58, "LVIII", "50+5+1+1+1 = LVIII"],
            [66, "LXVI", "50+10+5+1 = LXVI"],
            [73, "LXXIII", "50+10+10+1+1+1 = LXXIII"],
            [89, "LXXXIX", "50+10+10+10+9 = LXXXIX"]
        ];
        const choice = randomChoice(romanMap);
        
        if (Math.random() > 0.5) {
            return {
                problem: `${choice[1]} = (Arabic)`,
                answer: choice[0].toString(),
                type: "Roman Numerals",
                hint: choice[2]
            };
        } else {
            return {
                problem: `${choice[0]} = (Roman)`,
                answer: choice[1],
                type: "Roman Numerals",
                hint: choice[2]
            };
        }
    }
    
    // 11. Estimation Problems
    function generateSquareRootEstimation() {
        const base = randomInt(30, 100);
        const square = base * base;
        const offset = randomInt(-50, 50);
        let number = square + offset;
        if (number < 100) number += 100;
        const estimate = Math.round(Math.sqrt(number));
        return {
            problem: `√${number} ≈ (nearest integer)`,
            answer: estimate,
            type: "Estimation (*)",
            hint: `Find perfect squares near ${number}: ${base-1}²=${(base-1)*(base-1)}, ${base}²=${square}`
        };
    }
    
    function generateLargeAddition() {
        const count = randomInt(3, 5);
        const numbers = [];
        let sum = 0;
        for (let i = 0; i < count; i++) {
            const num = randomInt(1000, 2000);
            numbers.push(num);
            sum += num;
        }
        const estimate = Math.round(sum / 100) * 100;
        return {
            problem: `${numbers.join(" + ")} ≈ (nearest hundred)`,
            answer: estimate,
            type: "Estimation (*)",
            hint: `Round to nearest 100: ${numbers.map(n => Math.round(n/100)*100).join(" + ")} ≈ ${estimate}`
        };
    }
    
    // 12. Geometry
    function generatePythagoreanTriple() {
        const triples = [
            [3, 4, 5, "3² + 4² = 9 + 16 = 25 = 5²"],
            [5, 12, 13, "5² + 12² = 25 + 144 = 169 = 13²"],
            [6, 8, 10, "6² + 8² = 36 + 64 = 100 = 10²"],
            [7, 24, 25, "7² + 24² = 49 + 576 = 625 = 25²"],
            [8, 15, 17, "8² + 15² = 64 + 225 = 289 = 17²"]
        ];
        const triple = randomChoice(triples);
        const missingIndex = randomInt(0, 2);
        const given = [];
        for (let i = 0; i < 3; i++) {
            if (i !== missingIndex) {
                given.push(triple[i]);
            }
        }
        return {
            problem: `Right triangle: legs ${given[0]} and ${given[1]}, hypotenuse = ______`,
            answer: triple[missingIndex],
            type: "Geometry",
            hint: triple[3]
        };
    }
    
    // 13. Algebra
    function generateSolveForX() {
        const a = randomInt(2, 9);
        const b = a * 2;
        const c = a * 5;
        const x = (c - b) / a;
        return {
            problem: `${a}x + ${b} = ${c}, then x = ______`,
            answer: x,
            type: "Algebra",
            hint: `${a}x = ${c} - ${b} = ${c-b}, so x = ${c-b} ÷ ${a} = ${x}`
        };
    }
    
    function generateBinomialSquare() {
        const a = randomInt(2, 5);
        const b = randomInt(1, 4);
        const sign = randomChoice(["+", "-"]);
        let sum;
        if (sign === "+") {
            sum = a*a + 2*a*b + b*b;
        } else {
            sum = a*a - 2*a*b + b*b;
        }
        return {
            problem: `If (${a}x ${sign} ${b})² = kx² + mx + n, then k + m + n = ______`,
            answer: sum,
            type: "Algebra",
            hint: `(${a}x ${sign} ${b})² = ${a*a}x² ${sign === "+" ? "+ " : "- "}${2*a*b}x + ${b*b}, sum = ${sum}`
        };
    }
    
    // 14. 2021 Pattern Generators
    function generateModeProblem() {
        const sets = [
            [1, 1, 2, 3, 5, 2, 1, 3, 4, 7],
            [2, 3, 5, 2, 7, 2, 4, 6, 2],
            [3, 3, 3, 4, 5, 6, 4, 4, 3]
        ];
        const set = randomChoice(sets);
        const counts = {};
        set.forEach(num => counts[num] = (counts[num] || 0) + 1);
        const mode = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        return {
            problem: `Mode of {${set.join(", ")}} =`,
            answer: parseInt(mode),
            type: "Mode/Median",
            hint: `${mode} appears most frequently (${counts[mode]} times)`
        };
    }
    
    function generateSystemEquation() {
        const n = randomInt(80, 120);
        const d = randomInt(10, 25);
        const q = (n - d) / 2;
        const p = q + d;
        return {
            problem: `Let ${n} = p + q, where p = q + ${d}. Find q.`,
            answer: q,
            type: "System Equations",
            hint: `Substitute: (q + ${d}) + q = ${n} → 2q + ${d} = ${n} → 2q = ${n-d} → q = ${q}`
        };
    }
    
    function generatePerfectSquareCondition() {
        const patterns = [
            {coeff: 7, constant: 4, answer: 3, hint: "7×3 + 4 = 25 = 5² (smallest k > 3)"},
            {coeff: 7, constant: 2, answer: 2, hint: "7×2 + 2 = 16 = 4²"},
            {coeff: 11, constant: 5, answer: 4, hint: "11×4 + 5 = 49 = 7²"}
        ];
        const pattern = randomChoice(patterns);
        return {
            problem: `Find smallest integer k > 1 such that ${pattern.coeff}k + ${pattern.constant} is a perfect square.`,
            answer: pattern.answer,
            type: "Perfect Square Conditions",
            hint: pattern.hint
        };
    }
    
    function generateRadicalSimplification() {
        const problems = [
            {a: 4, b: 75, answer: 147, hint: "√75 = √(25×3) = 5√3, so 4√3 + 5√3 = 9√3 = √81×3 = √243"},
            {a: 3, b: 27, answer: 108, hint: "√27 = 3√3, sum = 6√3 = √36×3 = √108"},
            {a: 2, b: 48, answer: 108, hint: "√48 = 4√3, sum = 6√3 = √108"}
        ];
        const prob = randomChoice(problems);
        return {
            problem: `If ${prob.a}√3 + √${prob.b} = √k, then k = ______`,
            answer: prob.answer,
            type: "Radical Simplification",
            hint: prob.hint
        };
    }
    
    function generateLogFunction() {
        const x = randomChoice([9, 27, 81]);
        const base = 3;
        const logVal = Math.log(x) / Math.log(base);
        return {
            problem: `Let f(x) = 2x + log₃(x). Find f(${x}).`,
            answer: 2*x + logVal,
            type: "Log Functions",
            hint: `log₃(${x}) = ${logVal} because 3^${logVal} = ${x}`
        };
    }
    
    function generateDeterminantEquation() {
        const a = 2;
        const b = 3;
        const determinant = 4;
        let c = (a*1.5 - determinant) / (-b);
        c = Math.round(c * 10) / 10;
        
        return {
            problem: `Determinant of |${a}  ${b}| = ${determinant}\n|${c}  1.5|\nFind k if ${c} = -k.`,
            answer: -c,
            type: "Determinant Equations",
            hint: `det = (${a}×1.5) - (${b}×${c}) = ${a*1.5} - ${b*c} = ${determinant}`
        };
    }
    
    function generateSeriesRatio() {
        const n = randomInt(4, 8);
        const sumSquares = (n * (n + 1) * (2*n + 1)) / 6;
        const triangular = (n * (n + 1)) / 2;
        const ratio = sumSquares / triangular;
        
        return {
            problem: `(1²+2²+...+n²) / (1+2+...+n) for n=${n} = ______`,
            answer: ratio.toFixed(2),
            type: "Series Ratios",
            hint: `Sum of squares = ${n}(${n}+1)(2×${n}+1)/6 = ${sumSquares}\nTriangular sum = ${n}(${n}+1)/2 = ${triangular}`
        };
    }
    
    function generateReciprocalSum() {
        const numbers = [12, 18, 20, 24, 30, 36];
        const num = randomChoice(numbers);
        const divisors = [];
        let sum = 0;
        
        for (let i = 1; i <= num; i++) {
            if (num % i === 0) {
                divisors.push(i);
                sum += 1/i;
            }
        }
        
        return {
            problem: `Sum of reciprocals of all positive divisors of ${num} = ______`,
            answer: sum.toFixed(2),
            type: "Reciprocal Sums",
            hint: `Divisors: ${divisors.join(", ")}\nSum = 1/${divisors.join(" + 1/")}`
        };
    }
    
    function generatePolygonalNumbers() {
        const types = ["triangular", "pentagonal", "hexagonal"];
        const type = randomChoice(types);
        const n = randomInt(4, 10);
        let answer, hint;
        
        if (type === "triangular") {
            answer = n * (n + 1) / 2;
            hint = `T_${n} = ${n}(${n}+1)/2 = ${answer}`;
        } else if (type === "pentagonal") {
            answer = n * (3*n - 1) / 2;
            hint = `P_${n} = ${n}(3×${n}-1)/2 = ${answer}`;
        } else {
            answer = n * (2*n - 1);
            hint = `H_${n} = ${n}(2×${n}-1) = ${answer}`;
        }
        
        return {
            problem: `The ${n}th ${type} number = ______`,
            answer: answer,
            type: "Polygonal Numbers",
            hint: hint
        };
    }
    
    function generateFactorialFraction() {
        const x = randomInt(5, 12);
        return {
            problem: `(${x}-1)! / ${x}! = ______`,
            answer: `1/${x}`,
            type: "Factorial Fractions",
            hint: `${x}! = ${x} × (${x}-1)!, so (${x}-1)! / ${x}! = 1/${x}`
        };
    }
    
    // All generators array
    const allGenerators = [
        generateAddition,
        generateSubtraction,
        generateMultiplication,
        generateDivision,
        generateFractionToDecimal,
        generatePercentToFraction,
        generateSquares,
        generateOrderOfOperations,
        generateRemainder,
        generateMultiplicationBy11,
        generateAverage,
        generatePercentOfNumber,
        generateUnitConversion,
        generateRomanNumerals,
        generateSquareRootEstimation,
        generateLargeAddition,
        generatePythagoreanTriple,
        generateSolveForX,
        generateBinomialSquare,
        generateModeProblem,
        generateSystemEquation,
        generatePerfectSquareCondition,
        generateRadicalSimplification,
        generateLogFunction,
        generateDeterminantEquation,
        generateSeriesRatio,
        generateReciprocalSum,
        generatePolygonalNumbers,
        generateFactorialFraction
    ];
    
    // Focus generators for specific practice
    const focusGenerators = [
        generateModeProblem,
        generateSystemEquation,
        generatePerfectSquareCondition,
        generateRadicalSimplification,
        generateLogFunction,
        generateDeterminantEquation,
        generateSeriesRatio,
        generateReciprocalSum,
        generatePolygonalNumbers,
        generateFactorialFraction
    ];
    
    const estimationGenerators = [
        generateSquareRootEstimation,
        generateLargeAddition
    ];
    
    // Public API
    return {
        getRandomProblem: function() {
            return randomChoice(allGenerators)();
        },
        
        getFocusProblem: function() {
            return randomChoice(focusGenerators)();
        },
        
        getEstimationProblem: function() {
            return randomChoice(estimationGenerators)();
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
                    const decimal = parseFloat(parts[0]) / parseFloat(parts[1]);
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
})();