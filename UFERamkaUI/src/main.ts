import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AuthService } from '@ufeintc/ufeauthorization';
import { UfeModule } from './ufe/ufe.module';
import { environment } from './environments/environment';
import { KeycloakSetup } from '@ufeintc/ufeauthorization/models/InitAuth';

if (environment.production) {
  enableProdMode();
}

const keycloakSetup: KeycloakSetup = {
  clientId: 'angular',
  realm: 'inteca',
  url: 'http://localhost:8080/auth'
};

AuthService.initialize(keycloakSetup).then(() => {
  console.log('OK');
  platformBrowserDynamic().bootstrapModule(UfeModule);
}
).catch((reason) => {
  console.log(reason);
});


