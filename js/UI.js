import {
    formAltStress,
    formMeanStress,
    formRRatio,
    formMaxStress,
    formKt,
    formPkPk,
    formPeakInFalse,
    formPeakInTrue,
    inputs
} from "./script.js";
import * as Store from "./store.js";

// Form elements
const list = document.getElementById('results-table');

export function displayResults() {
    const results = Store.getResults();
    results.forEach(result => addResultToList(result));
}

export function addResultToList(result) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${result.id}</td>
    <td>${result.altStress}</td>
    <td>${result.meanStress}</td>
    <td>${result.rRatio}</td>
    <td>${result.maxStress}</td>
    <td><a href="#" class="delete">Delete</a></td>`;
    list.appendChild(row);
}

// export function deleteResult(el) {
//     if (el.classList.contains('delete')) {
//         el.parentElement.parentElement.remove();
//     }
// }

export function deleteResult(el) {
    el.classList.contains('delete') && el.parentElement.parentElement.remove();
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
    inputs.forEach(input => {
        input.disabled = false;
        input.value = "";
    });
}

export function altInputToggles() {
    if (formAltStress.value != "") {
        formPkPk.disabled = false;
    } else {
        formPkPk.disabled = true;
        formPkPk.checked = false;
    }
}

export function ktInputToggles() {
    if (formKt.value == "" || formKt.value == 1) {
        formPeakInFalse.checked = true;
        formPeakInTrue.disabled = true;
        formPeakInFalse.disabled = true;
    } else {
        formPeakInTrue.disabled = false;
        formPeakInFalse.disabled = false;
    }
}

export function ktNotEmpty() {
    if (formKt.value == "") {
        formKt.value = 1;
    }
}

export function EntryToggles() {
    const count = inputs.filter(input => input.value != "").length;
    if (count === 2) {
        inputs.forEach(input => togglePairInput(input));
    } else if (count === 0) {
        inputs.forEach(input => input.disabled = false);
    } else {
        inputs.forEach(input => input.disabled = false);
        mutuallyExclusiveInputToggles(formMeanStress, formRRatio);
        mutuallyExclusiveInputToggles(formRRatio, formMeanStress);
    }

    function togglePairInput(input) {
        input.value == "" ? input.disabled = true : input.disabled = false
    }

    function mutuallyExclusiveInputToggles(input1, input2) {
        if (input1.value != "") {
            input2.value = "";
            input2.disabled = true;
        } else {
            input2.disabled = false;
        }

    }
}