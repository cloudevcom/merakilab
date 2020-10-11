import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { FireStoreService } from 'src/app/core/services/firebaseAPI.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { Base } from 'src/app/shared/bases/base';
import { STATUS } from 'src/app/shared/constants';
import { CollectionType } from 'src/app/shared/enums/collectiontype.enum';
import { moveItemInFormArray } from 'src/app/shared/funtions/move-item-in-form-array';
import { AngularFirestore } from '@angular/fire/firestore';
import { Guid } from "guid-typescript";
import { ModuleAPI } from 'src/app/core/firestoreAPI/module.api';
import { TestCaseAPI } from 'src/app/core/firestoreAPI/testcase.api';


@Component({
  selector: 'app-testcase-cla',
  templateUrl: './testcase-cla.component.html',
  styleUrls: ['./testcase-cla.component.css']
})
export class TestcaseClaComponent extends Base implements OnInit, AfterViewInit {
  testcase_id: string;
  action_name: string;
  public formGroup: FormGroup;
  modules: any[] = [];
  status: any[] = STATUS;
  steps: FormArray;
  selected = new FormControl(0);
  updatedBy: string;

  constructor(private route: ActivatedRoute,
    private testCaseAPI: TestCaseAPI,
    private formBuilder: FormBuilder,
    private notifyService: NotifyService,
    private afs: AngularFirestore,
    private router: Router,
    private moduleApi: ModuleAPI,
    public location: Location) {
    super();
    this.testcase_id = this.route.snapshot.params['testcase_id'];

  }
  ngAfterViewInit(): void {

  }

  drop(event: CdkDragDrop<string[]>) {
    let aFormArray: FormArray = this.formGroup.get('steps') as FormArray;

    moveItemInFormArray(aFormArray,
      event.previousIndex,
      event.currentIndex);

    aFormArray.controls.forEach((ele, i: number) => {
      ele.get('step_number').setValue(i + 1);
    });
  }

  ngOnInit(): void {
    console.log('ddd :>> ');
    this.validations();
    this.getModules();
    if (this.testcase_id) {
      this.action_name = "Edit";
      this.getTestcase();
    } else {
      this.action_name = "Create";
    }
  }

  getModules() {
    this.moduleApi.getModules().subscribe((result: any) => {
      console.log('result :>> ', result);
      this.modules = result;
    });
  }

  getTestcase() {
    this.testCaseAPI.getById(this.testcase_id)
      .subscribe((result: any) => {
        console.log('result.data() :>> ', result);
        this.model = result;
        this.formGroup.patchValue(result);
        for (let step of result.steps) {
          this.addStep(step);
        }

      });
  }

  validations() {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      status: ['Untested', Validators.required],
      despcription: ['', Validators.nullValidator],
      module: ['', Validators.required],
      steps: this.formBuilder.array([]),

    });
    //Add only if is new
    if (!this.testcase_id)
      this.addStep(null);
  }

  addStep(step: any) {
    this.steps = this.formGroup.controls.steps as FormArray;
    this.steps.push(this.formBuilder.group({
      step_description: [step?.step_description, Validators.required],
      expected_result: [step?.expected_result, Validators.nullValidator],
      step_number: [step == null ? this.steps.length + 1 : step.step_number, Validators.required],
    }));
    const elemMainPanel = <HTMLElement>document.querySelector('.container');
    if (elemMainPanel)
      elemMainPanel.scrollTop = elemMainPanel.scrollHeight + 500;

  }

  removeStep(index: number) {
    const steps = this.formGroup.controls.steps as FormArray;
    steps.removeAt(index);
  }

  save(keep: boolean) {
    if (this.formGroup.valid) {
      if (this.testcase_id) {
        this.testCaseAPI.update(this.testcase_id, this.formGroup.value, )
          .then(() => {
            keep ? this.selected.setValue(0) : this.router.navigate(['/testcase/all']);
            this.notifyService.notifySuccess("Testcase updated successfully.");
          }, (error) => {
            this.notifyService.notifyError(error);
          });
      } else {
        this.create(keep);
      }
    } else {
      this.validateAllFormFieldsDrag(this.formGroup);
    }
  }

  create(keep: boolean) {
    this.testCaseAPI.create(this.formGroup.value).then(() => {
      if (keep) {
        this.selected.setValue(0)
        this.formGroup.reset();
        this.formGroup.get('status').setValue('Untested');
        this.steps = this.formGroup.controls.steps as FormArray;
        this.steps.clear();
        this.addStep(null);
      } else
        this.router.navigate(['/testcase/all']);
        this.notifyService.notifySuccess("Testcase created successfully.");
    }).catch((error) => {
      this.notifyService.notifyError(error)
    });
  }

  public validateAllFormFieldsDrag(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      if (field === 'steps') {
        const steps = formGroup.controls['steps'] as FormArray;
        steps.controls.forEach(controlV => {
          this.validateAllFormFields(controlV as FormGroup);
        });
      }
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
