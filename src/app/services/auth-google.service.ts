import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oAuthService: OAuthService) {
    // inicializar
    this.initLogin();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '101527293281-khb21gndaf0ng3tvtdc4vksldoh9kleu.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/dashboard',
      scope: 'openid profile email',
    }

    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  loginWithGoogle() {
    this.oAuthService.initLoginFlow();
  }

  logout() {
    this.oAuthService.logOut();
  }

  getProfile() {
    return this.oAuthService.getIdentityClaims();
  }

}
