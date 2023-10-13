import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.css']
})
export class BarraSuperiorComponent {

  constructor(private router: Router){}

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['login']);
  }
}
