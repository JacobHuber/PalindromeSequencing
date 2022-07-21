# Palindrome Sequencing

```
Given a string n representing an integer, return the closest integer (not including itself), 
which is a palindrome. If there is a tie, return the smaller one.

example:

Input: n = "123"

Output: "121"
```

The main algorithm is **getNearestPalindrome(n: string)**. It utilizes two helper functions, **mirrorString(n: string)**, and **findCloser(n: string, answer1: string, answer2: string)**.


12 test cases were formed to cover the cases of the problem, and are ran in the function **runTestCases()**. To double down on the algorithm's functionality a brute force test was done by checking every number closer than *n* and the algorithm's answer are to each other and making sure there is no closer palindrome.