import { NgModule }             from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TeamComponent} from './team/team.component';
import {SchoolComponent} from './school/school.component';
import {EventsComponent} from './events/events.component';
import {EventeditComponent} from './events/eventedit/eventedit.component';
import {EventlistComponent} from './events/eventlist/eventlist.component';
import {TeamListComponent} from './team/team-list/team-list.component';
import {AthleteViewComponent} from './team/athlete-view/athlete-view.component';
import {AthleteEditComponent} from './team/athlete-edit/athlete-edit.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'team',
        component: TeamComponent,
            children: [{
                path: 'list',
                component: TeamListComponent,
            },
            {
                path: 'view/:athleteId',
                component: AthleteViewComponent,
            },
            {
                path: 'edit/:athleteId',
                component: AthleteEditComponent,
            }
        ]
    },
    {
        path: 'events',
        component: EventsComponent,
        children: [{
            path: 'list',
            component: EventlistComponent,
        },
        {
            path: 'view/:eventId',
            component: EventeditComponent,
        }
        ]
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
