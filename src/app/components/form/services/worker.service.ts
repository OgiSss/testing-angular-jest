import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkerModel } from '../form.component';

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  constructor(private httpClient: HttpClient) {}

  public submitWorker(worker: WorkerModel) {
    return this.httpClient.post<WorkerModel>('worker', { worker });
  }
}
