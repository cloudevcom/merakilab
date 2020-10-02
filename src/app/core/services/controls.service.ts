import { Injectable, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
declare const $: any;

@Injectable()
export class ControlsService {
  
  // display(value: boolean) {
  //   this.status.next(value);
  // }
  private configSucces: MatSnackBarConfig = {
    panelClass: ['text-succes'],
    duration: 6000
  };

  private configError: MatSnackBarConfig = {
    panelClass: ['text-danger'],
    duration: 6000
  };

  private configWarning: MatSnackBarConfig = {
    panelClass: ['text-warning'],
    duration: 6000
  };
  
  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) { }
  
  public async snackbarSucces(message) {
    // this.snackBar.open(message, 'Cerrar', this.configSucces);
    //await Swal('Información', message, 'success');
  }

  public async snackbarError(message) {
    // this.snackBar.open(message, 'Cerrar', this.configError);
   // await Swal('Error', message, 'error');
  }

  public async snackbarWarning(message) {
    // this.snackBar.open(message, 'Cerrar', this.configWarning);
   // await Swal('', message, 'warning');
  }

  public notifySuccess(msg: string)
  {
    $.notify({
      icon: 'notifications',
      message: msg
    },
    {
      type: 'success',
      timer: 100,
      delay: 5000,
      z_index: 9999,
      animate: {
        enter: 'animated fadeInRight',
        exit: 'animated fadeOutRight'
      },
      placement: {
        from: 'top',
        align: 'right'
      },
      template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
      '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
      '<i class="material-icons" data-notify="icon">check</i> ' +
      '<span data-notify="title">{1}</span> ' +
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
      '<a href="{3}" target="{4}" data-notify="url"></a>' +
    '</div>'

    });
  }
 

}
