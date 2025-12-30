// Number Sense Problem Generators - Full 35+ Types
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
    
    // 1. Basic Arithmetic (4 types)
    function generateAddition() {
        const a = randomInt(1000, 9999);
        const b = randomInt(100, 999);
        return {
            problem: `${a} + ${b} =`,
            answer: a + b,
            type: "Addition",
            hint: "Add thousands, hundreds, tens, and ones separately"
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
            hint: `Use area method: ${a} × ${b} = ${Math.floor(a/10)*10}×${b} + ${a%10}×${b}`
        };
    }
    
    function generateDivision() {
        const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const divisor = randomChoice(divisors);
        const quotient = randomInt(50, 200);
        const dividend = divisor * quotient;
        return {
            problem: `${dividend} ÷ ${divisor} =`,
            answer: quotient,
            type: "Division",
            hint: `Since ${dividend} = ${divisor} × ${quotient}`
        };
    }
    
    // 2. Fractions, Decimals, Percents (3 types)
    function generateFractionToDecimal() {
        const fractions = [
            ["1/8", 0.125, "1 ÷ 8 = 0.125"],
            ["1/4", 0.25, "1 ÷ 4 = 0.25"],
            ["3/8", 0.375, "3 ÷ 8 = 0.375"],
            ["1/2", 0.5, "1 ÷ 2 = 0.5"],
            ["5/8", 0.625, "5 ÷ 8 = 0.625"],
            ["3/4", 0.75, "3 ÷ 4 = 0.75"],
            ["7/8", 0.875, "7 ÷ 8 = 0.875"],
            ["1/3", 0.333, "1 ÷ 3 ≈ 0.333"],
            ["2/3", 0.667, "2 ÷ 3 ≈ 0.667"]
        ];
        const [frac, dec, hint] = randomChoice(fractions);
        return {
            problem: `${frac} = (decimal)`,
            answer: dec,
            type: "Fraction Conversion",
            hint: hint
        };
    }
    
    function generateDecimalToFraction() {
        const decimals = [
            [0.125, "1/8", "0.125 = 125/1000 = 1/8"],
            [0.25, "1/4", "0.25 = 25/100 = 1/4"],
            [0.375, "3/8", "0.375 = 375/1000 = 3/8"],
            [0.5, "1/2", "0.5 = 5/10 = 1/2"],
            [0.625, "5/8", "0.625 = 625/1000 = 5/8"],
            [0.75, "3/4", "0.75 = 75/100 = 3/4"],
            [0.875, "7/8", "0.875 = 875/1000 = 7/8"]
        ];
        const [dec, frac, hint] = randomChoice(decimals);
        return {
            problem: `${dec} = (fraction)`,
            answer: frac,
            type: "Decimal Conversion",
            hint: hint
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
        const [pct, frac, hint] = randomChoice(percents);
        return {
            problem: `${pct}% = (fraction)`,
            answer: frac,
            type: "Percent Conversion",
            hint: hint
        };
    }
    
    // 3. Squares and Cubes (2 types)
    function generateSquares() {
        const num = randomInt(11, 25);
        return {
            problem: `${num}² =`,
            answer: num * num,
            type: "Squares",
            hint: `${num} × ${num} = ${num * num}`
        };
    }
    
    function generateCubes() {
        const num = randomInt(3, 10);
        return {
            problem: `${num}³ =`,
            answer: num * num * num,
            type: "Cubes",
            hint: `${num} × ${num} × ${num} = ${num * num * num}`
        };
    }
    
    // 4. Order of Operations (1 type)
    function generateOrderOfOperations() {
        const a = randomInt(2, 9);
        const b = randomInt(2, 9);
        const c = randomInt(2, 9);
        const d = randomInt(2, 9);
        const problem = `${a} + ${b} × ${c} - ${d} ÷ 2 =`;
        const answer = a + (b * c) - (d / 2);
        return {
            problem: problem,
            answer: answer,
            type: "Order of Operations",
            hint: `Multiply and divide first: ${b}×${c}=${b*c}, ${d}÷2=${d/2}, then add/subtract`
        };
    }
    
    // 5. Remainders and Divisibility (2 types)
    function generateRemainder() {
        const divisors = [3, 4, 5, 6, 7, 8, 9, 11];
        const divisor = randomChoice(divisors);
        let number = randomInt(1000, 9999);
        // Make sure it's not divisible
        number = Math.floor(number / divisor) * divisor + randomInt(1, divisor - 1);
        return {
            problem: `${number} ÷ ${divisor} has remainder ______`,
            answer: number % divisor,
            type: "Remainders",
            hint: `${number} mod ${divisor} = ${number % divisor}`
        };
    }
    
    function generateDivisibility() {
        const rules = [
            [2, "last digit even", "Check if last digit is 0, 2, 4, 6, or 8"],
            [3, "sum of digits divisible by 3", "Add all digits, check if sum ÷ 3"],
            [4, "last two digits divisible by 4", "Check last two digits as a number"],
            [5, "last digit 0 or 5", "Check if last digit is 0 or 5"],
            [6, "divisible by 2 and 3", "Check both 2 and 3 rules"],
            [9, "sum of digits divisible by 9", "Add all digits, check if sum ÷ 9"]
        ];
        const [divisor, rule, hint] = randomChoice(rules);
        const number = randomInt(1000, 9999);
        const isDivisible = number % divisor === 0;
        return {
            problem: `Is ${number} divisible by ${divisor}? (yes/no)`,
            answer: isDivisible ? "yes" : "no",
            type: "Divisibility",
            hint: `${hint}. ${number} ${isDivisible ? "is" : "is not"} divisible by ${divisor}`
        };
    }
    
    // 6. Multiplication Tricks (3 types)
    function generateMultiplyBy11() {
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
    
    function generateMultiplyBy25() {
        const num = randomInt(10, 99);
        return {
            problem: `${num} × 25 =`,
            answer: num * 25,
            type: "Multiplication Trick (×25)",
            hint: `Multiply by 100 (${num}00), then divide by 4: ${num}00 ÷ 4 = ${num * 25}`
        };
    }
    
    function generateMultiplyBy5() {
        const num = randomInt(20, 199);
        return {
            problem: `${num} × 5 =`,
            answer: num * 5,
            type: "Multiplication Trick (×5)",
            hint: `Multiply by 10 (${num}0), then divide by 2: ${num}0 ÷ 2 = ${num * 5}`
        };
    }
    
    // 7. Averages (2 types)
    function generateAverage() {
        const count = randomInt(3, 6);
        const numbers = [];
        let sum = 0;
        for (let i = 0; i < count; i++) {
            const num = randomInt(10, 100);
            numbers.push(num);
            sum += num;
        }
        const avg = Math.round((sum / count) * 10) / 10;
        return {
            problem: `Average of ${numbers.join(", ")} =`,
            answer: avg,
            type: "Averages",
            hint: `Sum: ${sum}, Count: ${count}, Average = ${sum} ÷ ${count} = ${avg}`
        };
    }
    
    function generateMissingAverage() {
        const avg = randomInt(50, 90);
        const count = randomInt(4, 6);
        const sum = avg * count;
        const knownNumbers = [];
        let knownSum = 0;
        for (let i = 0; i < count - 1; i++) {
            const num = randomInt(30, 100);
            knownNumbers.push(num);
            knownSum += num;
        }
        const missing = sum - knownSum;
        return {
            problem: `Average of ${count} numbers is ${avg}. Known: ${knownNumbers.join(", ")}. Find missing number.`,
            answer: missing,
            type: "Missing Average",
            hint: `Total sum = ${avg} × ${count} = ${sum}. Known sum = ${knownSum}. Missing = ${sum} - ${knownSum} = ${missing}`
        };
    }
    
    // 8. Percent of Number (2 types)
    function generatePercentOfNumber() {
        const percent = randomChoice([10, 15, 20, 25, 33, 50, 66, 75, 80]);
        const number = randomInt(50, 200);
        const answer = Math.round(number * percent / 100);
        return {
            problem: `${percent}% of ${number} =`,
            answer: answer,
            type: "Percentages",
            hint: `${percent}% = ${percent/100}, so ${number} × ${percent/100} = ${answer}`
        };
    }
    
    function generatePercentChange() {
        const original = randomInt(100, 200);
        const change = randomInt(10, 50);
        const isIncrease = Math.random() > 0.5;
        const newValue = isIncrease ? original + change : original - change;
        const percent = Math.round((change / original) * 100);
        return {
            problem: `${original} ${isIncrease ? "increased" : "decreased"} by ${change}. What % ${isIncrease ? "increase" : "decrease"}?`,
            answer: percent + "%",
            type: "Percent Change",
            hint: `Change = ${change}, Original = ${original}, % = (${change} ÷ ${original}) × 100 = ${percent}%`
        };
    }
    
    // 9. Unit Conversion (3 types)
    function generateInchesToFeet() {
        const feet = randomInt(1, 5);
        const inches = randomInt(0, 11);
        const totalInches = feet * 12 + inches;
        if (Math.random() > 0.5) {
            return {
                problem: `${feet} ft ${inches} in = ______ in`,
                answer: totalInches,
                type: "Unit Conversion",
                hint: `${feet} ft × 12 = ${feet*12} in, + ${inches} in = ${totalInches} in`
            };
        } else {
            return {
                problem: `${totalInches} in = ______ ft ______ in`,
                answer: `${feet} ft ${inches} in`,
                type: "Unit Conversion",
                hint: `${totalInches} ÷ 12 = ${feet} remainder ${inches}`
            };
        }
    }
    
    function generateFeetToYards() {
        const yards = randomInt(1, 4);
        const feet = randomInt(0, 2);
        const totalFeet = yards * 3 + feet;
        if (Math.random() > 0.5) {
            return {
                problem: `${yards} yd ${feet} ft = ______ ft`,
                answer: totalFeet,
                type: "Unit Conversion",
                hint: `${yards} yd × 3 = ${yards*3} ft, + ${feet} ft = ${totalFeet} ft`
            };
        } else {
            return {
                problem: `${totalFeet} ft = ______ yd ______ ft`,
                answer: `${yards} yd ${feet} ft`,
                type: "Unit Conversion",
                hint: `${totalFeet} ÷ 3 = ${yards} remainder ${feet}`
            };
        }
    }
    
    function generateQuartsToCups() {
        const quarts = randomInt(1, 3);
        const cups = randomInt(0, 3);
        const totalCups = quarts * 4 + cups;
        if (Math.random() > 0.5) {
            return {
                problem: `${quarts} qt ${cups} c = ______ cups`,
                answer: totalCups,
                type: "Unit Conversion",
                hint: `${quarts} qt × 4 = ${quarts*4} c, + ${cups} c = ${totalCups} c`
            };
        } else {
            return {
                problem: `${totalCups} c = ______ qt ______ c`,
                answer: `${quarts} qt ${cups} c`,
                type: "Unit Conversion",
                hint: `${totalCups} ÷ 4 = ${quarts} remainder ${cups}`
            };
        }
    }
    
    // 10. Roman Numerals (1 type)
    function generateRomanNumerals() {
        const romanMap = [
            [27, "XXVII", "10+10+5+1+1 = XXVII"],
            [34, "XXXIV", "10+10+10+4 = XXXIV"],
            [42, "XLII", "40+2 = XLII"],
            [49, "XLIX", "40+9 = XLIX"],
            [58, "LVIII", "50+5+1+1+1 = LVIII"],
            [66, "LXVI", "50+10+5+1 = LXVI"],
            [73, "LXXIII", "50+10+10+1+1+1 = LXXIII"],
            [89, "LXXXIX", "50+10+10+10+9 = LXXXIX"],
            [94, "XCIV", "90+4 = XCIV"],
            [99, "XCIX", "90+9 = XCIX"]
        ];
        const [num, roman, hint] = randomChoice(romanMap);
        
        if (Math.random() > 0.5) {
            return {
                problem: `${roman} = (Arabic)`,
                answer: num.toString(),
                type: "Roman Numerals",
                hint: hint
            };
        } else {
            return {
                problem: `${num} = (Roman)`,
                answer: roman,
                type: "Roman Numerals",
                hint: hint
            };
        }
    }
    
    // 11. Estimation Problems (3 types)
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
            hint: `Perfect squares near ${number}: ${base-1}²=${(base-1)*(base-1)}, ${base}²=${square}`
        };
    }
    
    function generateLargeAdditionEstimation() {
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
            hint: `Round each: ${numbers.map(n => Math.round(n/100)*100).join(" + ")} ≈ ${estimate}`
        };
    }
    
    function generateMultiplicationEstimation() {
        const a = randomInt(40, 80);
        const b = randomInt(40, 80);
        const estimate = Math.round((a * b) / 10) * 10;
        return {
            problem: `${a} × ${b} ≈ (nearest ten)`,
            answer: estimate,
            type: "Estimation (*)",
            hint: `${a} ≈ ${Math.round(a/10)*10}, ${b} ≈ ${Math.round(b/10)*10}, product ≈ ${estimate}`
        };
    }
    
    // 12. Geometry (3 types)
    function generatePythagoreanTriple() {
        const triples = [
            [3, 4, 5, "3² + 4² = 9 + 16 = 25 = 5²"],
            [5, 12, 13, "5² + 12² = 25 + 144 = 169 = 13²"],
            [6, 8, 10, "6² + 8² = 36 + 64 = 100 = 10²"],
            [7, 24, 25, "7² + 24² = 49 + 576 = 625 = 25²"],
            [8, 15, 17, "8² + 15² = 64 + 225 = 289 = 17²"],
            [9, 40, 41, "9² + 40² = 81 + 1600 = 1681 = 41²"]
        ];
        const [a, b, c, hint] = randomChoice(triples);
        const missingIndex = randomInt(0, 2);
        const given = [];
        for (let i = 0; i < 3; i++) {
            if (i !== missingIndex) {
                given.push([a, b, c][i]);
            }
        }
        return {
            problem: `Right triangle: ${given[0]} and ${given[1]}, hypotenuse = ______`,
            answer: [a, b, c][missingIndex],
            type: "Geometry",
            hint: hint
        };
    }
    
    function generateAreaSquare() {
        const side = randomInt(5, 20);
        return {
            problem: `Area of square with side ${side} =`,
            answer: side * side,
            type: "Geometry",
            hint: `Area = side × side = ${side} × ${side} = ${side * side}`
        };
    }
    
    function generatePerimeterRectangle() {
        const length = randomInt(10, 30);
        const width = randomInt(5, 15);
        return {
            problem: `Perimeter of ${length}×${width} rectangle =`,
            answer: 2 * (length + width),
            type: "Geometry",
            hint: `Perimeter = 2 × (length + width) = 2 × (${length} + ${width}) = ${2 * (length + width)}`
        };
    }
    
    // 13. Algebra (4 types)
    function generateSolveForX() {
        const a = randomInt(2, 9);
        const b = a * randomInt(1, 4);
        const c = a * randomInt(5, 9);
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
    
    function generateExponentRules() {
        const base = randomInt(2, 5);
        const exp1 = randomInt(2, 4);
        const exp2 = randomInt(2, 4);
        const operation = randomChoice(["multiply", "divide"]);
        
        if (operation === "multiply") {
            return {
                problem: `${base}^${exp1} × ${base}^${exp2} = ${base}^?`,
                answer: exp1 + exp2,
                type: "Algebra",
                hint: `When multiplying with same base, add exponents: ${exp1} + ${exp2} = ${exp1 + exp2}`
            };
        } else {
            return {
                problem: `${base}^${exp1} ÷ ${base}^${exp2} = ${base}^?`,
                answer: exp1 - exp2,
                type: "Algebra",
                hint: `When dividing with same base, subtract exponents: ${exp1} - ${exp2} = ${exp1 - exp2}`
            };
        }
    }
    
    // 14. 2021 Test Patterns (10 types)
    function generateModeProblem() {
        const sets = [
            [1, 1, 2, 3, 5, 2, 1, 3, 4, 7],
            [2, 3, 5, 2, 7, 2, 4, 6, 2],
            [3, 3, 3, 4, 5, 6, 4, 4, 3],
            [5, 6, 5, 7, 5, 8, 6, 5],
            [1, 2, 3, 4, 1, 2, 1, 5, 1]
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
    
    function generateMedianProblem() {
        const setSize = randomInt(5, 9);
        const set = [];
        for (let i = 0; i < setSize; i++) {
            set.push(randomInt(1, 20));
        }
        set.sort((a, b) => a - b);
        let median;
        if (setSize % 2 === 0) {
            const mid = setSize / 2;
            median = (set[mid - 1] + set[mid]) / 2;
        } else {
            median = set[Math.floor(setSize / 2)];
        }
        return {
            problem: `Median of {${set.join(", ")}} =`,
            answer: median,
            type: "Mode/Median",
            hint: `Sorted: ${set.join(", ")}. Median = ${median}`
        };
    }
    
    function generatePerfectSquareCondition() {
        const patterns = [
            {coeff: 7, constant: 4, answer: 3, hint: "7×3 + 4 = 25 = 5²"},
            {coeff: 7, constant: 2, answer: 2, hint: "7×2 + 2 = 16 = 4²"},
            {coeff: 11, constant: 5, answer: 4, hint: "11×4 + 5 = 49 = 7²"},
            {coeff: 5, constant: 4, answer: 1, hint: "5×1 + 4 = 9 = 3²"},
            {coeff: 9, constant: 7, answer: 2, hint: "9×2 + 7 = 25 = 5²"}
        ];
        const pattern = randomChoice(patterns);
        return {
            problem: `Find smallest integer k > 0 such that ${pattern.coeff}k + ${pattern.constant} is a perfect square.`,
            answer: pattern.answer,
            type: "Perfect Square Conditions",
            hint: pattern.hint
        };
    }
    
    function generateRadicalSimplification() {
        const problems = [
            {a: 4, b: 75, answer: 147, hint: "√75 = √(25×3) = 5√3, sum = 9√3 = √81×3 = √243"},
            {a: 3, b: 27, answer: 108, hint: "√27 = 3√3, sum = 6√3 = √36×3 = √108"},
            {a: 2, b: 48, answer: 108, hint: "√48 = 4√3, sum = 6√3 = √108"},
            {a: 5, b: 20, answer: 45, hint: "√20 = 2√5, sum = 7√5 = √49×5 = √245"}
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
        const values = [
            {x: 9, base: 3, log: 2},
            {x: 27, base: 3, log: 3},
            {x: 81, base: 3, log: 4},
            {x: 16, base: 2, log: 4},
            {x: 32, base: 2, log: 5}
        ];
        const {x, base, log} = randomChoice(values);
        return {
            problem: `Let f(x) = 2x + log_${base}(x). Find f(${x}).`,
            answer: 2*x + log,
            type: "Log Functions",
            hint: `log_${base}(${x}) = ${log} because ${base}^${log} = ${x}`
        };
    }
    
    function generateDeterminantEquation() {
        const a = 2;
        const b = 3;
        const determinant = randomChoice([4, 6, 8]);
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
    
    // 15. Probability (1 type)
    function generateProbability() {
        const total = randomInt(10, 20);
        const favorable = randomInt(1, total - 1);
        return {
            problem: `Probability of picking red from ${favorable} red and ${total - favorable} blue =`,
            answer: `${favorable}/${total}`,
            type: "Probability",
            hint: `Probability = favorable/total = ${favorable}/${total}`
        };
    }
    
    // 16. Ratios (1 type)
    function generateRatio() {
        const a = randomInt(2, 5);
        const b = randomInt(2, 5);
        const total = randomInt(20, 50);
        const partA = Math.round((a / (a + b)) * total);
        const partB = total - partA;
        return {
            problem: `Divide ${total} in ratio ${a}:${b}. Larger part =`,
            answer: Math.max(partA, partB),
            type: "Ratios",
            hint: `Total parts = ${a + b}. Each part = ${total} ÷ ${a + b} = ${total/(a+b)}`
        };
    }
    
    // All generators array - TOTAL: 37 GENERATORS
    const allGenerators = [
        generateAddition,
        generateSubtraction,
        generateMultiplication,
        generateDivision,
        generateFractionToDecimal,
        generateDecimalToFraction,
        generatePercentToFraction,
        generateSquares,
        generateCubes,
        generateOrderOfOperations,
        generateRemainder,
        generateDivisibility,
        generateMultiplyBy11,
        generateMultiplyBy25,
        generateMultiplyBy5,
        generateAverage,
        generateMissingAverage,
        generatePercentOfNumber,
        generatePercentChange,
        generateInchesToFeet,
        generateFeetToYards,
        generateQuartsToCups,
        generateRomanNumerals,
        generateSquareRootEstimation,
        generateLargeAdditionEstimation,
        generateMultiplicationEstimation,
        generatePythagoreanTriple,
        generateAreaSquare,
        generatePerimeterRectangle,
        generateSolveForX,
        generateBinomialSquare,
        generateSystemEquation,
        generateExponentRules,
        generateModeProblem,
        generateMedianProblem,
        generatePerfectSquareCondition,
        generateRadicalSimplification,
        generateLogFunction,
        generateDeterminantEquation,
        generateSeriesRatio,
        generateReciprocalSum,
        generatePolygonalNumbers,
        generateFactorialFraction,
        generateProbability,
        generateRatio
    ];
    
    // Focus generators (2021 patterns)
    const focusGenerators = [
        generateModeProblem,
        generateMedianProblem,
        generatePerfectSquareCondition,
        generateRadicalSimplification,
        generateLogFunction,
        generateDeterminantEquation,
        generateSeriesRatio,
        generateReciprocalSum,
        generatePolygonalNumbers,
        generateFactorialFraction,
        generateSystemEquation,
        generateBinomialSquare
    ];
    
    // Estimation generators
    const estimationGenerators = [
        generateSquareRootEstimation,
        generateLargeAdditionEstimation,
        generateMultiplicationEstimation
    ];
    
    // Public API
    return {
        // Get count of available generators
        getGeneratorCount: function() {
            return {
                total: allGenerators.length,
                focus: focusGenerators.length,
                estimation: estimationGenerators.length
            };
        },
        
        // Get random problem from all generators
        getRandomProblem: function() {
            const generator = randomChoice(allGenerators);
            try {
                const problem = generator();
                console.log('Generated problem:', problem.type);
                return problem;
            } catch (error) {
                console.error('Error in generator:', error);
                // Fallback
                return {
                    problem: "10 + 20 =",
                    answer: "30",
                    type: "Addition",
                    hint: "10 + 20 = 30"
                };
            }
        },
        
        // Get focus problem (2021 patterns)
        getFocusProblem: function() {
            const generator = randomChoice(focusGenerators);
            try {
                const problem = generator();
                console.log('Generated focus problem:', problem.type);
                return problem;
            } catch (error) {
                console.error('Error in focus generator:', error);
                return this.getRandomProblem();
            }
        },
        
        // Get estimation problem
        getEstimationProblem: function() {
            const generator = randomChoice(estimationGenerators);
            try {
                const problem = generator();
                console.log('Generated estimation problem:', problem.type);
                return problem;
            } catch (error) {
                console.error('Error in estimation generator:', error);
                return this.getRandomProblem();
            }
        },
        
        // Check answer with tolerance for estimation
        checkAnswer: function(userAnswer, correctAnswer, problemType) {
            console.log('Checking answer:', { 
                userAnswer, 
                correctAnswer: typeof correctAnswer, 
                problemType 
            });
            
            // Clean inputs
            userAnswer = (userAnswer || '').toString().trim();
            correctAnswer = (correctAnswer || '').toString().trim();
            
            // Handle empty answers
            if (!userAnswer) return false;
            
            // Handle estimation tolerance (5%)
            if (problemType && (problemType.includes("Estimation") || problemType.includes("*"))) {
                const userNum = parseFloat(userAnswer);
                const correctNum = parseFloat(correctAnswer);
                
                if (isNaN(userNum) || isNaN(correctNum)) {
                    return userAnswer === correctAnswer;
                }
                
                const tolerance = Math.abs(correctNum * 0.05);
                const isCorrect = Math.abs(userNum - correctNum) <= tolerance;
                console.log(`Estimation check: ${userNum} vs ${correctNum}, tolerance: ${tolerance}, correct: ${isCorrect}`);
                return isCorrect;
            }
            
            // Handle fractions in answer
            if (userAnswer.includes("/")) {
                const parts = userAnswer.split("/");
                if (parts.length === 2) {
                    const numerator = parseFloat(parts[0]);
                    const denominator = parseFloat(parts[1]);
                    if (denominator === 0) return false;
                    
                    const value = numerator / denominator;
                    const correctNum = parseFloat(correctAnswer);
                    
                    if (!isNaN(value) && !isNaN(correctNum)) {
                        return Math.abs(value - correctNum) <= 0.01;
                    }
                }
            }
            
            // Handle percentage answers
            if (userAnswer.includes("%")) {
                const userNum = parseFloat(userAnswer);
                const correctNum = parseFloat(correctAnswer);
                if (!isNaN(userNum) && !isNaN(correctNum)) {
                    return Math.abs(userNum - correctNum) <= 0.1; // 0.1% tolerance
                }
            }
            
            // Try numeric comparison first
            const userNum = parseFloat(userAnswer);
            const correctNum = parseFloat(correctAnswer);
            
            if (!isNaN(userNum) && !isNaN(correctNum)) {
                return Math.abs(userNum - correctNum) <= 0.01;
            }
            
            // String comparison (for yes/no, roman numerals, etc.)
            return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
        },
        
        // List all available problem types
        getProblemTypes: function() {
            const types = new Set();
            allGenerators.forEach(gen => {
                try {
                    const sample = gen();
                    types.add(sample.type);
                } catch (e) {
                    // Skip errors
                }
            });
            return Array.from(types).sort();
        }
    };
})();

// Make globally available
if (typeof window !== 'undefined') {
    window.ProblemGenerators = ProblemGenerators;
    console.log('ProblemGenerators loaded with', ProblemGenerators.getGeneratorCount().total, 'generators');
}