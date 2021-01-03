import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { environment } from './../environments/environment';
import { NumbersDirective } from './app-core/directive/numbers.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductModule } from './modules/product/product.module';

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
    ReactiveFormsModule,
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
