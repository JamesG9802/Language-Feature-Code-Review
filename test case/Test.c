
#include <stdio.h>



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
}// Function to print an array of movies
void printMovies(Movie movies[], unsigned int n) {
    printf("Movies:\n");
    for (unsigned int i = 0; i < n; ++i) {
        printf("%s (%u views)\n", movies[i].name, movies[i].views);
    }
}

int main() {
    
    Movie src[] = {
        {"The Shawshank Redemption", 67890},
        {"The Dark Knight", 98765},
        {"Pulp Fiction", 12345},
        {"Schindler's List", 700000},
        {"Inception", 1300000},
        {"Fight Club", 750000},
        {"The Matrix", 1150000},
        {"Goodfellas", 850000},
        {"Gladiator", 1000000},
        {"Braveheart", 850000},
        {"The Green Mile", 950000},
        {"The Prestige", 800000},
        {"The Lion King", 1500000},
        {"Back to the Future", 1100000},
        {"The Terminator", 900000},
        {"Jurassic Park", 1050000},
        {"The Shining", 700000},
        {"Alien", 800000},
        {"The Godfather: Part II", 1000000},
        {"The Avengers", 1250000},
        {"Blade Runner", 950000},
        {"Django Unchained", 1100000},
        {"The Wolf of Wall Street", 1050000},
        {"Memento", 700000},
        {"The Shawshank Redemption", 1000000},
        {"The Godfather", 950000},
        {"The Dark Knight", 1200000},
        {"Forrest Gump", 1100000},
 
        
    };
    unsigned int n = sizeof(src) / sizeof(src[0]);

    // dst array
    Movie dst[n];

    // Sorts based on views in ascending order
    radix_clone(src, dst, n);

    // Print sorted array
    printf("Sorted Array:\n");
    printMovies(dst, n);

    return 0;
}
