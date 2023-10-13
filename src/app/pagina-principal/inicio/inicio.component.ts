import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{


  constructor(private router: Router){

  }
  //Valida que se tenga un token de autenticacion
  ngOnInit(): void {
    if (!localStorage.getItem('authToken')){
      this.router.navigate(['login'])
    }
  }




}
