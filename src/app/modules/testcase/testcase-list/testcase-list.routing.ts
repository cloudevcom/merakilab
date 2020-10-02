import { Routes } from '@angular/router';
import { TestcaseListComponent } from './testcase-list.component';

export const TestcaseListRoute: Routes = [
    {
      path: '',
      children: [ {
        path: 'all',
        component: TestcaseListComponent
    }
  ]}
];
