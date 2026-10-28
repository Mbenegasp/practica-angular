import { Routes } from '@angular/router';
import { Catalogo } from './features/catalogo/catalogo';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'catalogo'
    },
    {
        path: 'catalogo',
        component: Catalogo
    },
];
