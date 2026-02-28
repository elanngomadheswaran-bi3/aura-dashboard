/**
 * Format a number as currency with appropriate units (K, M, B)
 * Examples: 1000 -> $1K, 1500000 -> $1.5M, 1500000000 -> $1.5B
 */
export const formatCurrency = (value: number): string => {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  } else {
    return `$${value.toFixed(0)}`;
  }
};

/**
 * Format a number as currency without the $ symbol
 */
export const formatCurrencyValue = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  } else {
    return `${value.toFixed(0)}`;
  }
};
