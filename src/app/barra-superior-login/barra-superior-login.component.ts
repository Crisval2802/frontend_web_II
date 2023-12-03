import { Component } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-barra-superior-login',
  templateUrl: './barra-superior-login.component.html',
  styleUrls: ['./barra-superior-login.component.css']
})
export class BarraSuperiorLoginComponent {

  constructor (private router: Router){
    
  }

  irLogin(){
    this.router.navigate(['login']);
  }
}
