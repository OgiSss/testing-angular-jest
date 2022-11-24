import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from './services/dialog.service';
import { LoaderService } from './services/loader.service';
import { WorkerService } from './services/worker.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input()
  public worker!: WorkerModel;

  public workerForm!: FormGroup;

  public isSubmitting: boolean = false;

  constructor(
    private workerService: WorkerService,
    private loaderService: LoaderService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.generateWorkerForm(this.worker);
  }

  public generateWorkerForm(worker?: WorkerModel): void {
    this.workerForm = new FormGroup({
      id: new FormControl(
        worker && worker.id ? worker.id : `${Math.random()}`,
        {
          validators: [Validators.required],
        }
      ),
      name: new FormControl(worker && worker.name ? worker.name : null, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      role: new FormControl(
        worker && worker.role ? worker.role : [],
        Validators.maxLength(5)
      ),
      active: new FormControl(
        worker && worker.active !== null ? worker.active : true
      ),
    });

  }

  public submitWorkerForm(): void {
    if (this.workerForm.valid) {
      const worker: WorkerModel = this.workerForm.value;

      this.isSubmitting = true;
      this.loaderService.setLoaderState(true);

      this.workerService.submitWorker(worker).subscribe({
        next: (returnedWorker: WorkerModel) => {
          this.worker = returnedWorker;

          this.isSubmitting = false;
          this.loaderService.setLoaderState(false);
        },
        error: (error: HttpErrorResponse) =>
          this.handleSubmitWorkerFormError(error),
      });
    }
  }

  private handleSubmitWorkerFormError(error: HttpErrorResponse): void {
    let dialogConfig: DialogConfigModel = {
      subject: 'Ooops 💀',
      message: 'It looks like something went wrong. Please try again..',
      type: DialogTypeEnum.negative,
    };

    if (error.status === 401) {
      if (error.error === ErrorTypeEnum.notAdmin) {
        dialogConfig.message = 'Only admins members can view these users.';
      }
    }

    this.dialogService.showDialog(dialogConfig);
    this.loaderService.setLoaderState(false);
  }
}

export interface WorkerModel {
  id: string;
  name: string;
  role: string[];
  active: boolean;
}

export enum ErrorTypeEnum {
  notAdmin = 'notAdmin',
  notInTeam = 'notInTeam',
}

export enum DialogTypeEnum {
  'positive',
  'negative',
}

export interface DialogConfigModel {
  subject: string;
  message: string;
  type: DialogTypeEnum;
}
