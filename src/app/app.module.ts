import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { TestComponent } from './test/test.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './services/task.service';
import { SocketService } from './services/socket.service';
import { ConexionComponent } from './conexion/conexion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
const ROUTES: Routes = [
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
  },
  {
    path: '',
    redirectTo: 'conexion',
    pathMatch: 'full'
  },
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
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TaskService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
