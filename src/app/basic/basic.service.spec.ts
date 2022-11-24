import { TestBed } from '@angular/core/testing';

import { BasicService } from './basic.service';

// -------------
// FALSY VALUES: false, 0, '', null, undefined, and NaN
describe('BasicService', () => {
  let service: BasicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('null', () => {
    const value = null;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    expect(value).toBe(null); // Checks that a value is what you expect. It uses Object.is to check strict equality. Don't use toBe with floating-point numbers.;
    expect(value).toBeNull(); //This is the same as .toBe(null) but the error messages are a bit nicer. So use .toBeNull() when you want to check that something is null.
    expect(value).toBeDefined(); // Ensure that a variable is not undefined.
    expect(value).not.toBeUndefined(); // Used to check that a variable is undefined. or NOT because .not operator
    expect(value).not.toBeTruthy(); // Use when you don't care what a value is, you just want to ensure a value is true in a boolean context. In JavaScript, there are six falsy values: false, 0, '', null, undefined, and NaN. Everything else is truthy.
    expect(value).toBeFalsy(); // When you don't care what a value is, you just want to ensure a value is false in a boolean context.
  });

  it('null', () => {
    const value = undefined;
    expect(value).toBe(undefined); // Checks that a value is what you expect. It uses Object.is to check strict equality. Don't use toBe with floating-point numbers.;
    expect(value).not.toBeNull(); //This is the same as .toBe(null) but the error messages are a bit nicer. So use .toBeNull() when you want to check that something is null.
    expect(value).not.toBeDefined(); // Ensure that a variable is not undefined.
    expect(value).toBeUndefined(); // Used to check that a variable is undefined. or NOT because .not operator
    expect(value).not.toBeTruthy(); // Use when you don't care what a value is, you just want to ensure a value is true in a boolean context. In JavaScript, there are six falsy values: false, 0, '', null, undefined, and NaN. Everything else is truthy.
    expect(value).toBeFalsy(); // When you don't care what a value is, you just want to ensure a value is false in a boolean context.
  });

  it('0', () => {
    const value = 0;
    expect(value).not.toBe(null); // Checks that a value is what you expect. It uses Object.is to check strict equality. Don't use toBe with floating-point numbers.;
    expect(value).not.toBeNull(); //This is the same as .toBe(null) but the error messages are a bit nicer. So use .toBeNull() when you want to check that something is null.
    expect(value).toBeDefined(); // Ensure that a variable is not undefined.
    expect(value).not.toBeUndefined(); // Used to check that a variable is undefined. or NOT because .not operator
    expect(value).not.toBeTruthy(); // Use when you don't care what a value is, you just want to ensure a value is true in a boolean context. In JavaScript, there are six falsy values: false, 0, '', null, undefined, and NaN. Everything else is truthy.
    expect(value).toBeFalsy(); // When you don't care what a value is, you just want to ensure a value is false in a boolean context.
  });

  it('2 + 2', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(4.5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4); //Used when you want to check that two objects have the same value. This matcher recursively checks the equality of all fields, rather than checking for object identity.
  });

  it('float numbers ', () => {
    const value = 0.1 + 0.2; // 0.30000000000000004
    expect(value).toBeGreaterThan(0.3);
    expect(value).toBeGreaterThanOrEqual(0.3);
    expect(value).toBeLessThan(0.4);
    expect(value).toBeLessThanOrEqual(0.4);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(0.30000000000000004); // Checks that a value is what you expect. It uses Object.is to check strict equality. Don't use toBe with floating-point numbers.
    expect(value).toEqual(0.30000000000000004); //Used when you want to check that two objects have the same value. This matcher recursively checks the equality of all fields, rather than checking for object identity.

    //Solution
    expect(value).toBeCloseTo(0.3); // Using exact equality with floating point numbers is a bad idea. Rounding means that intuitive things fail. The default for numDigits is 2.
  });

  it('objects', () => {
    let player1 = {
      name: 'Amit',
      score: 20,
    };

    player1.score = 40;

    // .toEqual works based on deep equality
    // .toBe is literally just doing a Object.is(x, y) under the hood. Which is slightly different, but basically the same as x === y.

    expect(player1).not.toBe({
      name: 'Amit',
      score: 40,
    });

    expect(player1).toEqual({
      name: 'Amit',
      score: 40,
    });
  });

  it('toBe vs toEqual', () => {
    let x = { z: true };
    let y = { z: true };

    // expect(x)
    //   .toBe(y); // FALSE

    expect(x).toEqual(y); // TRUE
  });

  // Two players, both happen to have the same name and age
  const player1 = { name: 'John', age: 25 };
  const player2 = { name: 'John', age: 25 };
  const players = [player1, player2];

  function getFirstPlayer() {
    return players[0];
  }

  it('toBe vs toEqual', () => {
    // USING TOBE
    expect(getFirstPlayer()).toBe(player1); // passes

    expect(getFirstPlayer()).not.toBe(player2); // passes

    // USING TOEQUAL
    expect(getFirstPlayer()).toEqual(player1); // passes

    // expect(getFirstPlayer())
    //   .not.toEqual(player2); // fails
  });

  it('strings', () => {
    expect('smeStrings').toMatch(/sme/); // Check that a string matches a regular expression.
  });

  it('strings', () => {
    expect('smeStrings').toMatch(/sme/);
  });

  it('Arrays and iterables', () => {
    const list = ['a', 'b', 'c', 'd', 'e', 'f'];

    expect(list).toContain('a'); // Used when you want to check that an item is in a list. For testing the items in the list, this uses ===, a strict equality check. It can also check whether a string is a substring of another string.
    expect(new Set(list)).toContain('a'); // Used when you want to check that an item is in a list. For testing the items in the list, this uses ===, a strict equality check. It can also check whether a string is a substring of another string.
  });

  it('Exceptions', () => {
    expect(() => service.methodWithError()).toThrow();
    expect(() => service.methodWithError()).toThrow(Error);

    expect(() => service.methodWithError()).toThrow('Some error');
    expect(() => service.methodWithError()).toThrow(/Some error/);
  });

  it.only('Should only run this test ', () => {
    expect(2 + 2).toBe(4);
  });

  it.skip('Should skip this test', () => {
    expect(2 + 2).toBe(4);
  });

  it.failing('Should fail this test', () => {
    expect(2 + 2).toBe(4);
  });
});
