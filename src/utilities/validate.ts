/**
 * @function : isNumeric
 * @description: Tests if a string value is numeric
 * @param: value: The string to test
 * @returns: A boolean: true if the string is numberic otherwise false.
 */
const isNumeric = (value: string): boolean => {
  return !new RegExp(/[^\d]/g).test(value.trim());
};

export default { isNumeric };
