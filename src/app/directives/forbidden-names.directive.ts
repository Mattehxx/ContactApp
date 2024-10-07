import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appForbiddenNames]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenNamesDirective,
      multi: true
    }
  ]
})
export class ForbiddenNamesDirective implements Validator {

  @Input('appForbiddenNames')
  name: string = '';

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    if(control.value === this.name) {
      return { appForbiddenNames: `${this.name} non è un nome valido` }
    }
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    
  }

}
