/**
 * Corresponds to a 6 point likert scale where 1 is Strongly Disagree and 6 is Strongly Agree.
 */
export type survey_scale = 1 | 2 | 3 | 4 | 5 | 6;

export type survey_type = {
    "all_experience": number | -1,
    "pro_experience": number | -1,
    "language_experience": string,
    "reviewer_experience": survey_scale | -1,
    "reviewee_experience": survey_scale | -1,
    "g-c_readable"?: survey_scale,
    "g-c_simple"?: survey_scale,
    "g-c_maintainable"?: survey_scale,
    "g-c_works"?: survey_scale,
    "g-c_approve"?: survey_scale,
    "g-c_duration"?: number,
    "g-w_readable"?: survey_scale,
    "g-w_simple"?: survey_scale,
    "g-w_maintainable"?: survey_scale,
    "g-w_works"?: survey_scale,
    "g-w_approve"?: survey_scale,
    "g-w_duration"?: number,
    "sy-k-c_readable"?: survey_scale,
    "sy-k-c_simple"?: survey_scale,
    "sy-k-c_maintainable"?: survey_scale,
    "sy-k-c_works"?: survey_scale,
    "sy-k-c_approve"?: survey_scale,
    "sy-k-c_duration"?: number,
    "sy-k-w_readable"?: survey_scale,
    "sy-k-w_simple"?: survey_scale,
    "sy-k-w_maintainable"?: survey_scale,
    "sy-k-w_works"?: survey_scale,
    "sy-k-w_approve"?: survey_scale,
    "sy-k-w_duration"?: number,
    "sy-s-c_readable"?: survey_scale,
    "sy-s-c_simple"?: survey_scale,
    "sy-s-c_maintainable"?: survey_scale,
    "sy-s-c_works"?: survey_scale,
    "sy-s-c_approve"?: survey_scale,
    "sy-s-c_duration"?: number,
    "sy-s-w_readable"?: survey_scale,
    "sy-s-w_simple"?: survey_scale,
    "sy-s-w_maintainable"?: survey_scale,
    "sy-s-w_works"?: survey_scale,
    "sy-s-w_approve"?: survey_scale,
    "sy-s-w_duration"?: number,
    "se-k-c_readable"?: survey_scale,
    "se-k-c_simple"?: survey_scale,
    "se-k-c_maintainable"?: survey_scale,
    "se-k-c_works"?: survey_scale,
    "se-k-c_approve"?: survey_scale,
    "se-k-c_duration"?: number,
    "se-k-w_readable"?: survey_scale,
    "se-k-w_simple"?: survey_scale,
    "se-k-w_maintainable"?: survey_scale,
    "se-k-w_works"?: survey_scale,
    "se-k-w_approve"?: survey_scale,
    "se-k-w_duration"?: number,
    "se-s-c_readable"?: survey_scale,
    "se-s-c_simple"?: survey_scale,
    "se-s-c_maintainable"?: survey_scale,
    "se-s-c_works"?: survey_scale,
    "se-s-c_approve"?: survey_scale,
    "se-s-c_duration"?: number,
    "se-s-w_readable"?: survey_scale,
    "se-s-w_simple"?: survey_scale,
    "se-s-w_maintainable"?: survey_scale,
    "se-s-w_works"?: survey_scale,
    "se-s-w_approve"?: survey_scale,
    "se-s-w_duration"?: number,
    "p-k-c_readable"?: survey_scale,
    "p-k-c_simple"?: survey_scale,
    "p-k-c_maintainable"?: survey_scale,
    "p-k-c_works"?: survey_scale,
    "p-k-c_approve"?: survey_scale,
    "p-k-c_duration"?: number,
    "p-k-w_readable"?: survey_scale,
    "p-k-w_simple"?: survey_scale,
    "p-k-w_maintainable"?: survey_scale,
    "p-k-w_works"?: survey_scale,
    "p-k-w_approve"?: survey_scale,
    "p-k-w_duration"?: number,
    "p-s-c_readable"?: survey_scale,
    "p-s-c_simple"?: survey_scale,
    "p-s-c_maintainable"?: survey_scale,
    "p-s-c_works"?: survey_scale,
    "p-s-c_approve"?: survey_scale,
    "p-s-c_duration"?: number,
    "p-s-w_readable"?: survey_scale,
    "p-s-w_simple"?: survey_scale,
    "p-s-w_maintainable"?: survey_scale,
    "p-s-w_works"?: survey_scale,
    "p-s-w_approve"?: survey_scale,
    "p-s-w_duration"?: number,
};

/**
 * Global singleton that contains the data the user will submit.
 */
export let survey_data: survey_type = {
    "all_experience": -1,
    "pro_experience": -1,
    "language_experience": "",
    "reviewer_experience": -1,
    "reviewee_experience": -1,
};

export function set_survey_data(data: survey_type) {
    survey_data = JSON.parse(JSON.stringify(data));
}