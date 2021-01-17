import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductModule } from './modules/product/product.module';
import { SharedModule } from './shared/shared.module';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    // NumbersDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProductModule,
    PortfolioModule,
    ReactiveFormsModule,
    SharedModule,
    MsalModule.forRoot(
      {
        auth: {
          clientId: environment.azureb2c.clientId,
          authority: environment.azureb2c.authority,
          redirectUri: environment.azureb2c.redirectUri,
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE,
        },
      },
      {
        popUp: !isIE,
        consentScopes: ['user.read', 'openid', 'profile'],
        protectedResourceMap: [
          ['https://graph.microsoft.com/v1.0/me', ['user.read']],
        ],
        extraQueryParameters: {},
      }
    ),
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  // exports: [NumbersDirective],
})
export class AppModule {}
