import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiLoginService } from '../servicios/api-login.service';
import { Router } from '@angular/router';
import { CorreoI } from '../interfaces/correo';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.component.html',
  styleUrls: ['./recuperar-contra.component.css']
})
export class RecuperarContraComponent {

  correo_vacio: boolean=false;

  correoForm = new FormGroup({
    correo: new FormControl('', Validators.required),
  });

  constructor(private api_service: ApiLoginService,
    private router: Router){}


  enviar_correo(form:CorreoI | any){

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    if ((form.correo).match(EMAIL_REGEX)){
      this.api_service.enviarCorreo(form).subscribe(data =>{
        console.log(data);
        this.router.navigate(['correo_enviado']);
    
      });
    }else{
      this.correo_vacio=true;
    }
    
  }
}
