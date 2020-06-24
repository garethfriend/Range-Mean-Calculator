export function getResults() {
    let results;
    if (localStorage.getItem('results') === null) {
        results = [];
    } else {
        results = JSON.parse(localStorage.getItem('results'));
    }
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
        for (let i = 0; i < results.length; i++) {
            if (results[i].id !== i) {
                return i;
            } else if (i === results.length - 1) {
                return results.length;
            }
        }
    } else {
        return 0;
    }
}

export function removeResult(id) {
    const results = getResults();
    for (let i = 0; i < results.length; i++) {
        console.log(results[i].id, id)
        if (results[i].id === id) {
            console.log(`deleting id ${results[i].id}`)
            results.splice(i, 1)
            break;
        }
    }
    localStorage.setItem('results', JSON.stringify(results));
}