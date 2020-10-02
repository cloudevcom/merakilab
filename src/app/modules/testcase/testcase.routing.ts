import { Routes } from '@angular/router';

export const TestcaseRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () => import('./testcase-list/testcase-list.module').then(m => m.TestcaseListModule)
            },
            {
                path: '',
                loadChildren: () => import('./testcase-cla/testcase-cla.module').then(m => m.TestcaseCLAModule)
            }
        ]
    }
];