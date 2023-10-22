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
import { DialogoTransaccionComponent } from './dialogo-transaccion/dialogo-transaccion.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [
    InicioComponent,
    BarraSuperiorComponent,
    DialogoTransaccionComponent
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
    MatInputModule

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
