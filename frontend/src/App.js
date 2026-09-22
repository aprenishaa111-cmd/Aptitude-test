import React, { useState } from 'react';
import './App.css'; // Essential for the Brown & Cream theme!
import Signup from './Signup';
import Dashboard from './Dashboard';
import TeacherMode from './TeacherMode';
import Quiz from './Quiz';

// --- THE COMPLETE MASTER CATALOG (NEW FORMAT) ---
const COURSE_CATALOG = {
  "Quantitative Aptitude": {
    "Percentages": {
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Understanding Percentages</h3><p>A percentage represents a fraction out of 100. It is a way of expressing a number as a fraction of 100.</p><div style='background: #EFEBE9; padding: 15px; border-left: 4px solid #795548; margin: 20px 0;'><strong>Pro Tip:</strong> To convert a percentage to a decimal, divide by 100. (e.g., 20% = 0.20)</div>",
      questions: [
        { q: "What is 20% of 150?", options: ["20", "25", "30", "35"], answer: "30", explanation: "0.20 x 150 = 30." },
        { q: "If a shirt costing $40 is 25% off, what is the discount?", options: ["$5", "$10", "$15", "$20"], answer: "$10", explanation: "25% is 1/4. 1/4 of $40 is $10." },
        { q: "What percentage is 15 out of 60?", options: ["20%", "25%", "30%", "35%"], answer: "25%", explanation: "(15 / 60) x 100 = 0.25 x 100 = 25%." },
        { q: "Increase 50 by 20%. What is the new value?", options: ["55", "60", "65", "70"], answer: "60", explanation: "20% of 50 is 10. 50 + 10 = 60." },
        { q: "What is 5% of 200?", options: ["5", "10", "15", "20"], answer: "10", explanation: "0.05 x 200 = 10." }
      ]
    },
    "Ratio & Proportion": { 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Ratio & Proportion</h3><p>A <strong>Ratio</strong> compares two quantities. A <strong>Proportion</strong> states that two ratios are equal.</p>", 
      questions: [
        { q: "If A:B = 2:3 and B:C = 4:5, find A:B:C.", options: ["8:12:15", "2:3:5", "8:15:12", "6:12:15"], answer: "8:12:15", explanation: "Make B equal in both. Multiply A:B by 4 (8:12) and B:C by 3 (12:15). Result is 8:12:15." },
        { q: "Divide 500 in the ratio 3:2. What is the larger part?", options: ["200", "250", "300", "350"], answer: "300", explanation: "Total parts = 5. One part = 500/5 = 100. Larger part = 3 x 100 = 300." },
        { q: "If 2x = 3y, what is x:y?", options: ["2:3", "3:2", "1:6", "6:1"], answer: "3:2", explanation: "Rearrange to x/y = 3/2, so x:y is 3:2." },
        { q: "Find the fourth proportional to 4, 9, 12.", options: ["18", "24", "27", "36"], answer: "27", explanation: "4/9 = 12/x. 4x = 108. x = 27." },
        { q: "What is the duplicate ratio of 3:4?", options: ["6:8", "9:16", "3:4", "27:64"], answer: "9:16", explanation: "Duplicate ratio means squaring the terms. 3 squared is 9, 4 squared is 16." }
      ] 
    },
    "Profit and Loss": { 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Profit and Loss</h3><ul><li><strong>Profit</strong> = Selling Price (SP) - Cost Price (CP)</li><li><strong>Loss</strong> = CP - SP</li></ul><p>Profit or Loss % is always calculated on the Cost Price (CP).</p>", 
      questions: [
        { q: "Buy an item for $100, sell for $120. What is the profit %?", options: ["10%", "15%", "20%", "25%"], answer: "20%", explanation: "Profit is $20. (20 / 100) x 100 = 20%." },
        { q: "If CP is $80 and Loss is 10%, what is SP?", options: ["$70", "$72", "$75", "$88"], answer: "$72", explanation: "Loss is 10% of 80 = $8. SP = CP - Loss = 80 - 8 = 72." },
        { q: "By selling a watch for $144, a man loses 10%. Find CP.", options: ["$150", "$155", "$160", "$165"], answer: "$160", explanation: "SP is 90% of CP. 0.90 x CP = 144. CP = 144 / 0.90 = 160." },
        { q: "If the CP of 10 items equals the SP of 8 items, find profit %.", options: ["20%", "25%", "30%", "10%"], answer: "25%", explanation: "Let CP of 1 item be $1. CP of 8 = $8. SP of 8 = CP of 10 = $10. Profit = $2. Profit % = (2/8) x 100 = 25%." },
        { q: "A shopkeeper gives a 10% discount on marked price of $200. What is SP?", options: ["$180", "$190", "$210", "$220"], answer: "$180", explanation: "Discount = 10% of 200 = 20. SP = 200 - 20 = $180." }
      ] 
    },
    "Averages and Mixture": { 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Averages and Mixture</h3><p>Average is the sum of all items divided by the total number of items.</p>", 
      questions: [
        { q: "What is the average of first 5 natural numbers?", options: ["2", "3", "4", "5"], answer: "3", explanation: "(1+2+3+4+5)/5 = 15/5 = 3." },
        { q: "Average age of 5 boys is 12. Total age is?", options: ["50", "55", "60", "65"], answer: "60", explanation: "Total = Average x Count = 12 x 5 = 60." },
        { q: "Average of 10, 20, 30, 40 is?", options: ["20", "25", "30", "35"], answer: "25", explanation: "(10+20+30+40)/4 = 100/4 = 25." },
        { q: "If a 20L mixture has milk and water in 3:1, how much is water?", options: ["4L", "5L", "10L", "15L"], answer: "5L", explanation: "Total parts = 4. Water is 1 part. (1/4) of 20L = 5L." },
        { q: "Average of two numbers is 15. If one is 10, the other is?", options: ["15", "20", "25", "30"], answer: "20", explanation: "Total is 30. 30 - 10 = 20." }
      ] 
    },
    "Time and Work": { 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Time and Work</h3><p>If a person does a job in X days, their 1-day work is 1/X.</p>", 
      questions: [
        { q: "A does a work in 10 days, B in 15 days. Together they take?", options: ["5 days", "6 days", "8 days", "25 days"], answer: "6 days", explanation: "(1/10) + (1/15) = 5/30 = 1/6. It takes 6 days together." },
        { q: "A and B do a work in 4 days. A alone takes 12 days. B alone takes?", options: ["6 days", "8 days", "10 days", "16 days"], answer: "6 days", explanation: "(1/4) - (1/12) = 2/12 = 1/6. B takes 6 days." },
        { q: "If 5 men can build a wall in 10 days, how long for 10 men?", options: ["2 days", "5 days", "15 days", "20 days"], answer: "5 days", explanation: "More men = less time. Double the men means half the time (5 days)." },
        { q: "Efficiency of A is twice of B. If B takes 20 days, A takes?", options: ["10 days", "15 days", "30 days", "40 days"], answer: "10 days", explanation: "Twice as efficient means half the time. 20 / 2 = 10 days." },
        { q: "Pipe A fills a tank in 2 hrs, Pipe B in 3 hrs. Together they take?", options: ["1.2 hrs", "1.5 hrs", "2.5 hrs", "5 hrs"], answer: "1.2 hrs", explanation: "(1/2) + (1/3) = 5/6. Time is 6/5 hours = 1.2 hours." }
      ] 
    },
    "Speed, Distance and Time": { 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Speed, Distance and Time</h3><p>The core formula is: <strong>Distance = Speed x Time</strong></p>", 
      questions: [
        { q: "A car travels 120 miles in 2 hours. Speed is?", options: ["50 mph", "60 mph", "70 mph", "80 mph"], answer: "60 mph", explanation: "Speed = Distance / Time = 120 / 2 = 60 mph." },
        { q: "Convert 72 km/hr to m/s.", options: ["15 m/s", "20 m/s", "25 m/s", "30 m/s"], answer: "20 m/s", explanation: "Multiply by 5/18. 72 x (5/18) = 20 m/s." },
        { q: "A 100m long train crosses a pole at 36 km/hr. Time taken?", options: ["5 sec", "10 sec", "15 sec", "20 sec"], answer: "10 sec", explanation: "Speed in m/s = 36 x 5/18 = 10 m/s. Time = D/S = 100 / 10 = 10s." },
        { q: "Walking at 3/4 of normal speed, a man is 20 mins late. Normal time?", options: ["40 mins", "50 mins", "60 mins", "80 mins"], answer: "60 mins", explanation: "Speed ratio is 3:4, so time ratio is 4:3. Difference is 1 unit = 20 mins. Normal time (3 units) = 60 mins." },
        { q: "Sound travels at 330 m/s. How far is thunder heard in 3 sec?", options: ["330m", "660m", "990m", "1100m"], answer: "990m", explanation: "Distance = 330 x 3 = 990m." }
      ] 
    },
    "Compound Interest": { 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Interest</h3><p>Simple Interest remains constant. Compound interest grows because you earn interest on your interest.</p>", 
      questions: [
        { q: "Simple interest on $1000 at 5% for 2 years?", options: ["$50", "$100", "$150", "$200"], answer: "$100", explanation: "SI = (P x R x T) / 100 = (1000 x 5 x 2) / 100 = $100." },
        { q: "Compound interest on $1000 at 10% for 2 years?", options: ["$200", "$210", "$220", "$250"], answer: "$210", explanation: "Year 1 = $100. Year 2 = $100 + 10% of 100 = $110. Total = $210." },
        { q: "If money doubles in 5 years at SI, what is the rate?", options: ["10%", "15%", "20%", "25%"], answer: "20%", explanation: "Interest = Principal. So, 100 = (100 x R x 5) / 100. R = 20%." },
        { q: "Difference between CI and SI for 2 years on $1000 at 10%?", options: ["$10", "$20", "$50", "$100"], answer: "$10", explanation: "CI is $210. SI is $200. Difference is $10." },
        { q: "What principal yields $50 SI at 5% in 2 years?", options: ["$400", "$500", "$600", "$1000"], answer: "$500", explanation: "50 = (P x 5 x 2) / 100. P = 500." }
      ] 
    },
    "Numbers": { 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Numbers & Divisibility</h3><p>Understand prime numbers, Least Common Multiple (LCM), Highest Common Factor (HCF), and basic divisibility rules.</p>", 
      questions: [
        { q: "What is the HCF of 12 and 16?", options: ["2", "4", "6", "8"], answer: "4", explanation: "The highest number that divides both 12 and 16 without a remainder is 4." },
        { q: "What is the LCM of 4 and 5?", options: ["9", "15", "20", "40"], answer: "20", explanation: "The lowest number that is a multiple of both 4 and 5 is 20." },
        { q: "Which of the following is a prime number?", options: ["9", "15", "21", "23"], answer: "23", explanation: "23 is only divisible by 1 and itself." },
        { q: "Sum of first 10 natural numbers?", options: ["45", "50", "55", "60"], answer: "55", explanation: "Formula: n(n+1)/2. So 10(11)/2 = 55." },
        { q: "Is 144 divisible by 9?", options: ["Yes", "No", "Only on Tuesdays", "Cannot determine"], answer: "Yes", explanation: "The sum of the digits (1+4+4=9) is divisible by 9." }
      ] 
    },
    "Algebra": { 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Algebra</h3><p>Solve for variables using linear and quadratic equations.</p>", 
      questions: [
        { q: "If x + 5 = 12, what is x?", options: ["5", "6", "7", "8"], answer: "7", explanation: "Subtract 5 from both sides: x = 12 - 5 = 7." },
        { q: "Solve: 2x - 4 = 10", options: ["5", "6", "7", "8"], answer: "7", explanation: "2x = 14. Divide by 2: x = 7." },
        { q: "If a = 2, b = 3, what is a^2 + b^2?", options: ["10", "12", "13", "25"], answer: "13", explanation: "2 squared is 4. 3 squared is 9. 4 + 9 = 13." },
        { q: "Expand (x+2)^2", options: ["x^2+4", "x^2+4x+4", "x^2+2x+4", "x^2+4x"], answer: "x^2+4x+4", explanation: "Use (a+b)^2 = a^2 + 2ab + b^2." },
        { q: "If x/3 = 9, what is x?", options: ["3", "12", "18", "27"], answer: "27", explanation: "Multiply both sides by 3: x = 27." }
      ] 
    },
    "PnC and Probability": { 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Permutations, Combinations & Probability</h3><p>Probability = Favorable Outcomes / Total Possible Outcomes.</p>", 
      questions: [
        { q: "Probability of getting Heads on a coin flip?", options: ["1/4", "1/3", "1/2", "1"], answer: "1/2", explanation: "1 favorable outcome (Heads) out of 2 possible outcomes (Heads, Tails)." },
        { q: "Probability of rolling a 6 on a standard die?", options: ["1/2", "1/3", "1/6", "1/12"], answer: "1/6", explanation: "1 favorable outcome (the number 6) out of 6 sides." },
        { q: "How many ways to arrange letters in 'CAT'?", options: ["3", "6", "9", "12"], answer: "6", explanation: "3 letters means 3! (3 factorial) arrangements. 3 x 2 x 1 = 6." },
        { q: "Value of 5! (5 factorial)", options: ["20", "60", "120", "240"], answer: "120", explanation: "5 x 4 x 3 x 2 x 1 = 120." },
        { q: "Probability of drawing an Ace from a deck of 52 cards?", options: ["1/52", "1/13", "1/4", "4/13"], answer: "1/13", explanation: "4 Aces in a deck of 52. 4/52 simplifies to 1/13." }
      ] 
    }
  },

  "Logical Reasoning": {
    "AlphaNumeric Series": {
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>AlphaNumeric Series</h3><p>Alphanumeric series involve sequences combining letters and numbers. Look for patterns in addition or subtraction.</p>",
      questions: [
        { q: "What comes next: A1, B2, C3, __?", options: ["D4", "E5", "D3", "C4"], answer: "D4", explanation: "Letters and numbers are increasing by 1." },
        { q: "Complete the series: 2, 4, 8, 16, __?", options: ["24", "30", "32", "64"], answer: "32", explanation: "Each number is multiplied by 2." },
        { q: "Next term: 5A, 10B, 15C, __?", options: ["20C", "20D", "25D", "20E"], answer: "20D", explanation: "Numbers increase by 5, letters progress by 1." },
        { q: "Complete: Z, W, T, Q, __?", options: ["N", "O", "P", "M"], answer: "N", explanation: "The letters are moving backward by 3 steps." },
        { q: "Find the odd one out: A3, B5, C7, D10", options: ["A3", "B5", "C7", "D10"], answer: "D10", explanation: "The sequence should add 2 to the number. D should be D9." }
      ]
    },
    "Blood Relation": { 
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Blood Relation</h3><p>Map out family trees to track lineage. Using squares for males and circles for females can help visualize the connections.</p>", 
      questions: [
        { q: "A's father is B's brother. How is A related to B?", options: ["Niece/Nephew", "Uncle", "Cousin", "Brother"], answer: "Niece/Nephew", explanation: "Since A is the child of B's brother, A is B's niece or nephew." },
        { q: "My mother's only son is my?", options: ["Brother", "Self (if male)", "Uncle", "Father"], answer: "Self (if male)", explanation: "If you are male, your mother's only son is you." },
        { q: "Pointing to a man, a woman said 'His mother is the only daughter of my mother.' How is the woman related to the man?", options: ["Aunt", "Mother", "Sister", "Grandmother"], answer: "Mother", explanation: "The 'only daughter of my mother' is the woman herself. So, she is his mother." },
        { q: "X is the brother of Y. Y is the wife of Z. Z is the father of W. How is X related to W?", options: ["Uncle", "Father", "Brother", "Grandfather"], answer: "Uncle", explanation: "Y is W's mother. X is Y's brother. Therefore, X is W's maternal uncle." },
        { q: "A and B are brothers. C and D are sisters. A's son is D's brother. How is B related to C?", options: ["Father", "Brother", "Uncle", "Grandfather"], answer: "Uncle", explanation: "Since A's son is D's brother, A is the father of D and C. B is A's brother, making him C's uncle." }
      ] 
    },
    "Coding Decoding": { 
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Coding Decoding</h3><p>Look for shifts in the alphabet. Write out A-Z and assign numbers 1-26 to make finding patterns easier.</p>", 
      questions: [
        { q: "If CAT is coded as DBU, how is DOG coded?", options: ["EPH", "FQI", "EPG", "EQH"], answer: "EPH", explanation: "Each letter is shifted forward by 1 (+1)." },
        { q: "If A=1, B=2, what is the value of CAB?", options: ["5", "6", "7", "8"], answer: "6", explanation: "C(3) + A(1) + B(2) = 6." },
        { q: "If RED is coded as 27, what is BLUE?", options: ["35", "40", "45", "50"], answer: "40", explanation: "R(18)+E(5)+D(4) = 27. B(2)+L(12)+U(21)+E(5) = 40." },
        { q: "If WATER is written as YCVGT, how is FIRE written?", options: ["HKTG", "HLUG", "HKUF", "GJQD"], answer: "HKTG", explanation: "Each letter is shifted forward by 2 (+2)." },
        { q: "In a code, '123' means 'hot filtered coffee'. '3' means?", options: ["hot", "filtered", "coffee", "Cannot be determined"], answer: "Cannot be determined", explanation: "Without more coded sentences to cross-reference, we don't know which word corresponds to which number." }
      ] 
    },
    "Data Sufficiency": { 
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Data Sufficiency</h3><p>You don't need to find the final answer. You just need to determine which statements contain enough information to solve the problem.</p>", 
      questions: [
        { q: "What is the value of x? Statement I: x + y = 10. Statement II: x - y = 2.", options: ["I alone is sufficient", "II alone is sufficient", "Both I and II are required", "Neither is sufficient"], answer: "Both I and II are required", explanation: "You need both linear equations to solve for two variables." },
        { q: "Is x an even number? I: x is divisible by 4. II: x is a multiple of 3.", options: ["I alone is sufficient", "II alone is sufficient", "Both required", "Neither sufficient"], answer: "I alone is sufficient", explanation: "If it's divisible by 4, it MUST be even. Multiplying by 3 doesn't guarantee it's even (e.g., 3x3=9)." },
        { q: "Who is taller, A or B? I: A is taller than C. II: C is shorter than B.", options: ["I alone", "II alone", "Both required", "Neither is sufficient"], answer: "Neither is sufficient", explanation: "We know A > C and B > C, but we still have no way to compare A and B directly." },
        { q: "What is the area of the rectangle? I: Length is 10. II: Perimeter is 30.", options: ["I alone", "II alone", "Both required", "Neither"], answer: "Both required", explanation: "Perimeter and Length together allow you to find Width. Then Length x Width gives Area." },
        { q: "What day is today? I: Tomorrow is Monday. II: Yesterday was Saturday.", options: ["I alone is sufficient", "II alone is sufficient", "Either I or II is sufficient", "Both required"], answer: "Either I or II is sufficient", explanation: "Statement I tells us today is Sunday. Statement II also tells us today is Sunday. Either works." }
      ] 
    },
    "Direction Sense": { 
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Direction Sense</h3><p>Trace the path described on a mental map. Draw a compass cross (N, E, S, W) on scrap paper if needed.</p>", 
      questions: [
        { q: "Face North, turn 90 degrees right. You face?", options: ["North", "South", "East", "West"], answer: "East", explanation: "Turning 90 degrees right from North points you East." },
        { q: "Go 10m North, turn left, go 5m. Which direction are you from start?", options: ["North-East", "North-West", "South-East", "South-West"], answer: "North-West", explanation: "You moved North, then West. Your end point is North-West of your start." },
        { q: "Sunrise is in the East. If a man faces the sun in the morning, his shadow is to his?", options: ["Front", "Back", "Left", "Right"], answer: "Back", explanation: "Since the light source is in front of him, the shadow falls behind him." },
        { q: "Go 5m South, turn right, go 5m, turn right go 5m. Distance from start?", options: ["0m", "5m", "10m", "15m"], answer: "5m", explanation: "You walked in a square shape missing one side. You are exactly 5m West of where you started." },
        { q: "If South-East becomes North, what will West become?", options: ["North-East", "North-West", "South-East", "South-West"], answer: "South-East", explanation: "The compass has rotated 135 degrees counter-clockwise. West rotates to South-East." }
      ] 
    },
    "Statement and Conclusion": { 
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Statement and Conclusion</h3><p>Accept the statements as absolute truth, even if they sound silly in real life. Then evaluate if the conclusion strictly follows.</p>", 
      questions: [
        { q: "Statement: All dogs are animals. Conclusion: All animals are dogs.", options: ["True", "False", "Cannot Say", "Probably True"], answer: "False", explanation: "Just because all dogs fit into the animal category, doesn't mean dogs are the ONLY animals." },
        { q: "Statement: Some cats are black. Conclusion: Some black things are cats.", options: ["True", "False", "Cannot Say", "Probably False"], answer: "True", explanation: "If cat A is black, then black thing A is a cat. The reverse is true." },
        { q: "Statement: It rained today. The ground is wet. Conclusion: The rain made the ground wet.", options: ["Logically follows", "Does not follow", "Cannot determine", "Irrelevant"], answer: "Logically follows", explanation: "Based solely on the premises provided, rain causes wet ground." },
        { q: "S1: No apples are oranges. S2: All oranges are fruits. Concl: No apples are fruits.", options: ["True", "False", "Uncertain", "Invalid format"], answer: "False", explanation: "Apples aren't oranges, but they can still be fruits." },
        { q: "S1: All pens are pencils. S2: All pencils are erasers. Concl: All pens are erasers.", options: ["True", "False", "Uncertain", "None"], answer: "True", explanation: "A nested syllogism. If A=B and B=C, then A is inside C." }
      ] 
    },
    "Arrangements": { 
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Arrangements</h3><p>Draw tables, lines, or circles on scrap paper to place people based on the clues given.</p>", 
      questions: [
        { q: "A, B, C sit in a row. B is in the middle. Who is at the ends?", options: ["A and B", "B and C", "A and C", "Cannot determine"], answer: "A and C", explanation: "If B is in the center seat, the remaining seats at the ends must belong to A and C." },
        { q: "5 people in a circle. A is right of B. Who is left of A?", options: ["B", "C", "D", "Cannot determine"], answer: "B", explanation: "If they are facing the center, and A is to B's right, then B must be to A's left." },
        { q: "In a line of 10 people, X is 3rd from front. What is X's position from back?", options: ["7th", "8th", "9th", "10th"], answer: "8th", explanation: "Total = (Front Pos + Back Pos) - 1. 10 = (3 + Back) - 1. Back = 8." },
        { q: "P is taller than Q but shorter than R. Who is tallest?", options: ["P", "Q", "R", "Cannot determine"], answer: "R", explanation: "R > P and P > Q. Therefore R is the tallest." },
        { q: "A is 1st, B is 2nd, C is 3rd. What position is B?", options: ["1st", "2nd", "3rd", "Last"], answer: "2nd", explanation: "Directly stated in the prompt." }
      ] 
    },
    "Calendar and Clocks": { 
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Calendar and Clocks</h3><p>Understand leap years (divisible by 4, but century years must be divisible by 400), odd days, and angle calculations.</p>", 
      questions: [
        { q: "How many days in a leap year?", options: ["364", "365", "366", "367"], answer: "366", explanation: "A leap year has an extra day in February." },
        { q: "If today is Monday, what day is 7 days from now?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], answer: "Monday", explanation: "Days of the week repeat exactly every 7 days." },
        { q: "Angle between hands of a clock at 3:00?", options: ["0 degrees", "45 degrees", "90 degrees", "180 degrees"], answer: "90 degrees", explanation: "The minute hand is at 12, hour hand is at 3. This forms a perfect right angle." },
        { q: "How many times do clock hands overlap in 12 hours?", options: ["10", "11", "12", "24"], answer: "11", explanation: "They overlap 11 times because the 12:00 overlap is counted only once for the 11:00-1:00 period." },
        { q: "Which of these is a leap year?", options: ["1900", "1998", "2000", "2002"], answer: "2000", explanation: "Century years must be divisible by 400. 1900 is not, but 2000 is." }
      ] 
    }
  },

  "Verbal Ability": {
    "Synonyms Antonyms": {
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Synonyms and Antonyms</h3><p>Synonyms are words with similar meanings. Antonyms are opposites.</p>",
      questions: [
        { q: "Synonym for 'Abundant':", options: ["Scarce", "Plentiful", "Rare", "Short"], answer: "Plentiful", explanation: "Abundant means existing in large quantities." },
        { q: "Antonym for 'Brave':", options: ["Courageous", "Fearless", "Cowardly", "Bold"], answer: "Cowardly", explanation: "The opposite of brave is lacking courage (cowardly)." },
        { q: "Synonym for 'Lucid':", options: ["Confusing", "Clear", "Dark", "Heavy"], answer: "Clear", explanation: "Lucid means expressed clearly or easy to understand." },
        { q: "Antonym for 'Expand':", options: ["Grow", "Stretch", "Contract", "Widen"], answer: "Contract", explanation: "To expand is to get bigger; to contract is to get smaller." },
        { q: "Synonym for 'Diligent':", options: ["Lazy", "Hardworking", "Careless", "Slow"], answer: "Hardworking", explanation: "Diligent means having or showing care and conscientiousness in one's work." }
      ]
    },
    "Fill in the blanks": { 
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Fill in the blanks</h3><p>Read the full sentence for context, paying attention to verb tenses and prepositions before choosing.</p>", 
      questions: [
        { q: "I ___ to the store yesterday.", options: ["go", "gone", "went", "going"], answer: "went", explanation: "'Yesterday' indicates past tense." },
        { q: "She is good ___ math.", options: ["in", "at", "on", "with"], answer: "at", explanation: "The correct preposition for a skill is 'at' (good at math)." },
        { q: "The book is ___ the table.", options: ["on", "in", "under", "over"], answer: "on", explanation: "A book rests on the surface." },
        { q: "He ___ breakfast every morning.", options: ["eat", "eats", "eating", "ate"], answer: "eats", explanation: "Habitual actions use the present simple tense (he eats)." },
        { q: "I have been living here ___ 2010.", options: ["for", "since", "from", "in"], answer: "since", explanation: "'Since' is used with a specific starting point in time." }
      ] 
    },
    "Find Error": { 
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Find Error</h3><p>Check for subject-verb agreement, proper preposition use, and redundant wording.</p>", 
      questions: [
        { q: "Find error: 'He go to school every day.'", options: ["He", "go", "to school", "every day"], answer: "go", explanation: "Third-person singular requires 'goes'." },
        { q: "Find error: 'I has a dog.'", options: ["I", "has", "a", "dog"], answer: "has", explanation: "First-person pronoun 'I' uses 'have', not 'has'." },
        { q: "Find error: 'She is more taller than me.'", options: ["She is", "more taller", "than", "me"], answer: "more taller", explanation: "'Taller' is already comparative. Adding 'more' is redundant." },
        { q: "Find error: 'The datas are incorrect.'", options: ["The", "datas", "are", "incorrect"], answer: "datas", explanation: "'Data' is already a plural noun (datum is singular). 'Datas' is not a word." },
        { q: "Find error: 'He didn't went there.'", options: ["He", "didn't", "went", "there"], answer: "went", explanation: "'Didn't' already establishes past tense, so it should be followed by the base verb 'go'." }
      ] 
    },
    "Verbal Analogies": { 
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Verbal Analogies</h3><p>Identify the exact relationship between the first pair of words (e.g., tool:action), and apply it to the second pair.</p>", 
      questions: [
        { q: "Hot : Cold :: Light : ?", options: ["Sun", "Dark", "Bright", "Heavy"], answer: "Dark", explanation: "The relationship is antonyms (opposites)." },
        { q: "Pen : Write :: Knife : ?", options: ["Cut", "Sharp", "Metal", "Handle"], answer: "Cut", explanation: "The relationship is tool : action it performs." },
        { q: "Bird : Fly :: Fish : ?", options: ["Water", "Swim", "Gills", "Fins"], answer: "Swim", explanation: "The relationship is animal : primary mode of movement." },
        { q: "Doctor : Hospital :: Teacher : ?", options: ["School", "Books", "Students", "Chalk"], answer: "School", explanation: "The relationship is professional : workplace." },
        { q: "Tree : Forest :: Sand : ?", options: ["Desert", "Beach", "Water", "Dune"], answer: "Desert", explanation: "The relationship is singular element : massive collection of that element." }
      ] 
    },
    "Sentence correction": { 
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Sentence Correction</h3><p>Look for grammatical accuracy, pronoun case, and conciseness.</p>", 
      questions: [
        { q: "Correct: 'Him and I went to the park.'", options: ["He and I went...", "Me and him went...", "I and he went...", "No correction needed"], answer: "He and I went...", explanation: "You need subject pronouns here. Remove 'and I' to test it: 'He went to the park' is correct." },
        { q: "Correct: 'Between you and I, it's a secret.'", options: ["Between you and me", "Between I and you", "Between us and I", "No error"], answer: "Between you and me", explanation: "Prepositions like 'between' require object pronouns (me)." },
        { q: "Correct: 'The group of students are noisy.'", options: ["The group of students is noisy", "The groups of student is noisy", "Students are noisy", "No error"], answer: "The group of students is noisy", explanation: "'Group' is a collective singular noun, requiring the singular verb 'is'." },
        { q: "Correct: 'She sang good.'", options: ["She sang well", "She singing good", "She sung good", "No error"], answer: "She sang well", explanation: "'Good' is an adjective. 'Well' is the adverb needed to modify the verb 'sang'." },
        { q: "Correct: 'I ain't got no money.'", options: ["I haven't got no money", "I have no money", "I ain't got money", "No error"], answer: "I have no money", explanation: "Avoid double negatives ('ain't' and 'no'). 'I have no money' is grammatically correct." }
      ] 
    },
    "Reading Comprehension": { 
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Reading Comprehension</h3><p>Read the questions first, then scan the passage so you know exactly what information to look for.</p>", 
      questions: [
        { q: "Passage: 'Dogs are loyal pets.' Question: What kind of pets are dogs?", options: ["Loyal", "Angry", "Wild", "Quiet"], answer: "Loyal", explanation: "The text explicitly states they are loyal." },
        { q: "Passage: 'The sun is a star.' Question: What is the sun?", options: ["Planet", "Moon", "Asteroid", "Star"], answer: "Star", explanation: "The text explicitly defines the sun as a star." },
        { q: "Passage: 'Water boils at 100 degrees.' Question: When does water boil?", options: ["0 deg", "50 deg", "100 deg", "200 deg"], answer: "100 deg", explanation: "The text provides the specific boiling point." },
        { q: "Passage: 'Rome is in Italy.' Question: Where is Rome?", options: ["France", "Spain", "Italy", "Greece"], answer: "Italy", explanation: "The text provides the location." },
        { q: "Passage: 'Cheetahs run fast.' Question: How do cheetahs run?", options: ["Slowly", "Fast", "Quietly", "Rarely"], answer: "Fast", explanation: "The text states their running speed." }
      ] 
    },
    "Parajumbles": { 
      image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=800",
      elaborate: "<h3>Parajumbles</h3><p>Look for introductory sentences and transition words to find the correct, logical sequence.</p>", 
      questions: [
        { q: "Order: 1. It began raining. 2. We went inside. 3. We were playing outside.", options: ["3,1,2", "1,2,3", "2,3,1", "3,2,1"], answer: "3,1,2", explanation: "Action (playing), Interruption (raining), Reaction (going inside)." },
        { q: "Order: 1. I woke up. 2. I brushed my teeth. 3. I went to bed.", options: ["1,2,3", "3,1,2", "2,1,3", "1,3,2"], answer: "1,2,3", explanation: "Standard chronological morning routine." },
        { q: "Order: 1. Bake for 20 mins. 2. Mix ingredients. 3. Eat the cake.", options: ["2,1,3", "1,2,3", "3,2,1", "2,3,1"], answer: "2,1,3", explanation: "Preparation (mix), Cooking (bake), Result (eat)." },
        { q: "Order: 1. She bought a ticket. 2. She watched the movie. 3. She went to the cinema.", options: ["3,1,2", "1,2,3", "2,3,1", "1,3,2"], answer: "3,1,2", explanation: "Location (cinema), Prerequisite (ticket), Action (watch)." },
        { q: "Order: 1. The alarm rang. 2. He hit snooze. 3. He was late.", options: ["1,2,3", "2,1,3", "3,2,1", "1,3,2"], answer: "1,2,3", explanation: "Cause (alarm), Action (snooze), Consequence (late)." }
      ] 
    }
  }
};
// ------------------------------------------

function App() {
  const [currentScreen, setCurrentScreen] = useState('signup');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');

  // 1. SIGNUP
  if (currentScreen === 'signup') {
    return <Signup onComplete={() => setCurrentScreen('dashboard')} />;
  }

  // 2. MAIN DASHBOARD
  if (currentScreen === 'dashboard') {
    return (
      <Dashboard 
        onSelectTopic={(subject) => {
          setSelectedSubject(subject);
          setCurrentScreen('subtopics'); 
        }} 
      />
    );
  }

  // 3. SUBTOPIC SCREEN (Updated with Brown Theme CSS)
  if (currentScreen === 'subtopics') {
    const subtopics = Object.keys(COURSE_CATALOG[selectedSubject]);
    
    return (
      <div className="fade-in" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#3E2723', fontSize: '36px', marginBottom: '10px' }}>{selectedSubject}</h2>
        <p style={{ color: '#8D6E63', marginBottom: '30px' }}>Select a specific topic to study:</p>
        
        <button 
           onClick={() => setCurrentScreen('dashboard')}
           className="btn-secondary"
           style={{ marginBottom: '30px' }}
        >
          ← Back to Main Menu
        </button>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
          {subtopics.map((sub) => (
            <button 
              key={sub} 
              onClick={() => {
                setSelectedSubtopic(sub);
                setCurrentScreen('teach');
              }}
              className="glass-card slide-up"
              style={{ cursor: 'pointer', border: 'none', width: '250px', padding: '20px', transition: 'transform 0.3s' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 style={{ color: '#795548', margin: 0, fontSize: '18px' }}>{sub}</h3>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Fetch data safely
  const subtopicData = COURSE_CATALOG[selectedSubject][selectedSubtopic];

  // 4. TEACHER MODE (Updated to pass 'data' instead of 'guideText')
  if (currentScreen === 'teach') {
    return (
      <TeacherMode 
        topic={`${selectedSubject} - ${selectedSubtopic}`} 
        data={subtopicData} // Fixed prop name!
        onStartTest={() => setCurrentScreen('test')} 
      />
    );
  }

  // 5. QUIZ
  if (currentScreen === 'test') {
    return (
      <Quiz 
        topic={selectedSubtopic} 
        questions={subtopicData.questions}
        onFinish={() => setCurrentScreen('subtopics')} 
      />
    );
  }

  return null;
}

export default App;