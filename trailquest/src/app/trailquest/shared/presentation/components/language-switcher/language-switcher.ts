import {Component, inject} from '@angular/core';
import {MatButtonToggleChange, MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

/**
 * Select buttons used to switch the application language between English and Spanish.
 *
 * @author Leonardo Lopez Torres
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  private translate = inject(TranslateService);

  /**
   * Languages offered by the switcher.
   */
  readonly languages = [
    {code: 'en', label: 'EN'},
    {code: 'es', label: 'ES'}
  ];

  /**
   * Signal with the language currently in use.
   */
  readonly currentLanguage = this.translate.currentLang;

  /**
   * Switches the application language.
   * @param event - Change event emitted by the button toggle group.
   */
  changeLanguage(event: MatButtonToggleChange): void {
    this.translate.use(event.value).subscribe();
  }
}
