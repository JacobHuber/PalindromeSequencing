/*
	Jacob Huber
	xjacobhuber@gmail.com

---------------------------------------------------------------------------------------------------------

	Palindrome Sequencing


	Given a string n representing an integer, return the closest integer (not including itself), 
	which is a palindrome. If there is a tie, return the smaller one.

	example:

	Input: n = "123"

	Output: "121"

---------------------------------------------------------------------------------------------------------

	ASSUMPTIONS:

	- Negative integers are not palindromes.
	- Single digits are palindromes.
*/

/**
 * n: Starting integer (string)
 * answer1: First integer to compare (string)
 * answer2: Second integer to compare (string)
 * 
 * Returns which answer is closer to n, is not n,
 * and is not negative (assuming one of the answers is)
 * as a string.
 */
function findCloser(n, answer1, answer2) {
	const intN = parseInt(n);
	const intA1 = parseInt(answer1);
	const intA2 = parseInt(answer2);

	const diff1 = Math.abs(intN - intA1);
	const diff2 = Math.abs(intN - intA2);

	// Return the answer that is not the same as n
	if (diff1 === 0) return answer2;
	if (diff2 === 0) return answer1;

	// Return the answer that is closer to n, that is not n
	if (diff1 < diff2) return answer1;
	if (diff2 < diff1) return answer2;

	// Answers are equidistant to n, but not n, return smaller answer
	if (intA1 < intA2 && intA1 >= 0) return answer1;

	return answer2;
};

/**
 * n: String to be mirrored (string)
 * 
 * Returns a string whose back-half is the mirrored
 * version of its front-half. If the string is odd 
 * the center character is inbetween the two halves.
 * 
 * The front-half is mirrored because to keep the
 * integer near its source string we want to replace
 * the least significant digits instead of the most
 * significant digits.
 */
function mirrorString(n) {
	const centerIndex = Math.floor(n.length / 2);
	const isEven = (n.length % 2 === 0 ? true : false);

	// Get front-half of string
	let front = n.substr(0, centerIndex);

	// Mirror front-half of string
	// https://stackoverflow.com/questions/958908/how-do-you-reverse-a-string-in-place-in-javascript
	let mirroredFront = [...front].reverse().join("");

	// If n is odd
	if (!isEven) {
		// Add center of n to the front-half of the string
		front += n[centerIndex];
	}

	// Combine front-half with mirrored front-half
	return front + mirroredFront;
};

/**
 * n: A non-negative integer (string)
 * 
 * Finds the nearest palindrome is two steps.
 * 	1) Mirror starting integer to create a starting palindrome
 * 	2) Add/Subtract from starting integer in increasing magnitudes
 * 		to account for overflow cases where nearest palindrome is
 * 
 * Returns nearest palindrome as a string.
 */
function getNearestPalindrome(n) {
	// Error checking for incorrect formatted argument.
	if (typeof n !== typeof "") throw "n is not a string";
	if (n.length === 0) throw "n is the empty string";
	if (isNaN(n)) throw "n is not an integer";
	if (parseInt(n) < 0) throw "n is a negative integer";
	
	// n is a string representing a non-negative integer

	/** 11 is the only case where the number 2 less is a palindrome
	 * because 9 is a single digit. Adding in functionality to the 
	 * algorithm to account for this makes it needlessly complex so
	 * a hard coded case is added.
	 */
	if (n === "11") return "9";

	let bestAnswer = "";
	
	// Mirror starting integer for base best answer
	const mirrored = mirrorString(n);
	bestAnswer = mirrored;

	// Modify starting integer to cause overflow into next digit, creating 
	// a new palindrome, and finding if it's closer than the current best.
	const centerIndex = Math.floor(n.length / 2);
	for (let i = 0; i < n.length; i++) {
		const digit = 10 ** i; // Current magnitude

		// Add and subtract to account for overflow cases where digit is at 0 or 9
		const lower = mirrorString((parseInt(n) - digit).toString());
		const higher = mirrorString((parseInt(n) + digit).toString());

		// Find if new palindromes are closer to n than current bestAnswer
		bestAnswer = findCloser(n, bestAnswer, lower);
		bestAnswer = findCloser(n, bestAnswer, higher);
	}

	return bestAnswer;
};

/**
 * n: A string to be checked (string)
 * 
 * Returns a boolean checking if the string n is
 * a palindrome. 
 */
function isPalindrome(n) {
	const centerIndex = Math.floor(n.length / 2);

	// Check if each character has a matching character on 
	// the opposite side. (center is ignored as it doesn't have a match)
	for (let i = 0; i < centerIndex; i++) {
		if (n[i] != n[n.length - i - 1]) return false;
	}

	return true;
};

/**
 * n: A non-negative integer to be searched from (string)
 * distance: How far to check for palindromes around n (int)
 * 
 * Searches distance below n and distance above n to see if
 * any of the integers are palindromes closer than distance.
 */
function searchPalindromes(n, distance) {
	const intN = parseInt(n);

	let lower = intN - 1;
	let higher = intN + 1;
	for (let i = 0; i < distance - 1; i++) {
		if (isPalindrome(lower.toString())) {
			console.log("n: " + n + ", lower: " + lower.toString() + ", i: " + i.toString());
			break;
		}

		if (isPalindrome(higher.toString())) {
			console.log("n: " + n + ", higher: " + higher.toString() + ", i: " + i.toString());
			break;
		}

		lower -= 1;
		higher += 1;
	}
};

/**
 * Check a large span of integers to see if any of 
 * them have a closer integer than the algorithm
 * found.
 * 
 * This is really slow.
 */
function bruteforceTestPalindromes() {
	for (let i = 0; i < 10000000; i++) {
		const n = i.toString();
		const result = getNearestPalindrome(n);
		
		const diff = Math.abs(parseInt(result) - parseInt(n));
		searchPalindromes(n, diff);
	}

	console.log("Done.");
};


/**
 * Designed to cover all cases.
 * If these tests pass then algorithm 
 * should work.
 */
const TEST_CASES = [
	["123", "121"],
	["1", "0"],
	["0", "1"],
	["15", "11"],
	["11", "9"],
	["19", "22"],
	["10", "9"],
	["9", "8"],
	["1234", "1221"],
	["21576", "21612"],
	["999", "1001"],
	["199", "202"]
];

/**
 * Main test function to test getNearestPalindrome()
 * of tests in TEST_CASES.
 */
function runTestCases() {
	let passed = 0;
	let ran = 0;
	const total = TEST_CASES.length;
	TEST_CASES.forEach((current_case) => {
		const test = current_case[0];
		const answer = current_case[1];

		let result = "";
		try {
			result = getNearestPalindrome(test);
		} catch (e) {
			console.error(e);
			result = "";
		}

		if (result === answer) {
			passed += 1;
		} else {
			console.log("getNearestPalindrome(" + test + ") != " + answer);
			console.log("found " + result + " instead.");
			console.log("");
		}

		ran += 1;
	});

	console.log(ran.toString() + " tests ran.");
	console.log(passed.toString() + " / " + total.toString() + " tests passed.");
};

runTestCases();