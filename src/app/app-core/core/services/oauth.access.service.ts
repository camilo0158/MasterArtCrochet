import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import {
  AuthError,
  CryptoUtils,
  InteractionRequiredAuthError,
  Logger,
} from 'msal';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Injectable({
  providedIn: 'root',
})
export class OauthAccessService {
  isIframe = false;
  loggedIn = false;

  profile;

  constructor(private authService: MsalService, private http: HttpClient) {}

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

  getProfile() {
    this.http.get(GRAPH_ENDPOINT).subscribe({
      next: (profile) => {
        this.profile = profile;
      },
      error: (err: AuthError) => {
        // If there is an interaction required error,
        // call one of the interactive methods and then make the request again.
        if (
          InteractionRequiredAuthError.isInteractionRequiredError(err.errorCode)
        ) {
          this.authService
            .acquireTokenPopup({
              scopes: this.authService.getScopesForEndpoint(GRAPH_ENDPOINT),
            })
            .then(() => {
              this.http
                .get(GRAPH_ENDPOINT)
                .toPromise()
                .then((profile) => {
                  this.profile = profile;
                });
            });
        }
      },
    });
  }

  getToken() {
    const requestObj = {
      scopes: ["user.read"],
    };

    this.authService
      .acquireTokenSilent(requestObj)
      .then(function (tokenResponse) {
        // Callback code here
        console.log(tokenResponse.accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
