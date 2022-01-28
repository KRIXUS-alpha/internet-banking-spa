import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function amountValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value= control.value
      if(!value){
          return null
      }
      const valid = value ? false:true
      return !valid ? {amountVal: true} : null;
    };
  }
