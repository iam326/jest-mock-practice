export abstract class Animal {
  constructor(private _name: string) {}

  get name(): string {
    return this._name;
  }

  public abstract cry(): void;
}

export class Cat extends Animal {
  public cry() {
    return 'nya-';
  }
}
