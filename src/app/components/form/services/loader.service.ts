import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loader = false;

  constructor() { }

  public setLoaderState(value: boolean) {
    this.loader = value;
  }
}
