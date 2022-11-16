import { AuthGuard } from './security/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'professor',
    loadChildren: () =>
      import('./modules/professor/professor.module').then(
        (m) => m.ProfessorModule
      ),
  },
  {
    path: 'professor/course',
    loadChildren: () =>
      import('./modules/course/course.module').then((m) => m.CourseModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'professor/course/question',
    loadChildren: () =>
      import('./modules/question/question.module').then(
        (m) => m.QuestionModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'professor/course/question/choice',
    loadChildren: () =>
      import('./modules/choice/choice.module').then((m) => m.ChoiceModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'professor/course/assignment',
    loadChildren: () =>
      import('./modules/assignment/assignment.module').then(
        (m) => m.AssignmentModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'professor/course/assignment/question-assignment',
    loadChildren: () =>
      import('./modules/question-assignment/question-assignment.module').then(
        (m) => m.QuestionAssignmentModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
