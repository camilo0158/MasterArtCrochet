import { PortfolioDetailsComponent } from './components/portfolio-details/portfolio-details.component';
import { PortfolioComponent } from './portfolio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent
  },
  {
    path: 'portfolio-details',
    component: PortfolioDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
