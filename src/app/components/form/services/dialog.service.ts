import { Injectable } from '@angular/core';
import { DialogConfigModel } from '../form.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public showDialog(dialogConfig: DialogConfigModel) {
    console.log(dialogConfig);
  }
}
