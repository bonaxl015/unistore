const CURRENCY_FORMATTER = new Intl.NumberFormat('en-PH', {
  currency: 'PHP',
  style: 'currency',
  minimumFractionDigits: 2
});

export function formatCurrency(amount: number | string | null) {
  if (typeof amount === 'number') {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return 'NaN';
  }
}
