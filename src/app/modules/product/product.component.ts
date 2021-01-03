import { Product } from './models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { OauthAccessService } from 'src/app/app-core/core/services/oauth.access.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private auth: OauthAccessService
  ) {}

  ngOnInit(): void {
    this.auth.getToken();

    this.productService.getProducts().subscribe((products) => {
      console.log(products);
    });
  }
}
