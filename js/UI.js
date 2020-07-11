import {
    formAltStress,
    formMeanStress,
    formRRatio,
    formKt,
    formPkPk,
    formPeakInFalse,
    formPeakInTrue,
    formPeakOutFalse,
    formPeakOutTrue,
    inputs,
    resultsList
} from "./script.js";
import * as Store from "./store.js";


export function displayResults() {
    const results = Store.getResults();
    results.forEach(result => addResultToList(result));
}

export function addResultToList(result) {
    const row = document.createElement('tr');
    row.innerHTML = `<td><a href="#waveform" class="result-id">${result.id}</a></td>
    <td>${result.altStress}</td>
    <td>${result.meanStress}</td>
    <td>${result.rRatio}</td>
    <td>${result.maxStress}</td>
    <td><a href="#waveform" class="delete">Delete</a></td>`;
    resultsList.appendChild(row);
}

export const deleteResult = (el) => el.parentElement.parentElement.remove();

export function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `info-${className}`;
    div.appendChild(document.createTextNode(message));
    // const container = document.getElementById('info-window');
    // const form = document.getElementById('app');
    // container.insertBefore(div, form);
    // // vanish in 3 seconds
    // setTimeout(() => document.querySelector('x').remove(), 3000);
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
    const ktRadios = [formPeakInFalse, formPeakInTrue, formPeakOutFalse, formPeakOutTrue];
    if (formKt.value == "" || formKt.value == 1) {
        formPeakInFalse.checked = true;
        formPeakOutFalse.checked = true;
        ktRadios.forEach(input => input.disabled = true);       
    } else {
        ktRadios.forEach(input => input.disabled = false);
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
        input.value == "" ? input.disabled = true : input.disabled = false;
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