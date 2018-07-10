import { OnInit, Component } from '@angular/core';
import { BreadcrumbService } from '../services/breadcrumb.service';
import { SelectItem } from 'primeng/api';

@Component({
    templateUrl: './tasks.view.component.html'
})
export class TasksViewComponent {
    cities1: SelectItem[];
    cities2: City[];
    selectedCity1: City;
    selectedCity2: City;
    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Zadania' }
        ]);

        this.cities1 = [
            { label: 'Select City', value: null },
            { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
            { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
            { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
            { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
        ];


        this.cities2 = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }


    showSearchResults($event) {
        console.log($event.detail);
    }
}




interface City {
    name: string;
    code: string;
}
