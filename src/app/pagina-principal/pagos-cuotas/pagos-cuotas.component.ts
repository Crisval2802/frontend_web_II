import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DialogNuevoPagoComponent } from './componentes/dialog-nuevo-pago/dialog-nuevo-pago.component';
import { TransaccionesService } from 'src/app/servicios/transacciones.service';
import { TransaccionI } from 'src/app/interfaces/transaccion';
import { CuotaI } from 'src/app/interfaces/cuota';

@Component({
  selector: 'app-pagos-cuotas',
  templateUrl: './pagos-cuotas.component.html',
  styleUrls: ['./pagos-cuotas.component.css']
})
export class PagosCuotasComponent {

  transacciones: TransaccionI[]=[];
  cuotas: CuotaI[]=[];

  divisa = localStorage.getItem('divisa');

  constructor (private router: Router,
              private usuario_service: UsuarioService,
              private transaccion_service: TransaccionesService,
              private dialog : MatDialog){}
              
  ngOnInit(): void {
    if (!localStorage.getItem('authToken')){
      this.router.navigate(['login'])
    }else{
      this.obtenerPagos(localStorage.getItem('id'));
    }

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNuevoPagoComponent, {
      data: {},
     
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  
  obtenerPagos(id: string | null){
    this.transaccion_service.getPagosCuotas(id).subscribe(data =>{
      this.cuotas= data.Cuotas;
      this.transacciones= data.Transacciones;
      console.log(data);

    });
  }









}
