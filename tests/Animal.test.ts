import { Cat } from '../src/Animal';

describe('test src/Animal', () => {
  describe('Cat', () => {
    describe('constructor', () => {
      it('should be normal', () => {
        const cat = new Cat('neko');
        expect(cat).toBeInstanceOf(Cat);
        expect(cat.name).toBe('neko');
      });
    });

    describe('cry', () => {
      it('should be normal', () => {
        const cat = new Cat('neko');
        expect(cat.cry()).toBe('nya-');
      });
    });
  });
});
