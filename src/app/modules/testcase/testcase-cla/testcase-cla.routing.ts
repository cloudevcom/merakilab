import { Routes } from "@angular/router";
import { TestcaseClaComponent } from "./testcase-cla.component";


export const TestcaseCLARoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'new',
                component: TestcaseClaComponent
            },
            {
                path: 'edit/:testcase_id',
                component: TestcaseClaComponent
            }
        ]
    }
];
