import FatigueStrength from "./object.js";
import * as UI from "./UI.js";
import * as Store from "./store.js";
import * as Chart from "./charts.js";

// Get form elements
export const form = document.getElementById('app');
export const formAltStress = document.getElementById('altStressInput');
export const formMeanStress = document.getElementById('meanStressInput');
export const formRRatio = document.getElementById('rRatioInput');
export const formMaxStress = document.getElementById('maxStressInput');
export const formKt = document.getElementById('ktInput');
export const formPkPk = document.getElementById('pkpk');
export const formPeakIn = document.getElementsByName('peakIn');
export const formPeakInFalse = document.getElementById('peakInFalse');
export const formPeakInTrue = document.getElementById('peakInTrue');
export const calcButton = document.getElementById('calcbutton');
export const inputs = [formAltStress, formMeanStress, formRRatio, formMaxStress];

// Event: Display
document.addEventListener('DOMContentLoaded', UI.displayResults);

// Event: Field changes
formAltStress.addEventListener('input', UI.altInputToggles);
form.addEventListener('input', UI.EntryToggles);
formKt.addEventListener('input', UI.ktInputToggles);
formKt.addEventListener('change', UI.ktNotEmpty);

// Event: Add
form.addEventListener('submit', (e) => {
    // prevent actual submit
    e.preventDefault();

    // validate
    if (inputs.filter(input => input.value != "").length < 2) {
        UI.showAlert('Two values are required for the calculation', 'class'); // throw error if not enough fields are complete
    } else {

        const result = new FatigueStrength(
            parseFloat(formAltStress.value),
            parseFloat(formMeanStress.value),
            parseFloat(formRRatio.value),
            parseFloat(formMaxStress.value),
            formPeakIn[1].checked,
            parseFloat(formKt.value),
            !formPkPk.checked
        );
        console.log(result);

        // plot result
        Chart.updateWaveform(result.altStress, result.meanStress);

        // add result to store
        Store.addResult(result);

        // add result to UI
        UI.addResultToList(result);

        UI.clearFields();
    }

});

// Event: remove
document.getElementById('results-table').addEventListener('click', (e) => {
   
    if(e.target.classList.contains('delete')) {
        // remove from UI
        UI.deleteResult(e.target);
        // remove from store
        Store.removeResult(parseInt(e.target.parentElement.parentElement.firstElementChild.textContent));
    } else if (e.target.classList.contains('result-id')) {
        // get the stored object by id
        let resultToPLot = Store.selectResult(parseInt(e.target.textContent));
        // update the waveform graph with the objects properties
        Chart.updateWaveform(resultToPLot.altStress, resultToPLot.meanStress);
    }
    
});