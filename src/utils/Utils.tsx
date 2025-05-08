export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatMoney = (amount: number) => {
  return amount.toLocaleString("vi-VN").replace(/,/g, ".") + "VNĐ";
}

export const removeVietnameseTones = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

export const formatCoordinate = (value: string, isLongitude: boolean): string => {
  if (!value) return "";
  let num = parseFloat(value);
  if (isNaN(num)) return "";

  // Longitude: max 3 integer digits, Latitude: max 2 integer digits
  const maxIntegerDigits = isLongitude ? 3 : 2;

  // Ensure correct number formatting
  const [integerPart, decimalPart = ""] = num.toFixed(6).split(".");

  if (integerPart.length > maxIntegerDigits) {
    return ""; // Invalid number, exceeds max integer digits
  }

  return `${integerPart}.${decimalPart}`;
};
