
function generateRandomeNumber() {
    const numbers = [1,2,3,4,5,6,7];
    const randKey = Math.floor(Math.random() * (numbers.length-1));
    return numbers[randKey];
}

module.exports = generateRandomeNumber;