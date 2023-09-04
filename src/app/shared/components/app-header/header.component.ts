import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import {TranslateService, TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [TranslateModule, MatButtonModule],
  standalone: true,
})
export class HeaderComponent {

    isAdmin: boolean = localStorage.getItem('isAdmin') === 'true' ? true : false;
    currentLanguage: string = '';

    constructor(
        private router: Router,
        private translate: TranslateService
    ) { 
        this.currentLanguage = translate.currentLang;
    }

    changeLanguage(language: string) {
        this.translate.use(language);
        this.currentLanguage = language;
        document.getElementsByTagName('body')[0].setAttribute('class', this.currentLanguage === 'ar' ? 'direction-rtl' : 'direction-ltr');
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
    }
}
