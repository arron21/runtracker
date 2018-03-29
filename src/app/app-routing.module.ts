import { NgModule }             from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TeamComponent} from './team/team.component';
import {SchoolComponent} from './school/school.component';
import {EventsComponent} from './events/events.component';
import {EventeditComponent} from './events/eventedit/eventedit.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'team',
        component: TeamComponent
    },
    {
        path: 'events',
        component: EventsComponent,
        children: [{
            path: ':eventId',
            component: EventeditComponent,
        }]
    },
    {
        path: 'school',
        component: SchoolComponent
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
    providers: [],
    imports: [
        RouterModule.forRoot(routes,
            { preloadingStrategy: PreloadAllModules })
    ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
