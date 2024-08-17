const errorPage = '/html/error.html';

function round(num, decimalPlaces) {
    const roundNumber = 10 * decimalPlaces;
    return Math.round(num * roundNumber) / roundNumber;
}