export const formatDifferenceInDays = (expireDate: Date) => {
  const currentDate: Date = new Date();
  const differenceInTime = expireDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};
