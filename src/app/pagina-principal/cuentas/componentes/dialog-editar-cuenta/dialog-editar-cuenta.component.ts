import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { Envio_CuentaI } from 'src/app/modelos/envio_cuenta';
import { CuentaService } from 'src/app/servicios/cuenta.service';



@Component({
  selector: 'app-dialog-editar-cuenta',
  templateUrl: './dialog-editar-cuenta.component.html',
  styleUrls: ['./dialog-editar-cuenta.component.css']
})
export class DialogEditarCuentaComponent {
  nombre_error:boolean=false;
  balance_error:boolean=false;
  
  cuentaForm = new FormGroup({
    nombre: new FormControl('', Validators.required)

  })

  constructor(
    public dialogRef: MatDialogRef<DialogEditarCuentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cuenta_service: CuentaService,
    private _snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  putCuenta(form:Envio_CuentaI | any): void{
    

    //Validacion de los campos del dialogo
    var errores: boolean=false;
    //validacion del nombre
    if (form.nombre==''){
      this.nombre_error=true;

      errores=true;
    }else{
      this.nombre_error=false;
    }
    //si existen errores no cierra el dialogo no envia la transaccion
    if (errores==true){
      return;
    }else{
      this.cuenta_service.putCuenta(form, this.data.id_cuenta).pipe(finalize(()=> this.dialogRef.close()))   .subscribe(data =>{
        this._snackBar.open("Cuenta editada exitosamente", "Cerrar" ,{duration: 5000});
      });
    }
  
  }
}
