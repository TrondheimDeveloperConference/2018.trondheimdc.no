
export default function getProgram() {
    return new Promise((resolve, reject) => {
        const url = 'https://api.trondheimdc.no/public/allSessions/TDC2018';
        fetch(url)
            .then(response => response.json())
            .then(response => {
                return resolve(response)
            }).catch(reject);
    });
}