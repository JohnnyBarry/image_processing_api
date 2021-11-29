const isNumeric = (value: string): boolean => {
  return !new RegExp(/[^\d]/g).test(value.trim());
};

export default { isNumeric };
