import { PagesComponent } from './pages.component';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';

const PagesRoutes: Routes = [
    {path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
children: [
    {path: 'dashboard', component: DashboardComponent },
    {path: 'progress', component: ProgressComponent },
    {path: 'graficas1', component: Graficas1Component },
    {path: 'account-settings', component: AccountSettingsComponent },
    {path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de ussuario' } },
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
]},
];


export const PAGES_ROUTES = RouterModule.forChild( PagesRoutes );
