import * as AWS from 'aws-sdk';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';

export abstract class Animal {
  private docClient: AWS.DynamoDB.DocumentClient;
  constructor(private _name: string) {
    this.docClient = new AWS.DynamoDB.DocumentClient({
      region: 'ap-northeast-1'
    });
  }

  get name(): string {
    return this._name;
  }

  public async getAttributes(): Promise<AttributeMap> {
    const item = await this.docClient.get({
      TableName: 'hoge',
      Key: { foo: 1, bar: 2}
    }).promise();
    return item.Item;
  }

  public abstract cry(): void;
}

export class Cat extends Animal {
  public cry() {
    return 'nya-';
  }
}
