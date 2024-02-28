# Language-Feature-Code-Review
A study on the effect of programming language features on code review success.

Our questionnaire design asks respondents to examine a code snippet and rank it in terms of readability, simplicity, maintainability, and correctness. The code involves an algorithm that performs radix sort on a Movie data type and copies the data to another array. They then also are asked if they would accept the reviewed changes into a codebase.

We examine the influence of correctness as well by including faulty code. There are three types of errors we included:
1. Checking for the wrong bit value.
Checking for 1 is incorrect because the mask itself is never 1 except in the first iteration.
```
    //  Correct
    if ((dst[i].views & mask) == 0)
```
```
    //  Incorrect
    if ((dst[i].views & mask) == 1)
```
2. Allowing signed integers.
Due to how signed integers are represented (usually in 2's complement form), this causes negative signed values to be viewed as large unisgned values.
```
    //  Correct
    unsigned int views;
```
```
    //  Incorrect
    signed int views.
```
3. Swapping i and d
Swapping the loop variables will break the algorithm due to the i being reused later on. 
```
    //  correct
    for(d = 0; d <= 31; d += 1)
        ...
        mask = 1 << d;
        for (i = 0; i < n; i += 1)
```
```
    //  incorrect
    for(i = 0; i <= 31; i += 1)
        ...
        mask = 1 << i;
        for (d = 0; d < n; d += 1)
```

We chose these errors because they highlight the main bugs programmers face in their code: generic programming errors.