export default class FatigueStrength {
    constructor(tempAltStress = null, tempMeanStress = null, tempRRatio = null, tempMaxStress = null, _peakIn = false, _kt = 1, _halfPkPk = true) {
        // I want the constructor to simply add these first couple as properties
        // I started using _ to differentiate between the property and the passed value but then had to swap it around 
        this.peakIn = _peakIn;
        this.kt = _kt;
        this.halfPkPk = _halfPkPk;

        // this ensures that regardless of how it is inputted half-waveform amplitude is what is stored
        if (!this.halfPkPk && Number.isFinite(tempAltStress)) {
            tempAltStress /= 2;
        }

        // main calculation
        [this.altStress,
            this.meanStress,
            this.rRatio,
            this.maxStress
        ] = this.CalculateStresses(tempAltStress, tempMeanStress, tempRRatio, tempMaxStress);
    }

    // METHODS
    CalculateStresses(alt, mean, r, max) {
        // Throws an error if more or less than two values are passed or tempMeanStress and tempRRatio are the pair because it is an 
        // unsolvable combination. 
        if (this._CountNumbers(alt, mean, r, max) === 2 && !(Number.isFinite(mean) && Number.isFinite(r))) {
            // For a given pair if both are numbers use thier functions, if neither are numbers use the oppsoite pairs 
            // functions, after two rounds only one valid pair remains.
            console.log(`Alt: ${alt} Mean: ${mean} R: ${r} Max: ${max}`);
            if (this._CountNumbers(alt, mean) === 2) {
                r = this._RFromMeanAlt(mean, alt);
                max = this._MaxFromAltMean(alt, mean);
            } else if (this._CountNumbers(alt, mean) === 0) {
                alt = this._AltFromMaxR(max, r);
                mean = this._MeanFromMaxAlt(max, alt);
            } else if (this._CountNumbers(mean, max) === 2) {
                alt = this._AltFromMaxMean(max, mean);
                r = this._RFromMeanAlt(mean, alt);
            } else if (this._CountNumbers(mean, max) === 0) {
                max = this._MaxFromAltR(alt, r);
                mean = this._MeanFromMaxR(max, r);
            } else {
                r = this._RFromAltMax(alt, max);
                mean = this._MeanFromMaxR(max, r);
            }

            console.log(`Output: Alt: ${alt} Mean: ${mean} R: ${r} Max: ${max}`);
            return [alt, mean, r, max].map(num => this._RoundFloatingPoint(num, 3));
        } else {
            throw 'you must pass exactly two parameters which are not meanStress and rRatio';
        }

    }

    // maths functions that the above re-uses in different combinations
    _RFromMeanAlt(mean, alt) {
        return (mean - alt) / (mean + alt);
    }

    _MeanFromMaxR(max, r) {
        return max * (1 + r) / 2;
    }

    _AltFromMaxR(max, r) {
        return max * (1 - r) / 2;
    }

    _RFromAltMax(alt, max) {
        return 1 - ((2 * alt) / max);
    }

    _MaxFromAltR(alt, r) {
        return (2 * alt) / (1 - r);
    }

    _AltFromMaxMean(max, mean) {
        return max - mean;
    }

    _MeanFromMaxAlt(max, alt) {
        return max - alt;
    }

    _MaxFromAltMean(alt, mean) {
        return alt + mean;
    }

    _RoundFloatingPoint(number, places) {
        const multiplier = Math.pow(10, places);
        return Math.round((number + Number.EPSILON) * multiplier) / multiplier;
    }

    _CountNumbers(paramA, paramB, paramC = null, paramD = null) {
        return [paramA, paramB, paramC, paramD].filter(p => Number.isFinite(p)).length;
    }
    // methods used for scaling alt stress and recalculating others, percent given as decimal. Could use calculate function 
    // again but more computationally efficient not to go through if statements again as we know which pair is being passed
    // and we don't need all the cases.

    // used to apply saftey factors to R-M diagrams i.e. 50% on alternating stress for a given mean value
    ScaleAltFixMean(scalingFactor) {
        this.altStress *= scalingFactor;
        this.rRatio = this._RFromMeanAlt(this.meanStress, this.altStress);
        this.maxStress = this._MaxFromAltMean(this.altStress, this.meanStress);
    }

    // used to translate factors of alternating stress into new max stresses for a given R ratio i.e. locking R ratio rather 
    // than mean.  
    ScaleAltFixR(scalingFactor) {
        this.altStress *= scalingFactor;
        this.maxStress = this._MaxFromAltR(this.altStress, this.rRatio);
        this.meanStress = this._MeanFromMaxR(this.maxStress, this.rRatio);
    }

    // used to translate differences in test conditions i.e. Max + R pairs into alt-mean space
    ScaleMaxFixR(scalingFactor) {
        this.maxStress *= scalingFactor;
        this.altStress = this._AltFromMaxR(this.maxStress, this.rRatio);
        this.meanStress = this._MeanFromMaxAlt(this.maxStress, this.altStress);
    }

    // might be some use cases, provided for completeness
    ScaleMeanFixAlt(scalingFactor) {
        this.meanStress *= scalingFactor;
        this.rRatio = this._RFromMeanAlt(this.meanStress, this.altStress);
        this.maxStress = this._MaxFromAltMean(this.altStress, this.meanStress);
    }

    // GETTERS 
    get altStress_pkpk() {
        return this.altStress * 2;
    }

}