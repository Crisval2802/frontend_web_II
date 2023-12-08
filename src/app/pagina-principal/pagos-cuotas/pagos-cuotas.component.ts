import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DialogNuevoPagoComponent } from './componentes/dialog-nuevo-pago/dialog-nuevo-pago.component';
import { TransaccionesService } from 'src/app/servicios/transacciones.service';
import { TransaccionI } from 'src/app/interfaces/transaccion';
import { CuotaI } from 'src/app/interfaces/cuota';
import { EnvioCuotaI } from 'src/app/interfaces/envio_cuota';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pagos-cuotas',
  templateUrl: './pagos-cuotas.component.html',
  styleUrls: ['./pagos-cuotas.component.css']
})
export class PagosCuotasComponent {

  transacciones: TransaccionI[]=[];
  cuotas: CuotaI[]=[];

  form:EnvioCuotaI ;

  divisa = localStorage.getItem('divisa');

  constructor (private router: Router,
              private usuario_service: UsuarioService,
              private transaccion_service: TransaccionesService,
              private dialog : MatDialog,
              private _snackBar: MatSnackBar){

                this.form ={
                  clave:1
                }

              }
              
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

      this.obtenerPagos(localStorage.getItem('id'));

    });
  }

  
  obtenerPagos(id: string | null){
    this.transaccion_service.getPagosCuotas(id).subscribe(data =>{
      this.cuotas= data.Cuotas;
      this.transacciones= data.Transacciones;


    });
  }



  pagarCuota(clave: string | any): void{
    
      this.form.clave = clave;
    
      this.transaccion_service.putPagarCuota(this.form).pipe(finalize(()=> this.obtenerPagos(localStorage.getItem('id')))) .subscribe(data =>{
        this._snackBar.open("Cuota Pagada Exitosamente", "Cerrar" ,{duration: 5000});
      });
  
  }





}
