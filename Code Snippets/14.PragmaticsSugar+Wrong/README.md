# Question 14: **Incorrect** Implementation with **Pragmatics Sugar Language Features**
You are tasked to review the following code snippet. It is written in **MODIFIED VERSION OF C** and is intended to copy an array of Movies to a new destination in memory and sort them based on their views in ascending order using radix sort.

This modified version of C that allows for implicit type inference. At compile time, the types of variables can be inferred given their usage in the code making explicitly writing variable types unnecessary in most circumstances. Variable types cannot change; an int must always be an int.

Note that a nonstandard function is used, `clone(void* src)`. You can assume this function is called correctly and correctly returns a pointer to a clone of `src`.

You can assume that this version of C can handle the implementation of this feature correctly without affecting the mechanisms behind other parts of the language. 
## Implementation Details
C is the language the code is written in. The version of C is modified to utilize implicit type inference. It is found in other languages like TypeScript for ease of use.
## Purpose of Question
This code utilizes a pragmatics kernel feature: implicit type inference.