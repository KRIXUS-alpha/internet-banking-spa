import { Directive, Input,  } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";
import { amountValidator } from "../utils/amountValidator";

@Directive({
    selector: '[amountVal]'
})

export class AmountValDirective implements Validator {
    // @Input() sendingPower:number;
    validate(control: AbstractControl): ValidationErrors | null {
        return amountValidator()(control);
    }
}