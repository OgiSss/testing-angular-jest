import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public data: { someValue: string } | undefined = undefined;
  error: any;
  complete: boolean = false;
  public someData = '';
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getService();
  }
  getService() {
    this.httpService.getGETData().subscribe({
      next: (result: any) => {
        this.data = result;

        this.setSomeData(result);
      },
      error: (error) => {
        this.error = error.statusText;
      },
      complete: () => {
        this.complete = true;
      },
    });
  }

  setSomeData(result: any) {
    if (result.someNumber > 1) {
      this.someData = '>1';
    } else if (result.someNumber < 1) {
      this.someData = '<1';
    } else {
      this.someData = '=1';
    }
  }
}
