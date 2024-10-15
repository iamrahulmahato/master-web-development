// LeetCode questions database with links
const questions = [
    {
        title: "Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        link: "https://leetcode.com/problems/two-sum/"
    },
    {
        title: "Add Two Numbers",
        difficulty: "Medium",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
        link: "https://leetcode.com/problems/add-two-numbers/"
    },
    {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
    },
    {
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        link: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
    },
    {
        title: "Longest Palindromic Substring",
        difficulty: "Medium",
        description: "Given a string s, return the longest palindromic substring in s.",
        link: "https://leetcode.com/problems/longest-palindromic-substring/"
    },
    {
        title: "ZigZag Conversion",
        difficulty: "Medium",
        description: "The string \"PAYPALISHIRING\" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)",
        link: "https://leetcode.com/problems/zigzag-conversion/"
    },
    {
        title: "Reverse Integer",
        difficulty: "Medium",
        description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.",
        link: "https://leetcode.com/problems/reverse-integer/"
    },
    {
        title: "String to Integer (atoi)",
        difficulty: "Medium",
        description: "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).",
        link: "https://leetcode.com/problems/string-to-integer-atoi/"
    },
    {
        title: "Palindrome Number",
        difficulty: "Easy",
        description: "Given an integer x, return true if x is palindrome integer.",
        link: "https://leetcode.com/problems/palindrome-number/"
    },
    {
        title: "Regular Expression Matching",
        difficulty: "Hard",
        description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where: '.' Matches any single character. '*' Matches zero or more of the preceding element.",
        link: "https://leetcode.com/problems/regular-expression-matching/"
    },
    // ... (more questions)
    {
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        link: "https://leetcode.com/problems/merge-k-sorted-lists/"
    },
    {
        title: "Swap Nodes in Pairs",
        difficulty: "Medium",
        description: "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)",
        link: "https://leetcode.com/problems/swap-nodes-in-pairs/"
    },
    {
        title: "Reverse Nodes in k-Group",
        difficulty: "Hard",
        description: "Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.",
        link: "https://leetcode.com/problems/reverse-nodes-in-k-group/"
    },
    {
        title: "Remove Duplicates from Sorted Array",
        difficulty: "Easy",
        description: "Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length.",
        link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
    },
    {
        title: "Remove Element",
        difficulty: "Easy",
        description: "Given an array nums and a value val, remove all instances of that value in-place and return the new length.",
        link: "https://leetcode.com/problems/remove-element/"
    },
    {
        title: "Container With Most Water",
        difficulty: "Medium",
        description: "Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.",
        link: "https://leetcode.com/problems/container-with-most-water/"
    },
    {
        title: "Integer to Roman",
        difficulty: "Medium",
        description: "Given an integer, convert it to a roman numeral.",
        link: "https://leetcode.com/problems/integer-to-roman/"
    },
    {
        title: "Roman to Integer",
        difficulty: "Easy",
        description: "Given a roman numeral, convert it to an integer.",
        link: "https://leetcode.com/problems/roman-to-integer/"
    },
    {
        title: "Longest Common Prefix",
        difficulty: "Easy",
        description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string \"\".",
        link: "https://leetcode.com/problems/longest-common-prefix/"
    },
    {
        title: "3Sum",
        difficulty: "Medium",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
        link: "https://leetcode.com/problems/3sum/"
    },
    {
        title: "3Sum Closest",
        difficulty: "Medium",
        description: "Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers.",
        link: "https://leetcode.com/problems/3sum-closest/"
    },
    {
        title: "Letter Combinations of a Phone Number",
        difficulty: "Medium",
        description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.",
        link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/"
    },
    {
        title: "4Sum",
        difficulty: "Medium",
        description: "Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that: 0 <= a, b, c, d < n, a, b, c, and d are distinct, and nums[a] + nums[b] + nums[c] + nums[d] == target.",
        link: "https://leetcode.com/problems/4sum/"
    },
    {
        title: "Remove Nth Node From End of List",
        difficulty: "Medium",
        description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
        link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/"
    },
    {
        title: "Valid Parentheses",
        difficulty: "Easy",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        link: "https://leetcode.com/problems/valid-parentheses/"
    },
    {
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        description: "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
        link: "https://leetcode.com/problems/merge-two-sorted-lists/"
    },
    {
        title: "Generate Parentheses",
        difficulty: "Medium",
        description: "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
        link: "https://leetcode.com/problems/generate-parentheses/"
    },
    {
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        link: "https://leetcode.com/problems/merge-k-sorted-lists/"
    },
    {
        title: "Swap Nodes in Pairs",
        difficulty: "Medium",
        description: "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)",
        link: "https://leetcode.com/problems/swap-nodes-in-pairs/"
    },
    {
        title: "Reverse Nodes in k-Group",
        difficulty: "Hard",
        description: "Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.",
        link: "https://leetcode.com/problems/reverse-nodes-in-k-group/"
    },
    {
        title: "Remove Duplicates from Sorted Array",
        difficulty: "Easy",
        description: "Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length.",
        link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
    },
    {
        title: "Remove Element",
        difficulty: "Easy",
        description: "Given an array nums and a value val, remove all instances of that value in-place and return the new length.",
        link: "https://leetcode.com/problems/remove-element/"
    },
    {
        title: "Implement strStr()",
        difficulty: "Easy",
        description: "Implement strStr(). Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
        link: "https://leetcode.com/problems/implement-strstr/"
    },
    {
        title: "Divide Two Integers",
        difficulty: "Medium",
        description: "Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.",
        link: "https://leetcode.com/problems/divide-two-integers/"
    },
    {
        title: "Substring with Concatenation of All Words",
        difficulty: "Hard",
        description: "You are given a string s and an array of strings words of the same length. Return all starting indices of substring(s) in s that is a concatenation of each word in words exactly once, in any order, and without any intervening characters.",
        link: "https://leetcode.com/problems/substring-with-concatenation-of-all-words/"
    },
    {
        title: "Next Permutation",
        difficulty: "Medium",
        description: "Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.",
        link: "https://leetcode.com/problems/next-permutation/"
    },
    {
        title: "Longest Valid Parentheses",
        difficulty: "Hard",
        description: "Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.",
        link: "https://leetcode.com/problems/longest-valid-parentheses/"
    },
    {
        title: "Search in Rotated Sorted Array",
        difficulty: "Medium",
        description: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). Given the array nums after the rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
        link: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
    },
    {
        title: "Find First and Last Position of Element in Sorted Array",
        difficulty: "Medium",
        description: "Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.",
        link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/"
    }
];

function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

function displayQuestion(question) {
    document.getElementById('question-title').textContent = question.title;
    const difficultyElement = document.getElementById('question-difficulty');
    difficultyElement.textContent = question.difficulty;
    difficultyElement.setAttribute('data-difficulty', question.difficulty);
    document.getElementById('question-description').textContent = question.description;
    document.getElementById('leetcode-link').href = question.link;
}

function newQuestion() {
    const question = getRandomQuestion();
    displayQuestion(question);
}

document.getElementById('new-question-btn').addEventListener('click', newQuestion);

// Display initial question when the page loads
newQuestion();