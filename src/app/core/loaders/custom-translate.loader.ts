import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateLoader implements TranslateLoader {
  translations: BehaviorSubject<any>;

  constructor() {
    this.translations = new BehaviorSubject(null);
  }

  getTranslation(lang: string): Observable<any> {
    return this.translations;
  }

  async loadTranslation(lang: string) {
    return await import(`../../../assets/i18n/${lang}`);
  }
}
