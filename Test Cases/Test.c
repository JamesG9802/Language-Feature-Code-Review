#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * A data type storing information about a movie.
*/
typedef struct Movie {
	char name[256];
	unsigned int views;
} Movie;

/**
 * Generic Wrong 2 version of Movie - A data type storing information about a movie.
*/
typedef struct WrongMovie {
	char name[256];
	int views;
} WrongMovie;

//  Generic + Correct
void generic_correct_radix_clone(Movie src[], Movie dst[], unsigned int n) {
    Movie bucket0[100], bucket1[100];
    unsigned int count0 = 0u, count1 = 0u, mask = 0u, i = 0u, d = 0u;

    //  Copy src to dst.
    for(i = 0; i < n; i += 1) {
        dst[i] = src[i];
    }

    //   Iterate through each bit, starting from the least significant digit.
    for(d = 0; d <= 31; d += 1) {
        count0 = 0;
        count1 = 0;
        mask = 1 << d;
        //  Assigns elements to a bucket based on the digit (0 or 1).
        for (i = 0; i < n; i += 1) {
            if ((dst[i].views & mask) == 0) {
                bucket0[count0] = dst[i];
                count0 = count0 + 1;
            }
            else {
                bucket1[count1] = dst[i];
                count1 = count1 + 1;
            }
        }
        //  Replace dst with bucket contents.
        for (i = 0; i < count0; i += 1) {
            dst[i] = bucket0[i];
        }
        for (i = 0; i < count1; i += 1) {
            dst[count0 + i] = bucket1[i];
        }
    }
}

//  Generic + Wrong 1
void generic_wrong_1_radix_clone(Movie src[], Movie dst[], unsigned int n) {
    Movie bucket0[100], bucket1[100];
    unsigned int count0 = 0u, count1 = 0u, mask = 0u, i = 0u, d = 0u;

    //  Copy src to dst.
    for(i = 0; i < n; i += 1) {
        dst[i] = src[i];
    }

    //   Iterate through each bit, starting from the least significant digit.
    for(d = 0; d <= 31; d += 1) {
        count0 = 0;
        count1 = 0;
        mask = 1 << d;
        //  Assigns elements to a bucket based on the digit (0 or 1).
        for (i = 0; i < n; i += 1) {
            if ((dst[i].views & mask) == 1) {
                bucket1[count1] = dst[i];
                count1 = count1 + 1;
            }
            else {
                bucket0[count0] = dst[i];
                count0 = count0 + 1;
            }
        }
        //  Replace dst with bucket contents.
        for (i = 0; i < count0; i += 1) {
            dst[i] = bucket0[i];
        }
        for (i = 0; i < count1; i += 1) {
            dst[count0 + i] = bucket1[i];
        }
    }
}

//  Generic + Wrong 2
void generic_wrong_2_radix_clone(WrongMovie src[], WrongMovie dst[], unsigned int n) {
    WrongMovie bucket0[100], bucket1[100];
    unsigned int count0 = 0u, count1 = 0u, mask = 0u, i = 0u, d = 0u;

    //  Copy src to dst.
    for(i = 0; i < n; i += 1) {
        dst[i] = src[i];
    }

    //   Iterate through each bit, starting from the least significant digit.
    for(d = 0; d <= 31; d += 1) {
        count0 = 0;
        count1 = 0;
        mask = 1 << d;
        //  Assigns elements to a bucket based on the digit (0 or 1).
        for (i = 0; i < n; i += 1) {
            if ((dst[i].views & mask) == 0) {
                bucket0[count0] = dst[i];
                count0 = count0 + 1;
            }
            else {
                bucket1[count1] = dst[i];
                count1 = count1 + 1;
            }
        }
        //  Replace dst with bucket contents.
        for (i = 0; i < count0; i += 1) {
            dst[i] = bucket0[i];
        }
        for (i = 0; i < count1; i += 1) {
            dst[count0 + i] = bucket1[i];
        }
    }
}

//  Generic + Wrong 3
void generic_wrong_3_radix_clone(Movie src[], Movie dst[], unsigned int n) {
    Movie bucket0[100], bucket1[100];
    unsigned int count0 = 0u, count1 = 0u, mask = 0u, i = 0u, d = 0u;
    //  not in original but to prevent infinite loops
    unsigned int max_iterations = 0u;

    //  Copy src to dst.
    for(i = 0; i < n; i += 1) {
        dst[i] = src[i];
    }

    //   Iterate through each bit, starting from the least significant digit.
    for(i = 0, max_iterations = 0u; i <= 31 && max_iterations < n; i += 1, max_iterations += 1) {
        count0 = 0;
        count1 = 0;
        mask = 1 << i;
        //  Assigns elements to a bucket based on the digit (0 or 1).
        for (d = 0; d < n; d += 1) {
            if ((dst[d].views & mask) == 0) {
                bucket0[count0] = dst[d];
                count0 = count0 + 1;
            }
            else {
                bucket1[count1] = dst[d];
                count1 = count1 + 1;
            }
        }
        //  Replace dst with bucket contents.
        for (i = 0; i < count0; i += 1) {
            dst[i] = bucket0[i];
        }
        for (i = 0; i < count1; i += 1) {
            dst[count0 + i] = bucket1[i];
        }
    }
}

int is_same(Movie* a, Movie* b, int n) {
    int i;
    for(i = 0; i < n; i++) {
        if(strcmp(a[i].name, b[i].name) != 0 || a[i].views != b[i].views)
        {
            printf("Not same, %d vs %d: %s, %d vs %s, %d\n",
                   i, i+1, a[i].name, a[i].views,
                   b[i].name, b[i].views);
            return 0;
        }
    }
    return 1;
}

Movie* file_to_movie_arr(FILE* file, int* size) {
    Movie* movies;
    long long int line_count = 0;
    unsigned int i = 0;
    for (i = getc(file); i != EOF; i = getc(file)) {
        if (i == '\n') {
          line_count = line_count + 1;
        }
    }
    rewind(file);
    movies = malloc(sizeof(Movie) * line_count);
    for(i = 0; i < line_count; i++) {
        char line[512];
        int comma;
        fgets(line, sizeof(line), file);
        comma = strcspn(line, ",");
        memcpy(movies[i].name, line, comma);
        movies[i].name[comma+1] = '\0';
        movies[i].views = atoi(line+comma+1);
    }
    *size = line_count;
    return movies;
}

//  Test case files are expected to have each Movie entry separated by a line separator
int main(int argc, char* argv[]) {
    FILE *input, *output;
    Movie *src, *dst, *expected;
    unsigned int src_n, dst_n, expected_n, success;

    if(argc < 4) {
        printf("Please enter the file paths for a input and output files and algorithm.\n");
        exit(1);
    }
    input = fopen(argv[1], "rb");
    output = fopen(argv[2], "rb");
    if(input == NULL || output == NULL) {
        if(input == NULL)
            printf("Cannot open %s\n", argv[1]);
        if(output == NULL)
            printf("Cannot open %s\n", argv[2]);
        exit(1);
    }

    src = file_to_movie_arr(input, &src_n);
    dst_n = src_n;
    dst = malloc(sizeof(Movie) * dst_n);

    if(strcmp(argv[3], "generic_correct") == 0) {
        generic_correct_radix_clone(src, dst, src_n);
    }
    else if(strcmp(argv[3], "generic_wrong_1")  == 0) {
        generic_wrong_1_radix_clone(src, dst, src_n);
    }
    else if(strcmp(argv[3], "generic_wrong_2")  == 0) {
        generic_wrong_2_radix_clone(src, dst, src_n);
    }
    else if(strcmp(argv[3], "generic_wrong_3")  == 0) {
        generic_wrong_3_radix_clone(src, dst, src_n);
    }

    expected = file_to_movie_arr(output, &expected_n);
    printf("%s: ", argv[3]);
    success = is_same(dst, expected, dst_n);
    if(success) printf("passed test\n");
    return success;
}
