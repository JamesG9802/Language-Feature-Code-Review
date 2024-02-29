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
 * It is assumed that src and dst are valid arrays of the same size and that n <= 100.
 * It is assumed that integers are 32 bit numbers.
 * @param src the source array of Movies. Untouched by the sorting.
 * @param dst the destination array of Movies. Will contain the sorted data.
 * @param n the number of elements in src.
*/
void radix_clone(Movie src[], Movie dst[], unsigned int n) {
    Movie bucket0[100], bucket1[100];
    unsigned int count0 = 0u, count1 = 0u, mask = 0u, i = 0u, d = 0u;

    //  Copy src to dst.
    for(i = 0; i < n; i++) {
        dst[i] = src[i];
    }

    //   Iterate through each bit, starting from the least significant digit.
    for(i = 0; i <= 31; i++) {
        count0 = 0;
        count1 = 0;
        mask = 1 << i;
        //  Assigns elements to a bucket based on the digit (0 or 1).
        for (d = 0; d < n; d++) {
            switch (dst[d].views & mask) {
                case 0:
                    bucket0[count0++] = dst[d];
                    break;
                default:
                    bucket1[count1++] = dst[d];
            }
        }
        //  Replace dst with bucket contents.
        for (i = 0; i < count0; i++) {
            dst[i] = bucket0[i];
        }
        for (i = 0; i < count1; i++) {
            dst[count0 + i] = bucket1[i];
        }
    }
}