import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
     path: 'login',
      loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'professor',
   loadChildren: () => import('./modules/professor/professor.module').then(m => m.ProfessorModule)
  },
  {
    path: 'course',
    loadChildren: () => import('./modules/course/course.module').then(m => m.CourseModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
