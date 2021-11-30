import validateUtility from '../../utilities/validate';

describe('Validate Utility Tests', () => {
  describe('isNumeric Function Tests', () => {
    it('Value "1234" is numeric', async () => {
      expect(validateUtility.isNumeric('1234')).toEqual(true);
    });

    it('Value "12X34" is not numeric', async () => {
      expect(validateUtility.isNumeric('12X34')).toEqual(false);
    });
  });
});