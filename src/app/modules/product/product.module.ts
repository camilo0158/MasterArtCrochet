import { NumbersDirective } from './../../app-core/directive/numbers.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { FormProductComponent } from './components/form-product/form-product.component';

@NgModule({
  declarations: [ProductComponent, FormProductComponent, NumbersDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports:[NumbersDirective]
})
export class ProductModule {}
