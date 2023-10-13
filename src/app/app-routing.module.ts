import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina-principal/inicio/inicio.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';


const routes: Routes = [
  {path:'login', component: InicioSesionComponent},
  {path:'inicio', component: InicioComponent},
  {path:'', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
