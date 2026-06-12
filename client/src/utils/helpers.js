export const formatPrice = (price) => {
  if (price === undefined || price === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str, num = 80) => {
  if (!str) return '';
  if (str.length <= num) return str;
  return str.slice(0, num) + '...';
};
