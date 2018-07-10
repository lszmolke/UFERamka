import { OnInit, Component } from '@angular/core';
import { BreadcrumbService } from '../services/breadcrumb.service';

@Component({
    templateUrl: './portfolio.view.component.html'
})
export class PortfolioViewComponent {

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Portfel' }
        ]);
    }
}
