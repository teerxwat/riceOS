export function formatNumber(value, { decimals = 0 } = {}) {
  return value.toLocaleString('th-TH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
