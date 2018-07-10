import { Component, Input, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { UfeComponent } from '../../ufe.component';
import { AuthService, } from '@ufeintc/ufeauthorization';
import { Authorization } from '@ufeintc/ufeauthorization/models/PRT';


declare var jQuery: any;

@Component({
    selector: 'ufe-main-menu',
    templateUrl: './ufe.main-menu.component.html'
})
export class UfeMenuComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() reset: boolean;
    model: any[];
    layoutMenuScroller: HTMLDivElement;
    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    authorization: Authorization;
    constructor(public app: UfeComponent, private authService: AuthService) {
        this.authService.tokenPRT$.subscribe(value => {
            if (value) {
                if (value.authorization) {
                    this.authorization = value.authorization;
                    this.updateMenuContents();
                }
            }

        });
    }

    ngOnInit() {
        this.updateMenuContents();
    }

    updateMenuContents() {
        this.model = [];
        this.model.push({ label: 'Wyszukaj klienta', icon: 'fa fa-search', routerLink: ['/welcome'] });
        this.model.push({ label: 'Podsumowanie klienta', icon: 'fa fa-user', routerLink: ['/portfolio'] });

        if (this.isAuthorized('resource_test', 'show')) {
            this.model.push({ label: 'Zadania', icon: 'fa fa-tasks', routerLink: ['/tasks'] });


            this.model.push({
                label: 'Produkty', icon: 'fa fa-product-hunt',
                items: [
                    { label: 'Konta', icon: 'fa fa-user-circle', routerLink: ['/tasks'] },
                    { label: 'Karty kredytowe', icon: 'fa fa-credit-card', routerLink: ['/tasks'] },
                    { label: 'Kredyty', icon: 'fa fa-search', routerLink: ['/tasks'] },
                    { label: 'Oszczędności', icon: 'fa fa-piggy-bank', routerLink: ['/tasks'] },
                    { label: 'Inwestycje', icon: 'fa fa-money', routerLink: ['/tasks'] },
                    { label: 'Ubezpieczenia', icon: 'fa fa-hands', routerLink: ['/tasks'] },
                    { label: 'Struktury', icon: 'fa fa-map-signs', routerLink: ['/tasks'] }
                ]
            });

            this.model.push({ label: 'Dane klienta', icon: 'fa fa-database', routerLink: ['/tasks'] });
            this.model.push({ label: 'Aneksy', icon: 'fa fa-adn', routerLink: ['/tasks'] });
            this.model.push({ label: 'Ankiety', icon: 'fa fa-search', routerLink: ['/tasks'] });
            this.model.push({ label: 'MiFID', icon: 'fa fa-search', routerLink: ['/tasks'] });
            this.model.push({ label: 'Historia kontaktów', icon: 'fa fa-history', routerLink: ['/tasks'] });
            this.model.push({ label: 'Oferty', icon: 'fa fa-archive', routerLink: ['/tasks'] });
            this.model.push({ label: 'Promocje', icon: 'fa fa-thumbs-up', routerLink: ['/tasks'] });
            this.model.push({ label: 'Podsumowanie klienta', icon: 'fa fa-search', routerLink: ['/tasks'] });

        }

        this.model.push({ label: 'Sprzedaż', icon: 'fa fa-search', routerLink: ['/tasks'] });
        this.model.push({ label: 'Obsługa klienta', icon: 'fa fa-search', routerLink: ['/tasks'] });
        this.model.push({ label: 'Kalendarz i zadania', icon: 'fa fa-calendar-alt', routerLink: ['/tasks'] });
        /*
                this.model.push({ label: 'Strona główna', icon: 'fa fa-home', routerLink: ['/welcome'] });
                if (this.isAuthorized('menu_main_tasks', 'show')) {
                    this.model.push({ label: 'Zadania', icon: 'fa fa-search', routerLink: ['/tasks'] });
                }
                if (this.isAuthorized('menu_main_calendar', 'show')) {
                    this.model.push({ label: 'Kalendarz', icon: 'fa fa-calendar', routerLink: ['/calendar'] });
                }
                if (this.isAuthorized('menu_main_portfolio', 'show')) {
                    this.model.push({ label: 'Portfel', icon: 'fa fa-users', routerLink: ['/portfolio'] });
                }
          */
    }

    isAuthorized(resourceName: string, scope: string): boolean {
        let isAuthorized = true;
        if (this.authorization) {
            if (this.authorization.permissions) {
                for (const permission of this.authorization.permissions) {
                    if (permission.resource_set_name === resourceName) {
                        if (permission.scopes.includes(scope)) {
                            isAuthorized = true;
                            break;
                        }
                    }
                }
            }
        }
        return isAuthorized;
    }


    ngAfterViewInit() {
        this.layoutMenuScroller = <HTMLDivElement>this.layoutMenuScrollerViewChild.nativeElement;

        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
        }, 10);
    }

    changeTheme(theme) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
        themeLink.href = 'assets/theme/theme-' + theme + '.css';
    }

    changeLayout(theme) {
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
    }

    updateNanoScroll() {
        setTimeout(() => {
            jQuery(this.layoutMenuScroller).nanoScroller();
        }, 500);
    }

    ngOnDestroy() {
        jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
    }
}

@Component({
    /* tslint:disable:component-selector */
    selector: '[ufe-submenu]',
    /* tslint:enable:component-selector */
    template: `
    <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
    <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass">
        <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" *ngIf="!child.routerLink"
           [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
            (mouseenter)="hover=true" (mouseleave)="hover=false" class="ripplelink">
            <i class="{{child.icon}}"></i>
            <span class="menuitem-text">{{child.label}}</span>
            <i class="layout-submenu-toggler fa fa-caret-down" *ngIf="child.items"></i>
            <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
        </a>

        <a (click)="itemClick($event,child,i)" *ngIf="child.routerLink"
            [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
           [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target"
            (mouseenter)="hover=true" (mouseleave)="hover=false" class="ripplelink">
            <i class="{{child.icon}}"></i>
            <span class="menuitem-text">{{child.label}}</span>
            <i class="layout-submenu-toggler fa fa-caret-down" *ngIf="child.items"></i>
            <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
        </a>
        <ul ufe-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset"
            [@children]="isActive(i) ? 'visible' : 'hidden'"></ul>
    </li>
</ng-template>
    `,
    animations: [
        trigger('children', [
            state('visible', style({
                height: '*'
            })),
            state('hidden', style({
                height: '0px'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class UfeSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _reset: boolean;

    activeIndex: number;

    hover: boolean;

    constructor(public app: UfeComponent, public router: Router, public location: Location) { }

    itemClick(event: Event, item: MenuItem, index: number) {
        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        if (item.routerLink || item.items || item.command || item.url) {
            this.activeIndex = (this.activeIndex === index) ? null : index;
        }

        // execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item });
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isMobile()) {
                this.app.sidebarActive = false;
                this.app.mobileMenuActive = false;
            }
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;
    }
}
