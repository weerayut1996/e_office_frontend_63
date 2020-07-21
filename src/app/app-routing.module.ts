import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CommandAddFileComponent } from './command-add-file/command-add-file.component';
import { CommandSelectUserComponent } from './command-select-user/command-select-user.component';
import { CommandCheckComponent } from './command-check/command-check.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" }, //redirect หน้าแรกไป Login
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "command-add-file", component: CommandAddFileComponent },
  { path: "command-select-user", component: CommandSelectUserComponent },
  { path: "command-check", component: CommandCheckComponent },
  { path: "about", component: AboutComponent },
  {
    path: "**",
    redirectTo: "/login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
