import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaI } from 'src/app/interfaces/categorias';
import { TransaccionI } from 'src/app/interfaces/transaccion';
import { TransaccionesService } from 'src/app/servicios/transacciones.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Filesystem, Directory} from '@capacitor/filesystem';





@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private transacciones_service: TransaccionesService,
              private usuario_service: UsuarioService,
              private _snackBar: MatSnackBar){}

  

  fileName:string="";
  id= localStorage.getItem('id');

  //filtro de categorias
  categoria_elegida_ingreso_dia: string = '0';
  categoria_elegida_ingreso_semana: string = '0';
  categoria_elegida_ingreso_mes: string = '0';
  categoria_elegida_ingreso_year: string = '0';
  categoria_elegida_ingreso_rango: string = '0';



  fecha_inicio_ingresos_rango:string=formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  fecha_final_ingresos_rango:string=formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  fecha_inicio_gastos_rango:string=formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  fecha_final_gastos_rango:string=formatDate(new Date(), 'yyyy-MM-dd', 'en-US');



  categoria_elegida_gasto_dia: string = '0';
  categoria_elegida_gasto_semana: string = '0';
  categoria_elegida_gasto_mes: string = '0';
  categoria_elegida_gasto_year: string = '0';
  categoria_elegida_gasto_rango: string = '0';


  categorias_ingreso: CategoriaI[] | undefined;
  categorias_gasto: CategoriaI[] | undefined;

  //Tabla
  //displayedColumns: string[] = ['cuenta','categoria', 'subcategoria', 'cantidad', 'comentarios'];
  displayedColumns: string[] = ['cuenta','categoria', 'subcategoria', 'cantidad', 'comentarios', 'fecha'];
  dataSourceIngresosDia =  new  MatTableDataSource<TransaccionI>
  dataSourceIngresosSemana =  new  MatTableDataSource<TransaccionI>
  dataSourceIngresosMes =  new  MatTableDataSource<TransaccionI>
  dataSourceIngresosYear =  new  MatTableDataSource<TransaccionI>
  dataSourceIngresosRango =  new  MatTableDataSource<TransaccionI>

  dataSourceGastosDia =  new  MatTableDataSource<TransaccionI>
  dataSourceGastosSemana =  new  MatTableDataSource<TransaccionI>
  dataSourceGastosMes =  new  MatTableDataSource<TransaccionI>
  dataSourceGastosYear =  new  MatTableDataSource<TransaccionI>
  dataSourceGastosRango =  new  MatTableDataSource<TransaccionI>

  //Fecha
  fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
  inicio_semana:string |undefined;
  fin_semana:string |undefined;
  numero_mes = (new Date()).getMonth();
  mes: string | undefined;
  year = (new Date()).getFullYear();


  ngOnInit(): void {
    this.obtenerIngresosDia(localStorage.getItem('id'),"0");
    this.obtenerIngresosSemana(localStorage.getItem('id'),"0");
    this.obtenerIngresosMes(localStorage.getItem('id'),"0");
    this.obtenerIngresosYear(localStorage.getItem('id'),"0");
    this.obtenerGastosDia(localStorage.getItem('id'),"0");
    this.obtenerGastosSemana(localStorage.getItem('id'),"0");
    this.obtenerGastosMes(localStorage.getItem('id'),"0");
    this.obtenerGastosYear(localStorage.getItem('id'),"0");


    this.obtenerCategoriasIngreso(localStorage.getItem('id'));
    this.obtenerCategoriasGasto(localStorage.getItem('id'));
    

    if (this.numero_mes==0){
      this.mes='Enero';
    }else if(this.numero_mes==1){
      this.mes='Febrero';
    }else if(this.numero_mes==2){
      this.mes='Marzo';
    }else if(this.numero_mes==3){
      this.mes='Abril';
    }else if(this.numero_mes==4){
      this.mes='Mayo';
    }else if(this.numero_mes==5){
      this.mes='Junio';
    }else if(this.numero_mes==6){
      this.mes='Julio';
    }else if(this.numero_mes==7){
      this.mes='Agosto';
    }else if(this.numero_mes==8){
      this.mes='Septiembre';
    }else if(this.numero_mes==9){
      this.mes='Octubre';
    }else if(this.numero_mes==10){
      this.mes='Noviembre';
    }else if(this.numero_mes==11){
      this.mes='Diciembre';
    }
  }



  //obtener ingresos
  obtenerIngresosDia(id: string | null,  categoria: string|null){
    this.transacciones_service.getIngresosDia(id, categoria).subscribe(data =>{
      this.dataSourceIngresosDia.data= data.Transacciones;
    });
  }

  obtenerIngresosSemana(id: string | null,  categoria: string|null){
    this.transacciones_service.getIngresosSemana(id, categoria).subscribe(data =>{
      this.dataSourceIngresosSemana.data= data.Transacciones;
      this.inicio_semana=data.Inicio;
      this.fin_semana=data.Final;
    });
  }

  obtenerIngresosMes(id: string | null,  categoria: string|null){
    this.transacciones_service.getIngresosMes(id, categoria).subscribe(data =>{
      this.dataSourceIngresosMes.data= data.Transacciones;
    });
  }

  obtenerIngresosYear(id: string | null,  categoria: string|null){
    this.transacciones_service.getIngresosYear(id, categoria).subscribe(data =>{
      this.dataSourceIngresosYear.data= data.Transacciones;
    });
  }

  obtenerIngresosRango(id: string | null,  categoria: string|null, inicio: string|undefined, final: string|undefined){
    this.transacciones_service.getIngresosRango(id, categoria, inicio, final).subscribe(data =>{
      this.dataSourceIngresosRango.data= data.Transacciones;
    });
  }

  //obtener gastos

  obtenerGastosDia(id: string | null,  categoria: string|null){
    this.transacciones_service.getGastosDia(id,categoria).subscribe(data =>{
      this.dataSourceGastosDia.data= data.Transacciones;
    });
  }

  obtenerGastosSemana(id: string | null,  categoria: string|null){
    this.transacciones_service.getGastosSemana(id, categoria).subscribe(data =>{
      this.dataSourceGastosSemana.data= data.Transacciones;
      this.inicio_semana=data.Inicio;
      this.fin_semana=data.Final;
    });
  }

  obtenerGastosMes(id: string | null,  categoria: string|null){
    this.transacciones_service.getGastosMes(id, categoria).subscribe(data =>{
      this.dataSourceGastosMes.data= data.Transacciones;
    });
  }

  obtenerGastosYear(id: string | null,  categoria: string|null){
    this.transacciones_service.getGastosYear(id, categoria).subscribe(data =>{
      this.dataSourceGastosYear.data= data.Transacciones;
    });
  }

  obtenerGastosRango(id: string | null,  categoria: string|null, inicio: string|undefined, final: string|undefined){
    this.transacciones_service.getGastosRango(id, categoria, inicio, final).subscribe(data =>{
      this.dataSourceGastosRango.data= data.Transacciones;
    });
  }

  //obtener categorias
  obtenerCategoriasIngreso(id: string | null){
    this.usuario_service.getCategoriasIngreso(id).subscribe(data =>{
        this.categorias_ingreso = data.Categorias;
  
    });
  }

  obtenerCategoriasGasto(id: string | null){
    this.usuario_service.getCategoriasGasto(id).subscribe(data =>{
        this.categorias_gasto = data.Categorias;
  
    });
  }

  //reportes de ingresos
  obtenerReporteIngresosDia(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteIngresosDia(id, categoria).subscribe((response:Blob)=>{
      let ref = this;
      const blob = new Blob([response], { type: 'application/pdf' });
      
      if (blob.size!==70){

        const Fecha = new Date();

        this.fileName="Reporte de Ingresos del dia " + this.fecha +  ".pdf"
        var reader = new FileReader();
        reader.readAsDataURL(response);

        reader.onloadend = function(){
          let base64 = reader.result?.toString();
          
          ref.savePdf(base64 ?? '');

        }
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteIngresosSemana(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteIngresosSemana(id, categoria).subscribe((response:Blob)=>{
      let ref = this;
      const blob = new Blob([response], { type: 'application/pdf' });
      
      if (blob.size!==70){

        const Fecha = new Date();

        this.fileName="Reporte de Ingresos de la semana del " + this.inicio_semana + " al " + this.fin_semana + ".pdf"
        var reader = new FileReader();
        reader.readAsDataURL(response);

        reader.onloadend = function(){
          let base64 = reader.result?.toString();
          
          ref.savePdf(base64 ?? '');

        }
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }


  obtenerReporteIngresosMes(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteIngresosMes(id, categoria).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });
      let ref = this;
      if (blob.size!==70){

       

        this.fileName="Reporte de Ingresos del mes de " + this.mes +  " del año " + this.year + ".pdf"
        var reader = new FileReader();
        reader.readAsDataURL(response);

        reader.onloadend = function(){
          let base64 = reader.result?.toString();
          
          ref.savePdf(base64 ?? '');

        }
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteIngresosYear(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteIngresosYear(id, categoria).subscribe((response:Blob)=>{
      let ref = this;
      const blob = new Blob([response], { type: 'application/pdf' });
      
      if (blob.size!==70){



        this.fileName="Reporte de Ingresos del Año " + this.year + ".pdf"
        var reader = new FileReader();
        reader.readAsDataURL(response);

        reader.onloadend = function(){
          let base64 = reader.result?.toString();
          
          ref.savePdf(base64 ?? '');

        }

      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteIngresosRango(id: string | null,  categoria: string|null, inicio: string|undefined, final: string|undefined){
    this.transacciones_service.getReporteIngresosRango(id, categoria, inicio, final).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });

      if (blob.size!==70){
        this.fileName="Reporte de Ingresos del " + inicio + " al " + final + ".pdf";
        var reader = new FileReader();
        reader.readAsDataURL(response);
        let ref = this;
        reader.onloadend = function(){
          let base64 = reader.result?.toString();
          
          ref.savePdf(base64 ?? ''); 
        }
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }


  //reportes de gastos
  obtenerReporteGastosDia(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteGastosDia(id, categoria).subscribe((response:Blob)=>{
      let ref = this;
      const blob = new Blob([response], { type: 'application/pdf' });
      
      if (blob.size!==70){

        const Fecha = new Date();

        this.fileName="Reporte de Gastos del dia " + this.fecha +  ".pdf"
        var reader = new FileReader();
        reader.readAsDataURL(response);

        reader.onloadend = function(){
          let base64 = reader.result?.toString();
          
          ref.savePdf(base64 ?? '');

        }
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteGastosSemana(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteGastosSemana(id, categoria).subscribe((response:Blob)=>{
      let ref = this;
      const blob = new Blob([response], { type: 'application/pdf' });
      
      if (blob.size!==70){

        const Fecha = new Date();

        this.fileName="Reporte de Gastos de la semana del " + this.inicio_semana + " al " + this.fin_semana + ".pdf"
        var reader = new FileReader();
        reader.readAsDataURL(response);

        reader.onloadend = function(){
          let base64 = reader.result?.toString();
          
          ref.savePdf(base64 ?? '');

        }

      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteGastosMes(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteGastosMes(id, categoria).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });
      let ref = this;
      if (blob.size!==70){

       

        this.fileName="Reporte de Gastos del mes de " + this.mes +  " del año " + this.year + ".pdf"
        var reader = new FileReader();
        reader.readAsDataURL(response);

        reader.onloadend = function(){
          let base64 = reader.result?.toString();
          
          ref.savePdf(base64 ?? '');

        }

      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteGastosYear(id: string | null,  categoria: string|null){

    this.transacciones_service.getReporteGastosYear(id, categoria).subscribe((response:Blob)=>{
      let ref = this;
      const blob = new Blob([response], { type: 'application/pdf' });
      
      if (blob.size!==70){



        this.fileName="Reporte de Gastos del Año " + this.year + ".pdf"
        var reader = new FileReader();
        reader.readAsDataURL(response);

        reader.onloadend = function(){
          let base64 = reader.result?.toString();
          
          ref.savePdf(base64 ?? '');

        }

      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteGastosRango(id: string | null,  categoria: string|null, inicio: string|undefined, final: string|undefined){
    this.transacciones_service.getReporteGastosRango(id, categoria, inicio, final).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });

      if (blob.size!==70){
        this.fileName="Reporte de Gastos del " + inicio + " al " + final + ".pdf";
        var reader = new FileReader();
        reader.readAsDataURL(response);
        let ref = this;
        reader.onloadend = function(){
          let base64 = reader.result?.toString();
          
          ref.savePdf(base64 ?? ''); 
        }
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }


  savePdf(base64: string | Blob){
    Filesystem.writeFile({
      path: this.fileName,
      data: base64,
      directory: Directory.Documents,
    }).then((res)=>{
      alert("Archivo guardado en " + res.uri);
    }, (err)=>{
      alert(err)
    })
  }


}
