export default function apiRequest() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            let data = {
                images: 'http://localhost:8000/3.jpeg',
                choices: ['new york city', 'walmart', 'canada', 'russia']
            };
            resolve(data);
            if (data === 'error') {
                reject('error');
            }
        }, 300);
    });
}
