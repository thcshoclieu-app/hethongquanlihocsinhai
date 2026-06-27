export const formatName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`.trim();
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
