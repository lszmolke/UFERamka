import { Component, OnInit, OnDestroy } from '@angular/core';
import { UfeComponent } from '../../ufe.component';
import { AuthService } from '@ufeintc/ufeauthorization';
import { TokenPRT } from '@ufeintc/ufeauthorization/models/PRT';
import { DropdownModule } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';
import { AccordionModule } from 'primeng/primeng';
import { Subscription } from 'rxjs';


@Component({
    selector: 'ufe-topbar',
    templateUrl: './ufe.topbar.component.html'
})
export class UfeTopBarComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    events: SelectItem[];
    settings: MenuItem[];
    selectedEvents: Events;

    operatorFirstName: string;
    operatorLastName: string;

    tokenOauth$ = this.authService.tokenOauth$;
    constructor(public app: UfeComponent, private authService: AuthService) {
        this.events = [
            { label: 'Wydarzenie 1', value: { id: 1, name: 'Wydarzenie 1', code: 'W1' } },
            { label: 'Wydarzenie 2', value: { id: 2, name: 'Wydarzenie 2', code: 'W2' } },
            { label: 'Wydarzenie 3', value: { id: 3, name: 'Wydarzenie 3', code: 'W3' } },
            { label: 'Wydarzenie 4', value: { id: 4, name: 'Wydarzenie 4', code: 'W4' } },
            { label: 'Wydarzenie 5', value: { id: 5, name: 'Wydarzenie 5', code: 'W5' } }
        ];
        this.subscription = authService.tokenOauth$.subscribe(response => {
            this.operatorFirstName = response.given_name;
            this.operatorLastName = response.family_name;
        });
    }

    ngOnInit() {
        this.settings = [
            { label: 'notificaions', icon: 'fa-bell' },
            { label: 'settings', icon: 'fa-cog' },
            { label: 'logout', icon: 'fa-power-off' }
        ];
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}


interface Events {
    name: string;
    code: string;
}
