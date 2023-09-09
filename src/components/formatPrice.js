const formatPrice = price => {
  return new Intl.NumberFormat('vi-VN', {
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(price);
};

export default formatPrice;
