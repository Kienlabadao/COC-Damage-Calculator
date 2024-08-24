class NumberUtil {

    // Store useful util function for number

    // Round number up to n decimal places
    static round(number, decimalPlaces) {
        const roundNumber = 10 * decimalPlaces;
        return Math.round(number * roundNumber) / roundNumber;
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