import { OnInit, Component } from "@angular/core";
import { BreadcrumbService } from "../services/breadcrumb.service";

@Component({
    templateUrl: './calendar.view.component.html'
})
export class CalendarViewComponent {

    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Kalendarz' }
        ]);
    }
}
