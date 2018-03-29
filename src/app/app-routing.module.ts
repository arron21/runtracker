import { NgModule }             from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { PreloadSelectedModulesList } from './core/helpers/preload-selected-modules-list';

import { PageNotFoundComponent } from './core/components/page-not-found.component';

import { AuthGuardService } from './core/services/auth-guard.service';


const routes: Routes = [


    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuardService]
    },

    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService]
    },


    {
        path: 'project',
        loadChildren: './project/project.module#ProjectModule',
        canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService],
        data: {preload: true}
    },

    {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
        canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService],
        data: {preload: true}
    },

    {
        path: 'davintest',
        loadChildren: './davin-test/davin-test.module#DavinTestModule',
        canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService]
    },

    {
        path: 'apitest',
        loadChildren: './api-test/api-test.module#ApiTestModule',
        canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService]
    },

    { path: '', redirectTo: 'project', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    providers: [
        PreloadSelectedModulesList
    ],
    imports: [
        RouterModule.forRoot(routes,
        {preloadingStrategy: PreloadSelectedModulesList})
    ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}