function calculateTotal(price, taxRate) {
    let tax = price * taxRate;
    let total = price + tax;
    return total;
}

let itemPrice = 100;
let taxPercent = 0.18;

let finalAmount = calculateTotal(itemPrice, taxPercent);

console.log("Final Amount:", finalAmount);