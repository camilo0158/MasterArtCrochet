import { OauthAccessService } from 'src/app/app-core/core/services/oauth.access.service';
import { Product } from './../../models/product';
import { productConstant } from './../../product.constant';
import { OptionSet } from './../../../../utilities/models/optionSet';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
})
export class FormProductComponent implements OnInit {
  formProduct: FormGroup;
  categories: OptionSet[] = [];
  colors: OptionSet[] = [];
  sizes: OptionSet[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private auth: OauthAccessService
  ) {}

  ngOnInit(): void {
    this.auth.getToken();
    this.formProduct = this.formBuilder.group({
      Category: ['', Validators.required],
      Description: [
        '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      Color: ['', Validators.required],
      Size: ['', Validators.required],
      Quantity: ['', Validators.required],
      Price: ['', Validators.required],
    });
    this.initializeOptions();
  }

  get invalidDescriptionRequired() {
    return (
      this.formProduct &&
      this.formProduct.get('Description').invalid &&
      this.formProduct.get('Description').dirty &&
      this.formProduct.get('Description').errors &&
      this.formProduct.get('Description').errors.required
    );
  }

  get invalidDescriptionMinLength() {
    return (
      this.formProduct &&
      this.formProduct.get('Description').invalid &&
      this.formProduct.get('Description').dirty &&
      this.formProduct.get('Description').errors &&
      this.formProduct.get('Description').errors.minlength
    );
  }

  get invalidPriceRequired() {
    return (
      this.formProduct &&
      this.formProduct.get('Price').invalid &&
      this.formProduct.get('Price').dirty &&
      this.formProduct.get('Price').errors &&
      this.formProduct.get('Price').errors.required
    );
  }

  get invalidQuantityRequired() {
    return (
      this.formProduct &&
      this.formProduct.get('Quantity').invalid &&
      this.formProduct.get('Quantity').dirty &&
      this.formProduct.get('Quantity').errors &&
      this.formProduct.get('Quantity').errors.required
    );
  }

  initializeOptions() {
    this.categories = productConstant.Categories;
    this.sizes = productConstant.Sizes;
    this.colors = productConstant.Colors;

    this.formProduct.get('Category').setValue(0);
    this.formProduct.get('Size').setValue(0);
    this.formProduct.get('Color').setValue(0);
  }

  clearForm() {
    this.formProduct.setValue({
      Category: 0,
      Description: '',
      Color: 0,
      Size: 0,
      Quantity: '',
      Price: '',
    });    
  }

  private formIsValid(form: FormGroup): boolean {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return false;
    }
    return true;
  }

  save() {
    const validForm = this.formIsValid(this.formProduct);
    if (validForm) {
      const product = this.mapProduct();
      this.productService.createProduct(product).subscribe((productCreate) => {
        console.log(productCreate);
        this.clearForm();
      });
    }
  }

  mapProduct() {
    const product = new Product();
    product.Description = this.formProduct.get('Description').value;
    product.Category = parseInt(this.formProduct.get('Category').value);
    product.Size = parseInt(this.formProduct.get('Size').value);
    product.Color = parseInt(this.formProduct.get('Color').value);
    product.Price = parseInt(this.formProduct.get('Price').value);
    product.Quantity = parseInt(this.formProduct.get('Quantity').value);

    return product;
  }
}
