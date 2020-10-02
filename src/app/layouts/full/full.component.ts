import { Component, OnInit } from '@angular/core';
import { EmitterService } from 'src/app/core/services/emitter.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
    // this.emitterService.changeInfoAddProperty({
    //   title: 'Crea tu Primera Propiedad',
    //   subtitle: 'Antes de continuar debes registrar tu primera propiedad.'
    // });
  }

}
