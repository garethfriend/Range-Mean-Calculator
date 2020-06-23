export function getResults() {
        let results;
        if(localStorage.getItem('results') === null) {
            results = [];
        } else {
            results = JSON.parse(localStorage.getItem('results'));
        }
        return results;
}

export function addResult(result) {
        const results = getResults();
        results.push(result);
        localStorage.setItem('results', JSON.stringify(results));
}

export function removeResult(id) {
        const results = getResults();
        results.forEach((result, index) => {
            if (result.id === id) {
                results.splice(index, 1);
            }
        });    
        localStorage.setItem('results', JSON.stringify(results));
}
