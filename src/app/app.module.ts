import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PaginaPrincipalModule } from './pagina-principal/pagina-principal.module';
import { ApiLoginService } from './servicios/api-login.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



//Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
    PaginaPrincipalModule,
    NoopAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiLoginService,
    multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
