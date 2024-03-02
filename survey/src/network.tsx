import { survey_type } from "./Questions/survey";

export function send_survey_data(response: survey_type, onSuccess: (data: any) => any, onFailure: (data: any) => any) {
    const url = "https://script.google.com/macros/s/AKfycbyhWIOSrYUMF_pWzzzlx6BQBcEzosXule84UsWIaGwW2B6wOSBygMThuu-ejwI5RsZ4/exec";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(response),
    })
    .then((res) => res.json())
    .then(onSuccess)
    .catch(onFailure);
}