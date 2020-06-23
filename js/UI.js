import { formAltStress, formMeanStress, formRRatio, formMaxStress, formKt, formPkPk, formPeakInFalse, formPeakInTrue } from "./script.js";
import * as Store from "./store.js";

export function displayResults() {
        const results = Store.getResults();
        results.forEach((result) => UI.addResultToList(result));
    }

export function addResultToList(result) {
        const list = document.querySelector('results-table');
        const row = document.createElement('tr');
        row.innerHTML = `<td>${result.altStress}</td><td>${result.meanStress}</td><td>${result.rRatio}</td><td>${result.maxStress}</td><td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);    
    }

export function deleteResult(el) {
        if(el.classlist.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

export function showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `enter a class name here ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('x');
        const form = document.querySelector('x');
        container.insertBefore(div, form);
        // vanish in 3 seconds
        setTimeout(() => document.querySelector('x').remove(), 3000);
    }

export function clearFields() {
        formAltStress.value = "";
        formMeanStress.value = "";
        formRRatio.value = "";
        formMaxStress.value = "";
    }

export function altInputToggles() {
        if (formAltStress.value != "") {
            formPkPk.disabled = false;
        } else {
            formPkPk.disabled = true;
            formPkPk.checked = false;
        }
    }

// export function mutuallyExclusiveInputToggles(input1, input2) {
//     console.log('evaluating...')    
//     if (input1.value != "") {
//             console.log('true')
//             input2.value = "";
//             input2.disabled = true;
//         } else {
//             console.log('false')
//             input2.disabled = false;
//         }
//     }


    export function rInputToggles() {
        if (formRRatio.value != "") {
            formMeanStress.value = "";
            formMeanStress.disabled = true;
        } else {
            formMeanStress.disabled = false;
        }
    }
    
    export function meanInputToggles() {
        if (formMeanStress.value != "") {
            formRRatio.value = "";
            formRRatio.disabled = true;
        } else {
            formRRatio.disabled = false;
        }
    }

export function ktInputToggles() {
        if(formKt.value == "" || formKt.value == 1) {
            // formKt.value = 1;
            formPeakInFalse.checked = true;
            formPeakInTrue.disabled = true;
            formPeakInFalse.disabled = true;
        } else {
            formPeakInTrue.disabled = false;
            formPeakInFalse.disabled = false;
        } 
    }

export function ktNotEmpty() {
    if(formKt.value == "") {
        formKt.value = 1;
    }
}

export function otherEntryToggles() {
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