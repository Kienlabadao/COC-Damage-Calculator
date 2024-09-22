class NumberUtil {

    // Store useful util function for number

    // Round number up to n decimal places
    static round(number, decimalPlaces) {
        if (NumberUtil.isNumber(number) && NumberUtil.isNumber(decimalPlaces)) {
            return parseFloat((number).toFixed(decimalPlaces));
        } else {
            if (!NumberUtil.isNumber(number)) {
                throw new TypeError(`Invalid number: ${number}`);
            } else {
                throw new TypeError(`Invalid number: ${decimalPlaces}`);
            }
        }        
    }

    // Round number up to 2 decimal places
    // All number in this website is rounded up to 2 decimal places
    static round2Places(number) {
        return NumberUtil.round(number, 2);
    }

    // Check if item is number type
    static isNumber(number) {
        return typeof number === "number" && !isNaN(number);
    }
}