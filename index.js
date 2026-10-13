function calculateTotal(price, taxRate) {
    if (typeof price !== 'number' || isNaN(price) || price < 0) {
        throw new Error('Price must be a non-negative number');
    }
    if (typeof taxRate !== 'number' || isNaN(taxRate) || taxRate < 0) {
        throw new Error('Tax rate must be a non-negative number');
    }

    let tax = price * taxRate;
    let total = price + tax;
    return total;
}

let itemPrice = 100;
let taxPercent = 0.18;

let finalAmount = calculateTotal(itemPrice, taxPercent);

console.log("Final Amount:", finalAmount);