import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestcaseListRoute } from './testcase-list.routing';
import { MaterialModule } from 'src/app/app.module';
import { TestcaseListComponent } from './testcase-list.component';
import { TaggingModule } from 'src/app/shared/controls/tagging/tagging.module';
import { FactScrollerModule } from 'src/app/shared/controls/fact-scroller/fact-scroller.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatChipsModule } from '@angular/material/chips';
import { SearchBoxModule } from 'src/app/shared/controls/search-box/search-box.module';

@NgModule({
    declarations: [TestcaseListComponent],
    imports: [ 
        CommonModule,
        RouterModule.forChild(TestcaseListRoute),
        MaterialModule,
        TaggingModule,
        FactScrollerModule,
        ScrollingModule,
        MatChipsModule,
        SearchBoxModule
     ],
    exports: [],
    providers: [],
})
export class TestcaseListModule {}