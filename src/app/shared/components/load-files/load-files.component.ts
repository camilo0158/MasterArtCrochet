import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { environment } from 'src/environments/environment';
import { Product } from './../../../modules/product/models/product';
import { BlobStorageService } from './../../../utilities/services/blob-storage.service';

@Component({
  selector: 'app-load-files',
  templateUrl: './load-files.component.html',
  styleUrls: ['./load-files.component.scss'],
})
export class LoadFilesComponent implements OnInit {
  formLoadFile: FormGroup;
  idProduct = 'dasdas54d5as45d4asda';
  files: FileList;

  @Input() product: Product;
  constructor(
    private modalActiveService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private blobStorageService: BlobStorageService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.formLoadFile = this.formBuilder.group({
      ImageProduct: [''],
    });
  }

  saveProduct() {
    const formData = new FormData();
    const images: string[] = [];
    if (this.files) {
      for (let index = 0; index < this.files.length; index++) {
        formData.append('files', this.files[index], this.files[index].name);
        images.push(
          `${environment.masterAppBlobStorageFiles.baseApi}/${this.files[index].name}`
        );
      }

      this.blobStorageService
        .loadFile(formData, this.idProduct)
        .subscribe((response) => {
          if (response === true) {
            this.product.Images = images;
            this.productService
              .createProduct(this.product)
              .subscribe((productCreate) => {
                console.log(productCreate);
                if (productCreate) {
                  this.router.navigate(['product']);
                  this.closeModal();
                }
              });
          }
        });
    }
  }

  handleFileInput(files: FileList) {
    this.files = files;
  }

  closeModal(){
    this.modalActiveService.dismiss();
  }
}
