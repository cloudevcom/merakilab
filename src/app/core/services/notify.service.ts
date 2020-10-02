import { Injectable } from "@angular/core";
declare const $: any;

@Injectable()
export class NotifyService {

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

    public notifyError(msg: string) {
        $.notify({
            message: msg
        },
            {
                type: 'error',
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
                template: `<div class="alert alert-danger alert-with-icon">
                            <i class="material-icons" data-notify="icon">error_outline</i>
                            <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">  <i class="material-icons">close</i></button>
                            <span data-notify="message">
                                <b>Error:</b>  {2}</span>
                            </div>`
            });
    }

    public notifyInfo(msg: string) {
        $.notify({
            message: msg
        },
            {
                type: 'info',
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
                template: `<div class="alert alert-info alert-with-icon">
                            <i class="material-icons" data-notify="icon">notifications</i>
                            <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">  <i class="material-icons">close</i></button>
                            <span data-notify="message">
                                <b>Alerta:</b>  {2}</span>
                            </div>`
            });
    }

    public notifyWarning(msg: string) {
        $.notify({
            message: msg
        },
            {
                type: 'info',
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
                template: `<div class="alert alert-warning alert-with-icon">
                            <i class="material-icons" data-notify="icon">warning</i>
                            <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">  <i class="material-icons">close</i></button>
                            <span data-notify="message">
                                <b>Alerta:</b>  {2}</span>
                            </div>`
            });
    }

    public  notifySystemError(){
        $.notify({
            message: 'Ha ocurrido un error, consulte su administrador.'
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
                template: `<div class="alert alert-danger alert-with-icon">
                            <i class="material-icons" data-notify="icon">error_outline</i>
                            <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">  <i class="material-icons">close</i></button>
                            <span data-notify="message">
                                <b>Error:</b>  {2}</span>
                            </div>`
            });
    }


    //SWAN
   public swalInfo(msg: String){
    // swal({
    //     title: 'Notificación',
    //     html: `${msg}`,
    //     showCancelButton: false,
    //     confirmButtonText: 'Ok',
    //     confirmButtonClass: 'btn btn-primary',
    //     buttonsStyling: false
    // });
   }




}