import FatigueStrength from "./object.js"
import * as UI from "./UI.js"
import * as Store from "./store.js"

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




// Event: Display
document.addEventListener('DOMContentLoaded', UI.displayResults);

// Event: Field changes
formAltStress.addEventListener('input', UI.altInputToggles);
formMeanStress.addEventListener('input', UI.meanInputToggles);
formRRatio.addEventListener('input', UI.rInputToggles);
formKt.addEventListener('input', UI.ktInputToggles);
formKt.addEventListener('change', UI.ktNotEmpty);
form.addEventListener('input', UI.otherEntryToggles);

// Event: Add
form.addEventListener('submit', (e) => {
    // prevent actual submit
    e.preventDefault();

    // validate
    if ([formAltStress.value, formMeanStress.value, formRRatio.value, formMaxStress.value].filter(p => p != "").length < 2) {
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