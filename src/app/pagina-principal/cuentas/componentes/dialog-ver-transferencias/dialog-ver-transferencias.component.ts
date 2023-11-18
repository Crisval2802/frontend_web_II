import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TransferenciaI } from 'src/app/interfaces/transferencia';
import { CuentaService } from 'src/app/servicios/cuenta.service';
import { TransferenciasService } from 'src/app/servicios/transferencias.service';

@Component({
  selector: 'app-dialog-ver-transferencias',
  templateUrl: './dialog-ver-transferencias.component.html',
  styleUrls: ['./dialog-ver-transferencias.component.css']
})
export class DialogVerTransferenciasComponent implements OnInit{
  //Tabla
  displayedColumns: string[] = ['cantidad','tipo', 'comentarios', 'fecha'];

  dataSource =  new  MatTableDataSource<TransferenciaI>
  constructor(
    public dialogRef: MatDialogRef<DialogVerTransferenciasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transferencia_service: TransferenciasService,

  ) {}

  ngOnInit(): void {
    this.obtenerTransferencias(this.data.id_cuenta);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  obtenerTransferencias(id: number | undefined){
    this.transferencia_service.getTransferencias(id).subscribe(data =>{
      this.dataSource.data= data.Transferencias;
      console.log(this.dataSource.data);
    });
  }
}
