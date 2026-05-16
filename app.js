// Historical exchange rates database (mock data for demonstration)
// In production, this would connect to an API like OANDA or XE.com
const historicalRates = {
‘USD-EUR’: {
‘2024-01-01’: 0.925,
‘2023-01-01’: 0.920,
‘2022-01-01’: 0.883,
‘2021-01-01’: 0.823,
‘2020-01-01’: 0.893,
‘2019-01-01’: 0.872,
‘2015-01-01’: 0.920,
‘2010-01-01’: 0.681,
‘2005-01-01’: 0.847
},
‘USD-GBP’: {
‘2024-01-01’: 0.795,
‘2023-01-01’: 0.805,
‘2022-01-01’: 0.741,
‘2021-01-01’: 0.731,
‘2020-01-01’: 0.771,
‘2019-01-01’: 0.779,
‘2015-01-01’: 0.680,
‘2010-01-01’: 0.629,
‘2005-01-01’: 0.580
},
‘USD-JPY’: {
‘2024-01-01’: 150.5,
‘2023-01-01’: 130.8,
‘2022-01-01’: 115.6,
‘2021-01-01’: 102.9,
‘2020-01-01’: 109.1,
‘2019-01-01’: 108.6,
‘2015-01-01’: 119.1,
‘2010-01-01’: 93.6,
‘2005-01-01’: 117.6
},
‘USD-CAD’: {
‘2024-01-01’: 1.322,
‘2023-01-01’: 1.352,
‘2022-01-01’: 1.276,
‘2021-01-01’: 1.267,
‘2020-01-01’: 1.315,
‘2019-01-01’: 1.326,
‘2015-01-01’: 1.383,
‘2010-01-01’: 1.048,
‘2005-01-01’: 1.212
},
‘USD-AUD’: {
‘2024-01-01’: 1.507,
‘2023-01-01’: 1.359,
‘2022-01-01’: 1.378,
‘2021-01-01’: 1.325,
‘2020-01-01’: 1.451,
‘2019-01-01’: 1.353,
‘2015-01-01’: 1.359,
‘2010-01-01’: 1.123,
‘2005-01-01’: 1.310
}
};

function convertCurrency() {
const amount = parseFloat(document.getElementById(‘amount’).value) || 0;
const fromCurrency = document.getElementById(‘fromCurrency’).value;
const toCurrency = document.getElementById(‘toCurrency’).value;
const dateInput = document.getElementById(‘conversionDate’).value;


if (!amount || !dateInput) {
    return;
}

// Get rate (simplified - in production would call API)
const rate = getHistoricalRate(fromCurrency, toCurrency, dateInput);
const convertedAmount = amount * rate;

// Display results
document.getElementById('displayAmount').textContent = amount.toFixed(2);
document.getElementById('displayFromCurrency').textContent = fromCurrency;
document.getElementById('displayAmount2').textContent = convertedAmount.toFixed(2);
document.getElementById('displayToCurrency').textContent = toCurrency;
document.getElementById('exchangeRate').textContent = rate.toFixed(4);
document.getElementById('rateDate').textContent = formatDate(dateInput);

document.getElementById('converterResults').style.display = 'block';
document.getElementById('converterResults').scrollIntoView({ behavior: 'smooth', block: 'nearest' });


}

function getHistoricalRate(from, to, dateStr) {
// Normalize to USD as base
const date = dateStr.substring(0, 10); // YYYY-MM-DD
const pairKey = `${from}-${to}`;
const reversePairKey = `${to}-${from}`;


// Try direct pair
if (historicalRates[pairKey] && historicalRates[pairKey][date]) {
    return historicalRates[pairKey][date];
}

// Try reverse pair
if (historicalRates[reversePairKey] && historicalRates[reversePairKey][date]) {
    return 1 / historicalRates[reversePairKey][date];
}

// Try through USD
const usdFromKey = `USD-${from}`;
const usdToKey = `USD-${to}`;

if (historicalRates[usdFromKey] && historicalRates[usdToKey]) {
    const fromRate = historicalRates[usdFromKey][date] || 1;
    const toRate = historicalRates[usdToKey][date] || 1;
    return toRate / fromRate;
}

// Generate reasonable rate based on currency pair
return generateRate(from, to);


}

function generateRate(from, to) {
// Generate realistic rates for demonstration
const rates = {
‘EUR’: 1.1, ‘GBP’: 1.27, ‘JPY’: 0.0067, ‘CAD’: 0.757,
‘AUD’: 0.664, ‘CHF’: 1.10, ‘CNY’: 0.14, ‘INR’: 0.012, ‘MXN’: 0.058
};


const fromRate = rates[from] || 1;
const toRate = rates[to] || 1;
return toRate / fromRate;


}

function setHistoricalDate(yearsAgo) {
const date = new Date();
date.setFullYear(date.getFullYear() - yearsAgo);
const dateStr = date.toISOString().split(‘T’)[0];
document.getElementById(‘conversionDate’).value = dateStr;
convertCurrency();
}

function formatDate(dateStr) {
const options = { year: ‘numeric’, month: ‘long’, day: ‘numeric’ };
return new Date(dateStr + ‘T00:00:00’).toLocaleDateString(‘en-US’, options);
}

// Set today as default date
document.addEventListener(‘DOMContentLoaded’, function() {
const today = new Date().toISOString().split(‘T’)[0];
document.getElementById(‘conversionDate’).value = today;


// Enter key support
const inputs = document.querySelectorAll('.converter-inputs input, .converter-inputs select');
inputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertCurrency();
        }
    });
});

convertCurrency();


});