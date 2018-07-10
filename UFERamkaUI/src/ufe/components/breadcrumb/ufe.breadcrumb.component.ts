import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'ufe-breadcrumb',
    templateUrl: './ufe.breadcrumb.component.html'
})
export class UfeBreadcrumbComponent implements OnDestroy {
    subscription: Subscription;
    items: MenuItem[];
    constructor(public breadcrumbService: BreadcrumbService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
