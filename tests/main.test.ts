import { main, call } from '../src/index';
import { Cat } from '../src/Animal';

const mockCatName = 'nekoooo';
const mockCatCry = 'nyaaa-';
const mock = {
  cry: jest.fn().mockReturnValue(mockCatCry)
};
// https://stackoverflow.com/questions/43697455/how-to-mock-replace-getter-function-of-object-with-jest#answer-43744255
Object.defineProperty(mock, 'name', {
  get: jest.fn(() => mockCatName)
});

jest.mock('../src/Animal', () => {
  return {
    Cat: jest.fn().mockImplementation(() => {
      return mock;
    })
  };
});

describe('test src/index', () => {
  describe('main', () => {
    it('should be normal', () => {
      console.log = jest.fn();
      main();
      expect(mock.cry).toBeCalled();
      expect(console.log).toBeCalledWith(`${mockCatCry}!!`);
    });
  });
  describe('call', () => {
    it('should be normal', () => {
      const cat = new Cat('neko');
      expect(cat.name).toBe(mockCatName);
      expect(call(cat)).toBe(`${mockCatCry}!!`);
    });
  });
});
