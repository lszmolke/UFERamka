import { Component, Renderer } from '@angular/core';
import { AuthService } from '@ufeintc/ufeauthorization';
import { TokenPRT } from '@ufeintc/ufeauthorization/models/PRT';


@Component({
  selector: 'ufe-root',
  templateUrl: './ufe.component.html',
  styleUrls: ['./ufe.component.scss']
})
export class UfeComponent {
  title = 'UFE';
  // this is encoded RPT token.
  encodedTokenRPT$ = this.authService.encodedTokenRPT$;
  // this is RPT token where you can find permissions to menu
  tokenPRT$ = this.authService.tokenPRT$;
  // this is encoded oauth token. This token should be send to uilogic services
  encodedTokenOAuth$ = this.authService.encodedTokenOAuth$;
  // this id decoded oauth token in form of objects. You can find here user, roles etc.
  tokenOAuth$ = this.authService.tokenOauth$;

  menuClick: boolean;
  layoutStatic: boolean;
  darkMenu: boolean;
  sidebarActive: boolean;
  topbarMenuClick: boolean;
  menuButtonClick: boolean;
  topbarMenuButtonClick: boolean;
  mobileMenuActive: boolean;
  activeTopbarItem: Element;
  topbarMenuActive: boolean;



  constructor(public renderer: Renderer, private authService: AuthService) {
    authService.refreshPrtTokenByService();
  }

  onWrapperClick() {
    if (!this.menuClick && !this.menuButtonClick) {
      this.mobileMenuActive = false;
    }

    if (!this.topbarMenuClick && !this.topbarMenuButtonClick) {
      this.topbarMenuActive = false;
      this.activeTopbarItem = null;
    }

    this.menuClick = false;
    this.menuButtonClick = false;
    this.topbarMenuClick = false;
    this.topbarMenuButtonClick = false;
  }

  onMenuButtonClick(event: Event) {
    this.menuButtonClick = true;
    if (this.isMobile()) {
      this.mobileMenuActive = !this.mobileMenuActive;
    }
    event.preventDefault();
  }

  onTopbarMobileMenuButtonClick(event: Event) {
    this.topbarMenuButtonClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;
    event.preventDefault();
  }

  onTopbarRootItemClick(event: Event, item: Element) {
    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }
    event.preventDefault();
  }

  onTopbarMenuClick(event: Event) {
    this.topbarMenuClick = true;
  }

  onSidebarClick(event: Event) {
    this.menuClick = true;
  }

  onToggleMenuClick(event: Event) {
    this.layoutStatic = !this.layoutStatic;
  }

  isMobile() {
    return window.innerWidth < 640;
  }

}
