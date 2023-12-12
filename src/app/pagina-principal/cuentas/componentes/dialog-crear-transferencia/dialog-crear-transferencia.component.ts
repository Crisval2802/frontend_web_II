import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { CuentaI } from 'src/app/interfaces/cuentas';
import { Envio_CuentaI } from 'src/app/interfaces/envio_cuenta';
import { EnvioTransferenciaI } from 'src/app/interfaces/envio_transferencia';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { TransferenciasService } from 'src/app/servicios/transferencias.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-dialog-crear-transferencia',
  templateUrl: './dialog-crear-transferencia.component.html',
  styleUrls: ['./dialog-crear-transferencia.component.css']
})
export class DialogCrearTransferenciaComponent implements OnInit{
  cuenta_error:boolean=false;
  cuenta2_error:boolean=false;
  
  cantidad_error:boolean=false;
  
  cuentas: CuentaI[] | undefined;

  transferenciaForm = new FormGroup({
    clave_cuenta: new FormControl('', Validators.required),
    clave_cuenta2: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    comentarios: new FormControl('', Validators.required),


  })

  constructor(
    public dialogRef: MatDialogRef<DialogCrearTransferenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Envio_CuentaI,
    private transferencia_service: TransferenciasService,
    private usuario_service: UsuarioService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
   this.obtenerCuentas(localStorage.getItem('id'));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  enviarTransferencia(form:EnvioTransferenciaI | any): void{


    //Validacion de los campos del dialogo
    var errores: boolean=false;

    //validacion de cuenta
    if (form.clave_cuenta==''){
      this.cuenta_error=true;

      errores=true;
    }else{
      this.cuenta_error=false;
    }

     //validacion de cuenta
     if (form.clave_cuenta2==''){
      this.cuenta2_error=true;

      errores=true;
    }else{
      this.cuenta2_error=false;
    }

   
    //validacion de cantidad
    if (form.cantidad<=0){
      this.cantidad_error=true;
      errores=true;
    }else{
      this.cantidad_error=false;
    }

    //si existen errores no cierra el dialogo no envia la transaccion
    if (errores==true){
      return;
    }else{
      form.divisa=localStorage.getItem('divisa');
      this.transferencia_service.postTransferencia(form).pipe(finalize(()=> this.dialogRef.close()))   .subscribe(data =>{
        if (data.error=='error'){
          this._snackBar.open(data.message, "Cerrar" ,{duration: 5000});
        }else{
          this._snackBar.open("Transferencia realizada exitosamente", "Cerrar" ,{duration: 5000});
        }
      });

     
      
    }

  }


  obtenerCuentas(id: string | null){
    this.usuario_service.getCuentas(id).subscribe(data =>{
        this.cuentas = data.cuentas;

    });
  }
}
