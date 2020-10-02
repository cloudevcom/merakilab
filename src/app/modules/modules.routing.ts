import { Routes } from '@angular/router';

export const ModulesRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'home',
                loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule)
            },
            {
                path: 'testcase',
                loadChildren: () => import('./testcase/testcase.module').then(m => m.TestcaseModule)
            }
        ]
    }
];
