import { DatePipe, formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { TransaccionesService } from 'src/app/servicios/transacciones.service';
import { TransaccionI } from 'src/app/interfaces/transaccion';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseI } from 'src/app/interfaces/response';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoTransaccionComponent } from './componentes/dialogo-transaccion/dialogo-transaccion.component';
import { DialogVerImagenComponent } from './componentes/dialog-ver-imagen/dialog-ver-imagen.component';





@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})




export class InicioComponent implements OnInit{
  @ViewChild('grafico', { static: true }) grafico: ElementRef | undefined;
  transacciones: TransaccionI[] = [];
  
  fechas: string[]=[];
  cantidades: number[]=[];
  // Crear un objeto para almacenar el total de dinero por fecha
  totalPorFecha: { [fecha: string]: number } = {};
   // Atributo que almacena los datos del chart
   public chart: any;
 


 
   ngOnInit(): void {
    if (!localStorage.getItem('authToken')){
      this.router.navigate(['login'])
    }else{
      this.obtenerIngresos(localStorage.getItem('id'), "0");
      this.obtenerGastos(localStorage.getItem('id'), "0");
      this.obtenerBalance(localStorage.getItem('id'));


    }
     
    
   }





  balance: string | undefined;
  divisa: string | null = localStorage.getItem('divisa');
  //Tabla
  displayedColumns: string[] = ['cuenta','categoria', 'subcategoria', 'cantidad', 'comentarios', 'foto'];

  dataSourceIngreso =  new  MatTableDataSource<TransaccionI>
  dataSourceGasto =  new  MatTableDataSource<TransaccionI>
  //Fecha
  fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')

  //Dialogo




  constructor(private router: Router, 
    private transacciones_service: TransaccionesService, 
    private usuario_service: UsuarioService,
    public dialog: MatDialog){
  }
  //Valida que se tenga un token de autenticacion

  obtenerIngresos(id: string | null,  categoria: string|null){
    this.transacciones_service.getIngresosDia(id, categoria).subscribe(data =>{
      this.dataSourceIngreso.data= data.Transacciones;
      console.log(data);

    });
  }

  obtenerGastos(id: string | null,  categoria: string|null){
    this.transacciones_service.getGastosDia(id, categoria).subscribe(data =>{

      this.dataSourceGasto.data= data.Transacciones;
    });
  }

  obtenerBalance(id: string | null){
    this.usuario_service.getBalance(id).subscribe(data =>{
     
      this.balance=data.balance;
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogoTransaccionComponent, {
      data: {},
     
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.obtenerBalance(localStorage.getItem('id'));
      this.obtenerGastos(localStorage.getItem('id'), "0");
      this.obtenerIngresos(localStorage.getItem('id'), "0");
    });
  }

  openDialogImagen(url: string): void {
    const dialogRef = this.dialog.open(DialogVerImagenComponent, {
      data: {url:'http://localhost:8000//media/' + url},
     
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}