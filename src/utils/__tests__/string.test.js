import {
  trimFirstChar, trimLastChar, trimEdges, formatAmount, trimLowerCase
} from '../string';

const testString = '/Hi/Repos/';
it('should trim the first character in the string', () => {
  expect(trimFirstChar(testString)).toBe('Hi/Repos/');
});

it('should trim the last character in the string', () => {
  expect(trimLastChar(testString)).toBe('/Hi/Repos');
});

it('should trim the edge characters in the string', () => {
  expect(trimEdges(testString)).toBe('Hi/Repos');
});

it('should trim and convert string into lower case', () => {
  expect(trimLowerCase(testString)).toBe('/hi/repos/');
});

test.each([null, undefined, ''])(
  'trimFirstChar should return empty for null undefined and empty',
  arg => {
    expect(trimFirstChar(arg)).toEqual('');
  }
);

test.each([null, undefined, ''])(
  'trimLastChar should return empty for null undefined and empty',
  arg => {
    expect(trimLastChar(arg)).toEqual('');
  }
);

test.each([null, undefined, ''])(
  'trimEdges should return empty for null undefined and empty',
  arg => {
    expect(trimEdges(arg)).toEqual('');
  }
);

test.each([null, undefined, ''])(
  'trimLowerCase should return empty for null undefined and empty',
  arg => {
    expect(trimLowerCase(arg)).toEqual('');
  }
);

it('formatAmount should return comma append amount with rupee symbol', () => {
  expect(formatAmount('111')).toEqual('₹111');
  expect(formatAmount('10001')).toEqual('₹10,001');
  expect(formatAmount('10110234')).toEqual('₹1,01,10,234');
  expect(formatAmount('1100.14')).toEqual('₹1,100.14');
  expect(formatAmount('11111.24')).toEqual('₹11,111.24');
});
