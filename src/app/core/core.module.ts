import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEsAR from '@angular/common/locales/es-AR';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '@app-env/environment';
import { CustomTranslateLoader } from '@app-core/loaders/custom-translate.loader';
import { SharedModule } from '@app-shared/shared.module';
import { HeaderComponent } from './components/header/header.component';


registerLocaleData(localeEsAR, environment.defaultLanguage);

export function LoaderFactory() {
  return new CustomTranslateLoader();
}

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: LoaderFactory,
      },
    }),
    SharedModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: environment.defaultLanguage
    },
  ],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() core: CoreModule,
    translateService: TranslateService,
    translateLoader: CustomTranslateLoader,
  ) {
    const defaultLanguage = environment.defaultLanguage.split('-')[0];
    translateService.setDefaultLang(defaultLanguage);

    translateLoader.loadTranslation(defaultLanguage).then((response) => {
      translateService.setTranslation(defaultLanguage, response.default);
      translateService.use(defaultLanguage);
    });

    if (core) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}
