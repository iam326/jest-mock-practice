import { Animal, Cat } from './Animal';

export function main() {
  const cat = new Cat('neko');
  console.log(call(cat));
}

export function call(animal: Animal) {
  return `${animal.cry()}!!`;
}
