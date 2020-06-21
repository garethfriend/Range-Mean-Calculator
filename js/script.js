import FatigueStrength from "./object.js"

// Get form elements
const form = document.getElementById('app');
const formAltStress = document.getElementById('altStressInput');
const formMeanStress = document.getElementById('meanStressInput');
const formRRatio = document.getElementById('rRatioInput');
const formMaxStress = document.getElementById('maxStressInput');
const formKt = document.getElementById('ktInput');
const formPkPk = document.getElementById('pkpk');
const formPeakInFalse = document.getElementById('peakInFalse');
const formPeakInTrue = document.getElementById('peakInTrue');

// UI class: Handle UI tasks
class UI {
    static displayResults() {
        const results = Store.getResults();
        results.forEach((result) => UI.addResultToList(result));
    }

    static addResultToList(result) {
        const list = document.querySelector('results-table');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.altStress}</td><td>${result.meanStress}</td><td>${result.rRatio}</td><td>${result.maxStress}</td><td><a href="#" class="delete">X</a></td>`;
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
        formAltStress.value = "";
        formMeanStress.value = "";
        formRRatio.value = "";
        formMaxStress.value = "";
    }

    static altInputToggles() {
        if (formAltStress.value != "") {
            formPkPk.disabled = false;
        } else {
            formPkPk.disabled = true;
            formPkPk.checked = false;
        }
    }
    
    static rInputToggles() {
        if (formRRatio.value != "") {
            formMeanStress.value = "";
            formMeanStress.disabled = true;
        } else {
            formMeanStress.disabled = false;
        }
    }
    
    static meanInputToggles() {
        if (formMeanStress.value != "") {
            formRRatio.value = "";
            formRRatio.disabled = true;
        } else {
            formRRatio.disabled = false;
        }
    }

    static ktInputToggles() {
        if(formKt.value == "" || formKt.value == 1) {
            formKt.value = 1;
            formPeakInFalse.checked = true;
            formPeakInTrue.disabled = true;
            formPeakInFalse.disabled = true;
        } else {
            formPeakInTrue.disabled = false;
            formPeakInFalse.disabled = false;
        } 
    }

    static stressEntryToggles() {
        const inputs = [formAltStress.value, formMeanStress.value, formRRatio.value, formMaxStress.value]
        const count = inputs.filter(p => p != "").length;
        if (count === 2) {
            togglePairInput(formAltStress); 
            togglePairInput(formMaxStress);     
        } else if (count === 1) {
            formAltStress.disabled = false
            formMaxStress.disabled = false
        }

        function togglePairInput(input) {
            if (input.value == "") {
                input.disabled = true
            } else {
                input.disabled = false
            }
        }
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

// Event: Field changes
formAltStress.addEventListener('change', UI.altInputToggles);
formMeanStress.addEventListener('change', UI.meanInputToggles);
formRRatio.addEventListener('change', UI.rInputToggles);
formKt.addEventListener('change', UI.ktInputToggles);
form.addEventListener('change', UI.stressEntryToggles);

// Event: Add
form.addEventListener('submit', (e) => {
    // prevent actual submit
    e.preventDefault();
    

    // validate
    if (validation) {
        UI.showAlert('message', 'class'); // throw error if not enough fields are complete
    } else {

        // instantiate result
        console.log(formAltStress.value, formMeanStress.value, formRRatio.value, formMaxStress.value, formPeakIn.value, formKt.value, formPkPk.value)
        const result = new FatigueStrength(formAltStress.value, formMeanStress.value, formRRatio.value, formMaxStress.value, formPeakIn.value, formKt.value, formPkPk.value);

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