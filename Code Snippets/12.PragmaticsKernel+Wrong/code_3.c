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

    if(n1 > 100) {
        panic("Can't sort more than 100 movies.");
    }
    if(n1 != n2) {
        panic("src is not the same size as dst.");
    }

    //  Copy src to dst.
    for(i = 0; i < n1; i += 1) {
        dst[i] = src[i];
    }

    //   Iterate through each bit, starting from the least significant digit.
    for(i = 0; i <= 31; i += 1) {
        count0 = 0;
        count1 = 0;
        mask = 1 << i;
        //  Assigns elements to a bucket based on the digit (0 or 1).
        for (d = 0; d < n1; d += 1) {
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