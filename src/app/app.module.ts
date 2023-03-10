import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from './core/config/_index';
import { ApiResultRequestInterceptor, ErrorRequestInterceptor, JwtInterceptor } from './interceptors/_index';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    })
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfig) => (): Promise<boolean> => config.load(),
      deps: [AppConfig],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApiResultRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
