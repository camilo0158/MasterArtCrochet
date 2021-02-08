import { LoadFilesComponent } from './../../../../shared/components/load-files/load-files.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OauthAccessService } from 'src/app/app-core/core/services/oauth.access.service';
import { ProductService } from '../../services/product.service';
import { OptionSet } from './../../../../utilities/models/optionSet';
import { Product } from './../../models/product';
import { productConstant } from './../../product.constant';

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
    private auth: OauthAccessService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.auth.getToken();
    this.initializeForm();
    this.initializeOptions();
  }

  private initializeForm() {
    this.formProduct = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(4)]],
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

  get invalidNameRequired() {
    return (
      this.formProduct &&
      this.formProduct.get('Name').invalid &&
      this.formProduct.get('Name').dirty &&
      this.formProduct.get('Name').errors &&
      this.formProduct.get('Name').errors.required
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

  get invalidNameMinLength() {
    return (
      this.formProduct &&
      this.formProduct.get('Name').invalid &&
      this.formProduct.get('Name').dirty &&
      this.formProduct.get('Name').errors &&
      this.formProduct.get('Name').errors.minlength
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
      Name: '',
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
          control.markAsDirty();
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

      const modal = this.modalService.open(LoadFilesComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modal.componentInstance.product = product;
    }
  }

  mapProduct() {
    const product = new Product();
    product.Name = this.formProduct.get('Name').value;
    product.Description = this.formProduct.get('Description').value;
    product.category = parseInt(this.formProduct.get('Category').value);
    product.Size = parseInt(this.formProduct.get('Size').value);
    product.Color = parseInt(this.formProduct.get('Color').value);
    product.Price = parseInt(this.formProduct.get('Price').value);
    product.Quantity = parseInt(this.formProduct.get('Quantity').value);

    return product;
  }
}
