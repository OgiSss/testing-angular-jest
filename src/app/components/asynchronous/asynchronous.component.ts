import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asynchronous',
  templateUrl: './asynchronous.component.html',
  styleUrls: ['./asynchronous.component.scss'],
})
export class AsynchronousComponent implements OnInit {
  timeout: string = '';

  constructor() {}

  ngOnInit(): void {}

  public setTimeoutMethod() {
    setTimeout(() => {
      console.log('settimeout');
      this.timeout = 'checked';
    }, 100);
  }

  public asyncMethodWithPromise(){
    return new Promise((resolve)=>{
      setTimeout(() => {
          this.timeout = '123';
          resolve('test')
      }, 1000);
    })
  }
}
