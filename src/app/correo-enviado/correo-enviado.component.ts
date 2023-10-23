import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correo-enviado',
  templateUrl: './correo-enviado.component.html',
  styleUrls: ['./correo-enviado.component.css']
})
export class CorreoEnviadoComponent {

  constructor(private router: Router){}

  volverLogin(){
    this.router.navigate(['login']);
  }
}
