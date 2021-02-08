export enum CategoryType {
  Shoes = 0,
  Boots = 1,
  Belts = 2,
}

export class Product {
  Id?: string;
  Name: string;
  category: number;
  Description: string;
  Quantity: number;
  Color: number;
  Size: number;
  Price: number;
  Images?: string[] = [];
}

export class CategorySpecification {
  category: number;

  constructor(category) {
    this.category = category;
  }

  isSatisfied(item) {
    return item.category === this.category;
  }
}

export class ProductFilter {
  filter(items, spec) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}
