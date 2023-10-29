import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { Envio_CuentaI } from 'src/app/modelos/envio_cuenta';
import { CuentaService } from 'src/app/servicios/cuenta.service';



@Component({
  selector: 'app-dialog-crear-cuenta',
  templateUrl: './dialog-crear-cuenta.component.html',
  styleUrls: ['./dialog-crear-cuenta.component.css']
})
export class DialogCrearCuentaComponent {
  nombre_error:boolean=false;
  balance_error:boolean=false;
  
  cuentaForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    balance: new FormControl('', Validators.required),

  })

  constructor(
    public dialogRef: MatDialogRef<DialogCrearCuentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Envio_CuentaI,
    private cuenta_service: CuentaService,
    private _snackBar: MatSnackBar,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  enviarCuenta(form:Envio_CuentaI | any): void{
    

    //Validacion de los campos del dialogo
    var errores: boolean=false;
    //validacion del nombre
    if (form.nombre==''){
      this.nombre_error=true;

      errores=true;
    }else{
      this.nombre_error=false;
    }

    //validacion de cantidad
    if (form.balance==''){
      form.balance=0;
    }

    //si existen errores no cierra el dialogo no envia la transaccion
    if (errores==true){
      return;
    }else{
      form.clave_usuario=localStorage.getItem('id');
      form.divisa=localStorage.getItem('divisa');

      form.divisa=localStorage.getItem('divisa');
      this.cuenta_service.postCuenta(form).pipe(finalize(()=> this.dialogRef.close()))   .subscribe(data =>{
        this._snackBar.open("Cuenta creada exitosamente", "Cerrar" ,{duration: 5000});
      });

     
      
    }
  
  }
}
