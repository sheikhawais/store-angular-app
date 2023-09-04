import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'products-store';

    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'ar']);
        translate.setDefaultLang('en');
        translate.use('en');
        document.getElementsByTagName('body')[0].setAttribute('class', 'direction-ltr');
    }
}
