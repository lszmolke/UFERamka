import { OnInit, Component } from "@angular/core";
import { BreadcrumbService } from "../services/breadcrumb.service";

@Component({
    templateUrl: './welcome.view.component.html'
})
export class WelcomeViewComponent {
    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            {label: 'Strona główna'}           
        ]);
    }
}