import { AbstractControl } from '@angular/forms';

export interface ReturnType {
[key: string]: boolean;
}

export function dimensionValidator(control: AbstractControl): any | null {

  if (control.value) {
    console.log("Success, image selected ")
  }
  else {
    console.log("fail, image not selected ")
  }
}

