import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'product',
    canActivate:[
      MsalGuard
    ],
    loadChildren: () => 
      import('./modules/product/product-routing.module').then(
        (m) => m.ProductRoutingModule
      )    
  },
  {
    path: 'portfolio',    
    loadChildren: () => 
      import('./modules/portfolio/portfolio-routing.module').then(
        (m) => m.PortfolioRoutingModule
      )    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
