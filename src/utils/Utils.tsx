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