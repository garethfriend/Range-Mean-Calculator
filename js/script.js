import FatigueStrength from "./object.js"
// window.FatigueStrength = FatigueStrength;
// let F1 = new FatigueStrength(250, 0, null, null); // should return R = -1 and max = 250
// console.log(F1)
// // let F2 = new FatigueStrength(null, 200, 0.1, null); // should not be possible
// // console.log(F2)
// let F3 = new FatigueStrength(null, null, 0.1, 300); // should be alt = 135 and mean = 165
// console.log(F3)
// let F4 = new FatigueStrength(250, null, null, 300); // should be a negative R and mean = 50
// console.log(F4)
// let F5 = new FatigueStrength(100, null, 0.1, null); 
// console.log(F5)
// let F6 = new FatigueStrength(200, null, 0.1, null, true, 1, false); 
// console.log(F6)
// let F7 = new FatigueStrength(null, 150, null, 300); // should be alt = 150 and R = 0
// console.log(F7)
// let F8 = new FatigueStrength(null, 300, null, 600, true, 2); // should be alt = 150 and R = 0
// console.log(F8)

// UI class: Handle UI tasks
class UI {
    static displayResults() {
        const results = Store.getResults();
        Results.forEach((result) => UI.addResultToList(result));
    }

    static addResultToList(result) {
        const list = document.querySelector('results-table'));
        const row = document.createElement('tr');
        row.innerHTML = '<td>${result.altStress}</td><td>${result.meanStress}</td><td>${result.rRatio}</td><td>${result.maxStress}</td><td><a href="#" class="delete">X</a></td>';
        list.appendChild(row);    
    }
    static deleteResult(el) {
        if(el.classlist.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `enter a class name here ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('x');
        const form = document.querySelector('x');
        container.insertBefore(div, form);
        // vanish in 3 seconds
        setTimeout(() => document.querySelector('x').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('x').value = '';
    }

}

//  Store Class: Handle Storage
class Store {
    static getResults() {
        let results;
        if(localStorage.getItem('results') === null) {
            results = [];
        } else {
            results = JSON.parse(localStorage.getItem('results'));
        }
        return results;
    }
    static addResult(result) {
        const results = Store.getResults();
        results.push(result);
        localStorage.setItem('results', JSON.stringify(results));
    }
    static removeResult(id) {
        const results = Store.getResults();
        results.forEach((result, index) => {
            if (result.id === id) {
                results.splice(index, 1);
            }
        });    
        localStorage.setItem('results', JSON.stringify(results));
    }
}

// Event: Display
document.addEventListener('DOMContentLoaded', UI.displayResults);

// Event: Add
document.querySelector('app').addEventListener('submit', (e) => {
    // prevent actual submit
    e.preventDefault();
    
    // get form values
    const x = document.querySelector('x').value;
    const x = document.querySelector('x').value;
    const x = document.querySelector('x').value;
    const x = document.querySelector('x').value;
    const x = document.querySelector('x').value;
    const x = document.querySelector('x').value;
    const x = document.querySelector('x').value;

    // validate
    if (validation) {
        UI.showAlert('message', 'class');
    } else {

        // instantiate result
        const result = new FatigueStrength(alt, mean, r, max, peak, kt, pkpk);

        // add result to UI
        UI.addResultToList(result);

        // add result to store
        Store.addResult(result);
    }


});

// Event: remove
document.querySelector('x-list').addEventListener('click', (e) => {
    // remove from UI
    UI.deleteResult(e.target);

    // remove from store
    Store.removeResult(e.target.parentElement.previousElementSibling.textContent);
});