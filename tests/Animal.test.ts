import * as AWS from 'aws-sdk';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import { Cat } from '../src/Animal';

jest.mock('aws-sdk');

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

    describe('getAttributes', () => {
      it('should be normal', async () => {
        (AWS.DynamoDB.DocumentClient as any).mockReset();
        (AWS.DynamoDB.DocumentClient as any).mockImplementation(() => {
          return {
            get: jest.fn().mockImplementation((params: AttributeMap) => {
              expect(params).toEqual({
                Key: {
                  foo: 1,
                  bar: 2
                },
                TableName: 'hoge'
              });
              return { 
                promise: jest.fn().mockReturnValue({
                  Item: { age: 5, height: 20 }
                })
              };
            })
          }
        });
        const cat = new Cat('neko');
        await expect(cat.getAttributes()).resolves.toEqual({
          age: 5, height: 20
        });
      });
    })
  });
});
