// Theme toggle
document.addEventListener('DOMContentLoaded', () => {
  const switchToggle = document.getElementById('themeSwitch');
  const isLight = localStorage.getItem('theme') === 'light';

  if (isLight) {
    document.body.classList.add('light');
    switchToggle.checked = true;
  }

  switchToggle.addEventListener('change', () => {
    document.body.classList.toggle('light');
    const theme = document.body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
  });
});

// Converter functions (must be global!)

window.convertLength = function () {
  const value = parseFloat(document.getElementById('lengthValue').value);
  const from = document.getElementById('lengthFrom').value;
  const to = document.getElementById('lengthTo').value;
  const output = document.getElementById('lengthOutput');

  const units = { m: 1, ft: 3.28084, in: 39.3701 };
  const converted = (value / units[from]) * units[to];
  output.value = converted.toFixed(2);
};

window.convertTemperature = function () {
  const value = parseFloat(document.getElementById('tempValue').value);
  const from = document.getElementById('tempFrom').value;
  const to = document.getElementById('tempTo').value;
  const output = document.getElementById('tempOutput');

  let result;
  if (from === to) result = value;
  else if (from === 'C') result = to === 'F' ? value * 9 / 5 + 32 : value + 273.15;
  else if (from === 'F') result = to === 'C' ? (value - 32) * 5 / 9 : (value - 32) * 5 / 9 + 273.15;
  else if (from === 'K') result = to === 'C' ? value - 273.15 : (value - 273.15) * 9 / 5 + 32;

  output.value = result.toFixed(2);
};

window.convertWeight = function () {
  const value = parseFloat(document.getElementById('weightValue').value);
  const from = document.getElementById('weightFrom').value;
  const to = document.getElementById('weightTo').value;
  const output = document.getElementById('weightOutput');

  const units = { kg: 1, lb: 2.20462, g: 1000 };
  const converted = (value / units[from]) * units[to];
  output.value = converted.toFixed(2);
};

window.convertTime = function () {
  const value = parseFloat(document.getElementById('timeValue').value);
  const from = document.getElementById('timeFrom').value;
  const to = document.getElementById('timeTo').value;
  const output = document.getElementById('timeOutput');

  const toSeconds = { hours: 3600, minutes: 60, seconds: 1 };
  const inSeconds = value * toSeconds[from];
  const converted = inSeconds / toSeconds[to];
  output.value = converted.toFixed(2);
};

function convertCurrency() {
  const amount = document.getElementById('currencyAmount')?.value;
  const from = document.getElementById('currencyFrom')?.value;
  const to = document.getElementById('currencyTo')?.value;
  const output = document.getElementById('currencyOutput');

  if (!amount || !from || !to) {
    output.value = 'Please enter valid input';
    return;
  }

  fetch(`http://localhost:5000/api/convert-currency?from=${from}&to=${to}&amount=${amount}`)
    .then(res => res.json())
    .then(data => {
      if (data.result !== undefined) {
        output.value = data.result.toFixed(2);
      } else {
        output.value = 'Conversion failed';
      }
    })
    .catch(err => {
      console.error('Currency conversion error:', err);
      output.value = 'Error';
    });
}


