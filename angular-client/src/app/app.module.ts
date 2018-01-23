/* Module */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

/* Component */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';

/* Services */
import { ValidatorService } from './services/validator/validator.service';
import { AuthService } from './services/auth/auth.service';
import { ProfileService } from './services/profile/profile.service';
import { FlashMessageService } from './services/flash-message/flash-message.service';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        HeaderComponent,
        FieldErrorDisplayComponent,
        ProfileComponent
    ],
    imports: [
        HttpModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
    ],
    providers: [
        ValidatorService,
        AuthService,
        ProfileService,
        FlashMessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
