export function getResults() {
    let results;
    localStorage.getItem('results') === null ? results = [] : results = JSON.parse(localStorage.getItem('results'));
    return results;
}

export function addResult(result) {
    const results = getResults();
    result.id = getNewID(results);
    results.push(result);
    localStorage.setItem('results', JSON.stringify(results));
}

function getNewID(results) {
    if (results.length > 0) {
        for (let i = 0; i <= results.length; i++) {
            if (results.find(x => x.id === i) === undefined) {
                return i;
            }
        }
    } else {
        return 0;
    }
}

export function removeResult(id) {
    const results = getResults().filter(obj => obj.id !== id);
    localStorage.setItem('results', JSON.stringify(results));
}