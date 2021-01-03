import { FormProductComponent } from './components/form-product/form-product.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { MsalGuard } from '@azure/msal-angular';

export const ROUTES: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: 'create/:isNew',
    component: FormProductComponent,
    canActivate:[
      MsalGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
