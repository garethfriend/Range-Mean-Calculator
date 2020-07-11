import FatigueStrength from "./object.js";
import * as UI from "./UI.js";
import * as Store from "./store.js";
import * as Chart from "./waveformchart.js";

// Get form elements
export const form = document.getElementById('app');
// stress inputs
export const formAltStress = document.getElementById('altStressInput');
export const formMeanStress = document.getElementById('meanStressInput');
export const formRRatio = document.getElementById('rRatioInput');
export const formMaxStress = document.getElementById('maxStressInput');
// inputs array
export const inputs = [formAltStress, formMeanStress, formRRatio, formMaxStress];
// kt related inputs
export const formKt = document.getElementById('ktInput');
export const formPkPk = document.getElementById('pkpk');
export const formPeakIn = document.getElementsByName('peakIn');
export const formPeakInFalse = document.getElementById('peakInFalse');
export const formPeakInTrue = document.getElementById('peakInTrue');
export const formPeakOut = document.getElementsByName('peakOut');
export const formPeakOutFalse = document.getElementById('peakOutFalse');
export const formPeakOutTrue = document.getElementById('peakOutTrue');
// form controls
export const calcButton = document.getElementById('calcbutton');
// results list
export const resultsList = document.getElementById('results-table');



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
        UI.showAlert('Two values are required for the calculation', 'class'); // TO DO - throw error if not enough fields are complete
    } else {
        // create the result object
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
        
        // clear ready for next input
        UI.clearFields();
    }

});

// Event: remove
resultsList.addEventListener('click', (e) => {
   
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