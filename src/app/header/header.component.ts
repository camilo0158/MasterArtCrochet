import { Subscription } from 'rxjs';
import { OauthAccessService } from './../app-core/core/services/oauth.access.service';
import { Component, OnInit } from '@angular/core';
import { BroadcastService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  subscriptions: Subscription[] = [];
  loggedIn = false;

  constructor(
    private oatuhService: OauthAccessService,
    private broadcastService: BroadcastService
  ) {}

  ngOnInit(): void {
    let loginSuccessSubscription: Subscription;
    let loginFailureSubscription: Subscription;

    this.oatuhService.initializeOAuthService();
    loginSuccessSubscription = this.broadcastService.subscribe(
      'msal:loginSuccess',
      () => {
        this.oatuhService.checkAccount();
        this.loggedIn = this.oatuhService.loggedIn;
      }
    );

    loginFailureSubscription = this.broadcastService.subscribe(
      'msal:loginFailure',
      (error) => {
        console.log('Login Fails:', error);
      }
    );

    this.subscriptions.push(loginSuccessSubscription);
    this.subscriptions.push(loginFailureSubscription);
  }

  login() {
    this.oatuhService.login();
  }

  logout() {
    this.oatuhService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
