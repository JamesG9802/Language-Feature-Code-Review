/**
 * A data type storing information about a movie.
*/
typedef struct Movie {
	char name[256];
	unsigned int views;
} Movie;

/**
 * An algorithm to copy the sorted contents of src to dst.
 * Uses the least significant digit radix sort algorithm and sorts based on Movie views.
 * It is assumed that src and dst are valid arrays.
 * It is assumed that integers are 32 bit numbers.
 * @param src the source array of Movies. Untouched by the sorting.
 * @param dst the destination array of Movies. Will contain the sorted data.
 * @param n the number of elements in src.
*/
void radix_clone(Movie src[], Movie dst[], unsigned int n1, unsigned int n2) {
    Movie bucket0[100], bucket1[100];
    unsigned int count0 = 0u, count1 = 0u, mask = 0u, i = 0u, d = 0u;

    panicif(n1 > 100) {
        printf("Can't sort more than 100 movies.");
    }
    panicif(n1 != n2) {
        printf("src is not the same size as dst.");
    }

    //  Copy src to dst.
    for(i = 0; i < n1; i += 1) {
        dst[i] = src[i];
    }

    //   Iterate through each bit, starting from the least significant digit.
    for(d = 0; d <= 31; d += 1) {
        count0 = 0;
        count1 = 0;
        mask = 1 << d;
        //  Assigns elements to a bucket based on the digit (0 or 1).
        for (i = 0; i < n1; i += 1) {
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