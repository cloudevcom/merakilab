import { FormGroup, FormControl } from "@angular/forms";
import { ReplaySubject } from "rxjs";
import { Location } from '@angular/common';

export abstract class Base {

  public formGroup: FormGroup;
  public actionName: string;
  public id: string;
  public model: any = {};

    protected filterData(filter, data: any[], ctr: FormControl, filteredData: ReplaySubject<any[]>) {
        if (!data) {
          return;
        }
        // get the search keyword
        let search = ctr.value;
        if (!search) {
          filteredData.next(data.slice());
          return;
        } else {
          search = search.toLowerCase();
        }
        // filter the banks
        filteredData.next(
          data.filter((a) => filter(a, search))
        );
      }

    public validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

}