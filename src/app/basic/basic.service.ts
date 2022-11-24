import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BasicService {
  constructor() {}

  methodWithError() {
    throw new Error('Some error');
  }
}
