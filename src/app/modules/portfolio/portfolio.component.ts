import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product/services/product.service';
import { ViewImageComponent } from './../../shared/components/view-image/view-image.component';
import {
  CategorySpecification,
  CategoryType,
  Product,
  ProductFilter,
} from './../product/models/product';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  products: Product[] = [];
  eCategoryFilter: any;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    var data = Object.keys(CategoryType);
    this.eCategoryFilter = data.slice(data.length / 2);
    this.productService.getProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
    });
  }

  openViewModal(urlImage: string) {
    console.log('Modal open');
    const modal = this.modalService.open(ViewImageComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modal.componentInstance.urlImage = urlImage;
  }

  productFilterView(filter: string) {
    console.log('Test filter:' + filter);

    let pf = new ProductFilter();
    const pr = pf.filter(
      this.products,
      new CategorySpecification(parseInt(filter))
    );    
  }
}
