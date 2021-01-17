import { Product } from './../product/models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/services/product.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
    });
  }
}
