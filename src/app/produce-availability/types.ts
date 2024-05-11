/**
 * The month of the year (e.g. 1 = January, 12 = December).
 */
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * The availability of produce (i.e. when it is in season).
 */
export type ProduceAvailability = {
    /**
     * The month(s) in which the produce is available.
     */
    availability: Month[];
    /**
     * The name of the produce.
     */
    name: string;
    /**
     * The type of produce.
     */
    type: "fruit" | "vegetable";
};
