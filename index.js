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
        totalAmount: total
    };
}

let bill = generateBillBreakdown(100, 0.18, 0.10);
console.log("Bill Breakdown:", bill);
console.log("Total Payable:", formatCurrency(bill.totalAmount));