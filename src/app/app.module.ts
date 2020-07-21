import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { CommandAddFileComponent } from './command-add-file/command-add-file.component';
import { DragulaModule } from 'ng2-dragula';
import { CommandSelectUserComponent } from './command-select-user/command-select-user.component';
import { CommandCheckComponent } from './command-check/command-check.component';
import { AboutComponent } from './about/about.component';
import { LogoutComponent } from './logout/logout.component';
import { UserDocumentListComponent } from './user-document-list/user-document-list.component';
import { OwnerListDocumentComponent } from './owner-list-document/owner-list-document.component';
import { UserSettingComponent } from './user-setting/user-setting.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CommandAddFileComponent,
    CommandSelectUserComponent,
    CommandCheckComponent,
    AboutComponent,
    LogoutComponent,
    UserDocumentListComponent,
    OwnerListDocumentComponent,
    UserSettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
