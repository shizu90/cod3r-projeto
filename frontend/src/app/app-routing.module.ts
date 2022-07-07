import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { RegisterComponent } from './pages/register/register.component'
import { HomeComponent } from './pages/dashboard/home/home.component'
import { ArticleComponent } from './pages/dashboard/article/article.component'
import { AdminComponent } from './pages/dashboard/admin/admin.component'

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'articles',
        component: ArticleComponent
      },
      {
        path: 'articles/:id',
        component: ArticleComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
