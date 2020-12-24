import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { CryptoUtils, Logger } from 'msal';

@Injectable({
  providedIn: 'root',
})
export class OauthAccessService {
  isIframe = false;
  loggedIn = false;

  constructor(
    private authService: MsalService
  ) {}

  initializeOAuthService() {
    this.isIframe = window !== window.parent && !window.opener;

    this.checkAccount();    

    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }

      console.log('Redirect Success: ', response.accessToken);
    });

    this.authService.setLogger(
      new Logger(
        (logLevel, message, piiEnabled) => {
          console.log('MSAL Logging: ', message);
        },
        {
          correlationId: CryptoUtils.createNewGuid(),
          piiLoggingEnabled: false,
        }
      )
    );
  }

  login() {
    const isIE =
      window.navigator.userAgent.indexOf('MSIE ') > -1 ||
      window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
  }

  logout() {
    this.authService.logout();
  }

  checkAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }
}
