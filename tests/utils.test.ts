import { isObjectWithKeys } from '../src/utils';

test('Should return false', () => {
  expect(isObjectWithKeys({})).toBe(false);
});
