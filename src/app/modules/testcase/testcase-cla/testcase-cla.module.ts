import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestcaseClaComponent } from './testcase-cla.component';
import { RouterModule } from '@angular/router';
import { TestcaseCLARoute } from './testcase-cla.routing';
import { MaterialModule } from 'src/app/app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaggingModule } from 'src/app/shared/controls/tagging/tagging.module';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [TestcaseClaComponent],
    imports: [ 
        CommonModule,
        RouterModule.forChild(TestcaseCLARoute),     
        ReactiveFormsModule,
        FormsModule,
        TaggingModule,
        MaterialModule,
        DragDropModule
    ],
    exports: [],
    providers: [],
})
export class TestcaseCLAModule {}