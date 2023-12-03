import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { AppRoutingModule } from '../app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http'
import { ApiLoginService } from '../servicios/api-login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';



//Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogoTransaccionComponent } from './inicio/componentes/dialogo-transaccion/dialogo-transaccion.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule}  from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';



import { PaginaUsuarioComponent } from './pagina-usuario/pagina-usuario.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { DialogCrearCuentaComponent } from './cuentas/componentes/dialog-crear-cuenta/dialog-crear-cuenta.component';
import { DialogEditarCuentaComponent } from './cuentas/componentes/dialog-editar-cuenta/dialog-editar-cuenta.component';
import { DialogCrearTransferenciaComponent } from './cuentas/componentes/dialog-crear-transferencia/dialog-crear-transferencia.component';
import { DialogVerTransferenciasComponent } from './cuentas/componentes/dialog-ver-transferencias/dialog-ver-transferencias.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { DialogEditarCategoriaComponent } from './categorias/componentes/dialog-editar-categoria/dialog-editar-categoria.component';
import { DialogEditarSubcategoriaComponent } from './categorias/componentes/dialog-editar-subcategoria/dialog-editar-subcategoria.component';
import { DialogCrearCategoriaComponent } from './categorias/componentes/dialog-crear-categoria/dialog-crear-categoria.component';
import { DialogCrearSubcategoriaComponent } from './categorias/componentes/dialog-crear-subcategoria/dialog-crear-subcategoria.component';
import { HistorialComponent } from './historial/historial.component';
import { LimitesComponent } from './limites/limites.component';
import { ObjetivosComponent } from './objetivos/objetivos.component';
import { DialogCrearLimiteComponent } from './limites/componentes/dialog-crear-limite/dialog-crear-limite.component';
import { DialogCrearObjetivoComponent } from './objetivos/componentes/dialog-crear-objetivo/dialog-crear-objetivo.component';
import { DialogEliminarLimiteComponent } from './limites/componentes/dialog-eliminar-limite/dialog-eliminar-limite.component';
import { DialogEliminarObjetivoComponent } from './objetivos/componentes/dialog-eliminar-objetivo/dialog-eliminar-objetivo.component';



@NgModule({
  declarations: [
    InicioComponent,
    BarraSuperiorComponent,
    DialogoTransaccionComponent,
    PaginaUsuarioComponent,
    CuentasComponent,
    DialogCrearCuentaComponent,
    DialogEditarCuentaComponent,
    DialogCrearTransferenciaComponent,
    DialogVerTransferenciasComponent,
    CategoriasComponent,
    DialogEditarCategoriaComponent,
    DialogEditarSubcategoriaComponent,
    DialogCrearCategoriaComponent,
    DialogCrearSubcategoriaComponent,
    HistorialComponent,
    LimitesComponent,
    ObjetivosComponent,
    DialogCrearLimiteComponent,
    DialogCrearObjetivoComponent,
    DialogEliminarLimiteComponent,
    DialogEliminarObjetivoComponent
  
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiLoginService,
    multi: true,
    },
  ],
  bootstrap: [InicioComponent],
  exports:[InicioComponent]
})





export class PaginaPrincipalModule { }
