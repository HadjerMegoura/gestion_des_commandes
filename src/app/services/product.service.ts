import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  listProducts: Product[] = [
    {
      id: '1',
      name: 'iPhone 14 Pro',
      price: 1199,
      quantityInStock: 3,
    },
    {
      id: '2',
      name: 'Samsung Galaxy S23',
      price: 999,
      quantityInStock: 7,
    },
    {
      id: '3',
      name: 'Lenovo ThinkPad X1 Carbon',
      price: 1590,
      quantityInStock: 2,
    },
    {
      id: '4',
      name: 'Apple AirPods Pro',
      price: 249,
      quantityInStock: 25,
    },
    {
      id: '5',
      name: 'Logitech MX Master 3 Mouse',
      price: 99,
      quantityInStock: 120,
    },
  ];

  getQuantityInStock(pro_id: string): number | undefined {
    return this.listProducts.find((pro) => pro.id === pro_id)?.quantityInStock;
  }

  getProductNameById(pro_id: string): string {
    return this.listProducts.find((pro) => pro.id === pro_id).name;
  }

  getListProduct() {
    return this.listProducts;
  }

  productOrdered(pro_id: string, quantity: number) {
    let product = this.listProducts.filter((pro) => pro.id === pro_id)[0];
    if (product) {
      product.quantityInStock = product.quantityInStock - quantity;
    }
  }
}
