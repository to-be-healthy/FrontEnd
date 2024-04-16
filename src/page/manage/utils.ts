const profileBorderStyleMapper = (ranking: number) => {
  const defaultStyle = 'rounded-full';
  if (ranking === 1) return defaultStyle + ' border-[2px] border-[#FFB950]';
  if (ranking === 2) return defaultStyle + ' border-[2px] border-[#C4C5CD]';
  if (ranking === 3) return defaultStyle + ' border-[2px] border-[#FFB58B]';
  return defaultStyle;
};

export { profileBorderStyleMapper };
