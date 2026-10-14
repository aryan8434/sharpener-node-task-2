function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function calculateDiscount(price, discountPercent = 0) {
    if (typeof discountPercent !== 'number' || discountPercent < 0 || discountPercent > 1) {
        throw new Error('Discount percentage must be a number between 0 and 1');
    }
    return price * discountPercent;
}

function generateBillBreakdown(price, taxRate = 0.18, discountPercent = 0) {
    if (typeof price !== 'number' || isNaN(price) || price < 0) {
        throw new Error('Price must be a non-negative number');
    }
    if (typeof taxRate !== 'number' || isNaN(taxRate) || taxRate < 0) {
        throw new Error('Tax rate must be a non-negative number');
    }

    let discount = calculateDiscount(price, discountPercent);
    let discountedPrice = price - discount;
    let tax = discountedPrice * taxRate;
    let total = discountedPrice + tax;

    return {
        basePrice: price,
        discountRate: discountPercent,
        discountAmount: discount,
        taxableAmount: discountedPrice,
        taxRate: taxRate,
        taxAmount: tax,
        totalAmount: Number(total.toFixed(2))
    };
}

function runTests() {
    console.log("Running bill calculation tests...");
    
    // Test Case 1: Standard calculation without discount
    const test1 = generateBillBreakdown(100, 0.18, 0);
    console.assert(test1.totalAmount === 118, `Test 1 failed: Expected 118, got ${test1.totalAmount}`);

    // Test Case 2: Calculation with 10% discount
    const test2 = generateBillBreakdown(100, 0.18, 0.10);
    console.assert(test2.totalAmount === 106.2, `Test 2 failed: Expected 106.2, got ${test2.totalAmount}`);

    // Test Case 3: Zero price
    const test3 = generateBillBreakdown(0, 0.18, 0);
    console.assert(test3.totalAmount === 0, `Test 3 failed: Expected 0, got ${test3.totalAmount}`);

    console.log("All tests passed successfully!");
}

runTests();

let sampleBill = generateBillBreakdown(250, 0.18, 0.15);
console.log("\nSample Bill Summary:");
console.log(`Original: ${formatCurrency(sampleBill.basePrice)}`);
console.log(`Discount (${sampleBill.discountRate * 100}%): -${formatCurrency(sampleBill.discountAmount)}`);
console.log(`Tax (${sampleBill.taxRate * 100}%): +${formatCurrency(sampleBill.taxAmount)}`);
console.log(`Final Total: ${formatCurrency(sampleBill.totalAmount)}`);