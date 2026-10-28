import { Routes } from '@angular/router';
import { Catalogo } from './features/catalogo/catalogo';
import { Form } from './features/form/form';
import { Details } from './features/details/details';

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
    {
        path: 'agregar',
        component: Form
    },
    {
        path: 'detalle/:id',
        component: Details
    },
    {
        path: '**',
        redirectTo: 'catalogo'
    }
];
