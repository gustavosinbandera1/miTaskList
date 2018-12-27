import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { TestComponent } from './test/test.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './services/task.service';
import { SocketService } from './services/socket.service';
import { ConexionComponent } from './conexion/conexion.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component:  InicioComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'task',
    component: TaskComponent
  },
  {
    path: 'conexion',
    component: ConexionComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    TestComponent,
    TaskComponent,
    ConexionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  providers: [TaskService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
