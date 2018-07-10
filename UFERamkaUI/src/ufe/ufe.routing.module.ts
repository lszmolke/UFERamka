import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksViewComponent } from './view/tasks.view.component';
import { PortfolioViewComponent } from './view/portfolio.view.component';
import { CalendarViewComponent } from './view/calendar.view.component';
import { WelcomeViewComponent } from './view/welcome.view.component';
import { FormsDemoComponent } from './view/formsdemo.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'welcome', pathMatch: 'full'
  },
  {
    path: 'welcome', pathMatch: 'full', component: WelcomeViewComponent
  },
  {
    path: 'tasks', pathMatch: 'full', component: TasksViewComponent
  },
  {
    path: 'calendar', pathMatch: 'full', component: CalendarViewComponent
  },
  {
    path: 'portfolio', pathMatch: 'full', component: FormsDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UfeRoutingModule { }
