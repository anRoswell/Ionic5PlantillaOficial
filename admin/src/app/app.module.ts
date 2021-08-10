import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Interceptors
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Componentes comunes
import { NavbarComponent } from './commons/navbar/navbar.component';
import { LoadingComponent } from './commons/loading/loading.component';

// Componentes
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ErrorComponent } from './pages/error/error.component';
import { MessageComponent } from './commons/message/message.component';
import { FooterComponent } from './commons/footer/footer.component';

// Modulos
import { ReportModule } from './pages/admin/report/report.module';
import { SettingsModule } from './pages/admin/settings/settings.module';
import { StatisticsModule } from './pages/admin/statistics/statistics.module';

import { ChartsModule } from 'ng2-charts';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: 'http://localhost:3000/',
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    NavbarComponent,
    ErrorComponent,
    LoadingComponent,
    FooterComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SettingsModule,
    ReportModule,
    StatisticsModule,
    ChartsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
