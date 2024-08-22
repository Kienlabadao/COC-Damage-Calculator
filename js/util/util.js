class Util {

    static round(num, decimalPlaces) {
        const roundNumber = 10 * decimalPlaces;
        return Math.round(num * roundNumber) / roundNumber;
    }

    static round2Places(num) {
        return Util.round(num, 2);
    }
}