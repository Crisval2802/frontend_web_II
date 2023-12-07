import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaI } from 'src/app/interfaces/categorias';
import { TransaccionI } from 'src/app/interfaces/transaccion';
import { TransaccionesService } from 'src/app/servicios/transacciones.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import * as FileSaver from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart, ChartType } from 'chart.js/auto';
import { DialogVerImagenComponent } from './componentes/dialog-ver-imagen/dialog-ver-imagen.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  constructor(private transacciones_service: TransaccionesService,
              private usuario_service: UsuarioService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog){}

  

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
  displayedColumns: string[] = ['cuenta','categoria', 'subcategoria', 'cantidad', 'comentarios', 'fecha', 'foto'];
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


  //Cosas para graficas
  @ViewChild('graficoGastosDia', { static: true }) graficoGastosDia: ElementRef | undefined;
  totalPorFechaGastosDia: { [cuenta: string]: number } = {};
  public chartGastosDia: any;

  @ViewChild('graficoGastosMes', { static: true }) graficoGastosMes: ElementRef | undefined;
  totalPorFechaGastosMes: { [cuenta: string]: number } = {};
  public chartGastosMes: any;

  @ViewChild('graficoGastosSemana', { static: true }) graficoGastosSemana: ElementRef | undefined;
  totalPorFechaGastosSemana: { [cuenta: string]: number } = {};
  public chartGastosSemana: any;

  @ViewChild('graficoGastosYear', { static: true }) graficoGastosYear: ElementRef | undefined;
  totalPorFechaGastosYear: { [cuenta: string]: number } = {};
  public chartGastosYear: any;

  @ViewChild('graficoGastosRango', { static: true }) graficoGastosRango: ElementRef | undefined;
  totalPorFechaGastosRango: { [cuenta: string]: number } = {};
  public chartGastosRango: any;

  
  @ViewChild('graficoIngresosDia', { static: true }) graficoIngresosDia: ElementRef | undefined;
  totalPorFechaIngresosDia: { [cuenta: string]: number } = {};
  public chartIngresosDia: any;

  @ViewChild('graficoIngresosMes', { static: true }) graficoIngresosMes: ElementRef | undefined;
  totalPorFechaIngresosMes: { [cuenta: string]: number } = {};
  public chartIngresosMes: any;

  @ViewChild('graficoIngresosSemana', { static: true }) graficoIngresosSemana: ElementRef | undefined;
  totalPorFechaIngresosSemana: { [cuenta: string]: number } = {};
  public chartIngresosSemana: any;

  @ViewChild('graficoIngresosYear', { static: true }) graficoIngresosYear: ElementRef | undefined;
  totalPorFechaIngresosYear: { [cuenta: string]: number } = {};
  public chartIngresosYear: any;


  @ViewChild('graficoIngresosRango', { static: true }) graficoIngresosRango: ElementRef | undefined;
  totalPorFechaIngresosRango: { [cuenta: string]: number } = {};
  public chartIngresosRango: any;

  ngOnInit(): void {
    this.obtenerIngresosDia(localStorage.getItem('id'),"0");
    this.obtenerIngresosSemana(localStorage.getItem('id'),"0");
    this.obtenerIngresosMes(localStorage.getItem('id'),"0");
    this.obtenerIngresosYear(localStorage.getItem('id'),"0");
    this.obtenerIngresosRango(localStorage.getItem('id'),"0", this.fecha, this.fecha);

    this.obtenerGastosDia(localStorage.getItem('id'),"0");
    this.obtenerGastosSemana(localStorage.getItem('id'),"0");
    this.obtenerGastosMes(localStorage.getItem('id'),"0");
    this.obtenerGastosYear(localStorage.getItem('id'),"0");
    this.obtenerGastosRango(localStorage.getItem('id'),"0", this.fecha, this.fecha);

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

       //Construccion del grafico
       this.dataSourceIngresosDia.data.forEach(item =>{
        const cuenta = item.nombre_cuenta;
        if (!this.totalPorFechaIngresosDia[cuenta]){
        // Si no hay una entrada, inicializarla con la cantidad de la transacción
        this.totalPorFechaIngresosDia[cuenta] = item.cantidad;
        } else {
          // Si ya hay una entrada, sumar la cantidad de la transacción a la existente
          this.totalPorFechaIngresosDia[cuenta] += item.cantidad;
        }
      })
      var cuentas=Object.keys(this.totalPorFechaIngresosDia);
      var cantidades=Object.values(this.totalPorFechaIngresosDia);



      if (this.chartIngresosDia) {
        this.chartIngresosDia.destroy();
      }

      const ctx = this.graficoIngresosDia?.nativeElement.getContext('2d');
      this.chartIngresosDia = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: cuentas,
          datasets: [{
            label: 'Total por cuentas',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });

      this.totalPorFechaIngresosDia = {};
    });
  }

  obtenerIngresosSemana(id: string | null,  categoria: string|null){
    this.transacciones_service.getIngresosSemana(id, categoria).subscribe(data =>{
      this.dataSourceIngresosSemana.data= data.Transacciones;
      this.inicio_semana=data.Inicio;
      this.fin_semana=data.Final;

       //Construccion del grafico
       this.dataSourceIngresosSemana.data.forEach(item =>{
        const cuenta = item.nombre_cuenta;
        if (!this.totalPorFechaIngresosSemana[cuenta]){
        // Si no hay una entrada, inicializarla con la cantidad de la transacción
        this.totalPorFechaIngresosSemana[cuenta] = item.cantidad;
        } else {
          // Si ya hay una entrada, sumar la cantidad de la transacción a la existente
          this.totalPorFechaIngresosSemana[cuenta] += item.cantidad;
        }
      })
      var cuentas=Object.keys(this.totalPorFechaIngresosSemana);
      var cantidades=Object.values(this.totalPorFechaIngresosSemana);



      if (this.chartIngresosSemana) {
        this.chartIngresosSemana.destroy();
      }

      const ctx = this.graficoIngresosSemana?.nativeElement.getContext('2d');
      this.chartIngresosSemana = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: cuentas,
          datasets: [{
            label: 'Total por cuentas',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });

      this.totalPorFechaIngresosSemana = {};
    });
  }

  obtenerIngresosMes(id: string | null,  categoria: string|null){
    this.transacciones_service.getIngresosMes(id, categoria).subscribe(data =>{
      this.dataSourceIngresosMes.data= data.Transacciones;

       //Construccion del grafico
       this.dataSourceIngresosMes.data.forEach(item =>{
        const cuenta = item.nombre_cuenta;
        if (!this.totalPorFechaIngresosMes[cuenta]){
        // Si no hay una entrada, inicializarla con la cantidad de la transacción
        this.totalPorFechaIngresosMes[cuenta] = item.cantidad;
        } else {
          // Si ya hay una entrada, sumar la cantidad de la transacción a la existente
          this.totalPorFechaIngresosMes[cuenta] += item.cantidad;
        }
      })
      var cuentas=Object.keys(this.totalPorFechaIngresosMes);
      var cantidades=Object.values(this.totalPorFechaIngresosMes);



      if (this.chartIngresosMes) {
        this.chartIngresosMes.destroy();
      }

      const ctx = this.graficoIngresosMes?.nativeElement.getContext('2d');
      this.chartIngresosMes = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: cuentas,
          datasets: [{
            label: 'Total por cuentas',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });

      this.totalPorFechaIngresosMes = {};
    });
  }

  obtenerIngresosYear(id: string | null,  categoria: string|null){
    this.transacciones_service.getIngresosYear(id, categoria).subscribe(data =>{
      this.dataSourceIngresosYear.data= data.Transacciones;

       //Construccion del grafico
       this.dataSourceIngresosYear.data.forEach(item =>{
        const cuenta = item.nombre_cuenta;
        if (!this.totalPorFechaIngresosYear[cuenta]){
        // Si no hay una entrada, inicializarla con la cantidad de la transacción
        this.totalPorFechaIngresosYear[cuenta] = item.cantidad;
        } else {
          // Si ya hay una entrada, sumar la cantidad de la transacción a la existente
          this.totalPorFechaIngresosYear[cuenta] += item.cantidad;
        }
      })
      var cuentas=Object.keys(this.totalPorFechaIngresosYear);
      var cantidades=Object.values(this.totalPorFechaIngresosYear);



      if (this.chartIngresosYear) {
        this.chartIngresosYear.destroy();
      }

      const ctx = this.graficoIngresosYear?.nativeElement.getContext('2d');
      this.chartIngresosYear = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: cuentas,
          datasets: [{
            label: 'Total por cuentas',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });

      this.totalPorFechaIngresosYear = {};
    });
  }

  obtenerIngresosRango(id: string | null,  categoria: string|null, inicio: string|undefined, final: string|undefined){
    this.transacciones_service.getIngresosRango(id, categoria, inicio, final).subscribe(data =>{
      this.dataSourceIngresosRango.data= data.Transacciones;

       //Construccion del grafico
       this.dataSourceIngresosRango.data.forEach(item =>{
        const cuenta = item.nombre_cuenta;
        if (!this.totalPorFechaIngresosRango[cuenta]){
        // Si no hay una entrada, inicializarla con la cantidad de la transacción
        this.totalPorFechaIngresosRango[cuenta] = item.cantidad;
        } else {
          // Si ya hay una entrada, sumar la cantidad de la transacción a la existente
          this.totalPorFechaIngresosRango[cuenta] += item.cantidad;
        }
      })
      var cuentas=Object.keys(this.totalPorFechaIngresosRango);
      var cantidades=Object.values(this.totalPorFechaIngresosRango);



      if (this.chartIngresosRango) {
        this.chartIngresosRango.destroy();
      }

      const ctx = this.graficoIngresosRango?.nativeElement.getContext('2d');
      this.chartIngresosRango = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: cuentas,
          datasets: [{
            label: 'Total por cuentas',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });

      this.totalPorFechaIngresosRango = {};
    });
  }

  //obtener gastos

  obtenerGastosDia(id: string | null,  categoria: string|null){
    this.transacciones_service.getGastosDia(id,categoria).subscribe(data =>{
      this.dataSourceGastosDia.data= data.Transacciones;

      //Construccion del grafico
      this.dataSourceGastosDia.data.forEach(item =>{
        const cuenta = item.nombre_cuenta;
        if (!this.totalPorFechaGastosDia[cuenta]){
        // Si no hay una entrada, inicializarla con la cantidad de la transacción
        this.totalPorFechaGastosDia[cuenta] = item.cantidad;
        } else {
          // Si ya hay una entrada, sumar la cantidad de la transacción a la existente
          this.totalPorFechaGastosDia[cuenta] += item.cantidad;
        }
      })
      var cuentas=Object.keys(this.totalPorFechaGastosDia);
      var cantidades=Object.values(this.totalPorFechaGastosDia);



      if (this.chartGastosDia) {
        this.chartGastosDia.destroy();
      }

      const ctx = this.graficoGastosDia?.nativeElement.getContext('2d');
      this.chartGastosDia = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: cuentas,
          datasets: [{
            label: 'Total por cuentas',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });

      this.totalPorFechaGastosDia = {};
    });
  }

  obtenerGastosSemana(id: string | null,  categoria: string|null){
    this.transacciones_service.getGastosSemana(id, categoria).subscribe(data =>{
      this.dataSourceGastosSemana.data= data.Transacciones;
      this.inicio_semana=data.Inicio;
      this.fin_semana=data.Final;



      //Construccion del grafico
      this.dataSourceGastosSemana.data.forEach(item =>{
        const cuenta = item.nombre_cuenta;
        if (!this.totalPorFechaGastosSemana[cuenta]){
        // Si no hay una entrada, inicializarla con la cantidad de la transacción
        this.totalPorFechaGastosSemana[cuenta] = item.cantidad;
        } else {
          // Si ya hay una entrada, sumar la cantidad de la transacción a la existente
          this.totalPorFechaGastosSemana[cuenta] += item.cantidad;
        }
      })
      var cuentas=Object.keys(this.totalPorFechaGastosSemana);
      var cantidades=Object.values(this.totalPorFechaGastosSemana);



      if (this.chartGastosSemana) {
        this.chartGastosSemana.destroy();
      }

      const ctx = this.graficoGastosSemana?.nativeElement.getContext('2d');
      this.chartGastosSemana = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: cuentas,
          datasets: [{
            label: 'Total por cuentas',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });

      this.totalPorFechaGastosSemana = {};

    });
  }

  obtenerGastosMes(id: string | null,  categoria: string|null){
    this.transacciones_service.getGastosMes(id, categoria).subscribe(data =>{
      this.dataSourceGastosMes.data= data.Transacciones;


      //Construccion del grafico
      this.dataSourceGastosMes.data.forEach(item =>{
        const cuenta = item.nombre_cuenta;
        if (!this.totalPorFechaGastosMes[cuenta]){
        // Si no hay una entrada, inicializarla con la cantidad de la transacción
        this.totalPorFechaGastosMes[cuenta] = item.cantidad;
        } else {
          // Si ya hay una entrada, sumar la cantidad de la transacción a la existente
          this.totalPorFechaGastosMes[cuenta] += item.cantidad;
        }
      })
      var cuentas=Object.keys(this.totalPorFechaGastosMes);
      var cantidades=Object.values(this.totalPorFechaGastosMes);



      if (this.chartGastosMes) {
        this.chartGastosMes.destroy();
      }

      const ctx = this.graficoGastosMes?.nativeElement.getContext('2d');
      this.chartGastosMes = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: cuentas,
          datasets: [{
            label: 'Total por cuentas',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });

      this.totalPorFechaGastosMes = {};
    });
  }

  obtenerGastosYear(id: string | null,  categoria: string|null){
    this.transacciones_service.getGastosYear(id, categoria).subscribe(data =>{
      this.dataSourceGastosYear.data= data.Transacciones;


      //Construccion del grafico
      this.dataSourceGastosYear.data.forEach(item =>{
        const cuenta = item.nombre_cuenta;
        if (!this.totalPorFechaGastosYear[cuenta]){
        // Si no hay una entrada, inicializarla con la cantidad de la transacción
        this.totalPorFechaGastosYear[cuenta] = item.cantidad;
        } else {
          // Si ya hay una entrada, sumar la cantidad de la transacción a la existente
          this.totalPorFechaGastosYear[cuenta] += item.cantidad;
        }
      })
      var cuentas=Object.keys(this.totalPorFechaGastosYear);
      var cantidades=Object.values(this.totalPorFechaGastosYear);
      const ctx = this.graficoGastosYear?.nativeElement.getContext('2d');

      if (this.chartGastosYear) {
        this.chartGastosYear.destroy();
      }


      this.chartGastosYear = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: cuentas,
          datasets: [{
            label: 'Total por cuentas',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });

      this.totalPorFechaGastosYear = {};

    });
  }

  obtenerGastosRango(id: string | null,  categoria: string|null, inicio: string|undefined, final: string|undefined){
    this.transacciones_service.getGastosRango(id, categoria, inicio, final).subscribe(data =>{
      this.dataSourceGastosRango.data= data.Transacciones;

      //Construccion del grafico
      this.dataSourceGastosRango.data.forEach(item =>{
        const cuenta = item.nombre_cuenta;
        if (!this.totalPorFechaGastosRango[cuenta]){
        // Si no hay una entrada, inicializarla con la cantidad de la transacción
        this.totalPorFechaGastosRango[cuenta] = item.cantidad;
        } else {
          // Si ya hay una entrada, sumar la cantidad de la transacción a la existente
          this.totalPorFechaGastosRango[cuenta] += item.cantidad;
        }
      })
      var cuentas=Object.keys(this.totalPorFechaGastosRango);
      var cantidades=Object.values(this.totalPorFechaGastosRango);
      const ctx = this.graficoGastosRango?.nativeElement.getContext('2d');
     
      if (this.chartGastosRango) {
        this.chartGastosRango.destroy();
      }

      this.chartGastosRango = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: cuentas,
          datasets: [{
            label: 'Total por cuentas',
            data: cantidades,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        }
      });

      this.totalPorFechaGastosRango= {};

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
      const blob = new Blob([response], { type: 'application/pdf' });

      if (blob.size!==70){
        FileSaver.saveAs(blob, "Reporte de Ingresos del dia " + this.fecha +  ".pdf");
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteIngresosSemana(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteIngresosSemana(id, categoria).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });

      if (blob.size!==70){
        FileSaver.saveAs(blob, "Reporte de Ingresos de la semana del " + this.inicio_semana + " al " + this.fin_semana + ".pdf");
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }


  obtenerReporteIngresosMes(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteIngresosMes(id, categoria).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });

      if (blob.size!==70){
        FileSaver.saveAs(blob, "Reporte de Ingresos del mes de " + this.mes +  " del año " + this.year + ".pdf");
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteIngresosYear(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteIngresosYear(id, categoria).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });

      if (blob.size!==70){
        FileSaver.saveAs(blob, "Reporte de Ingresos del Año " + this.year + ".pdf");
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteIngresosRango(id: string | null,  categoria: string|null, inicio: string|undefined, final: string|undefined){
    this.transacciones_service.getReporteIngresosRango(id, categoria, inicio, final).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });
      console.log(blob);
      if (blob.size!==70){
        FileSaver.saveAs(blob, "Reporte de Ingresos del " + inicio + " al " + final + ".pdf");
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }


  //reportes de gastos
  obtenerReporteGastosDia(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteGastosDia(id, categoria).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });

      if (blob.size!==70){
        FileSaver.saveAs(blob, "Reporte de Gastos del dia " + this.fecha +  ".pdf");
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteGastosSemana(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteGastosSemana(id, categoria).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });

      if (blob.size!==70){
        FileSaver.saveAs(blob, "Reporte de Gastos de la semana del " + this.inicio_semana + " al " + this.fin_semana + ".pdf");
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteGastosMes(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteGastosMes(id, categoria).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });

      if (blob.size!==70){
        FileSaver.saveAs(blob,"Reporte de Gastos del mes de " + this.mes +  " del año " + this.year + ".pdf");
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteGastosYear(id: string | null,  categoria: string|null){
    this.transacciones_service.getReporteGastosYear(id, categoria).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });

      if (blob.size!==70){
        FileSaver.saveAs(blob, "Reporte de Gastos del Año " + this.year + ".pdf");
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }

  obtenerReporteGastosRango(id: string | null,  categoria: string|null, inicio: string|undefined, final: string|undefined){
    this.transacciones_service.getReporteGastosRango(id, categoria, inicio, final).subscribe((response:Blob)=>{
      const blob = new Blob([response], { type: 'application/pdf' });
      console.log(blob);
      if (blob.size!==70){
        FileSaver.saveAs(blob, "Reporte de Gastos del " + inicio + " al " + final + ".pdf");
      }else{
        this._snackBar.open("Error, No se puede generar un reporte vacio", "Cerrar" ,{duration: 5000})
      }

    });
  }


  openDialogImagen(url: string): void {
    const dialogRef = this.dialog.open(DialogVerImagenComponent, {
      data: {url:'https://crisval.pythonanywhere.com//media/' + url},
     
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  
}
