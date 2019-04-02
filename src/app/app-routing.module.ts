import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidationFormComponent } from './validation-form/validation-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'validation-form', component: ValidationFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
