import { HttpErrorResponse } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { DialogConfigModel, DialogTypeEnum, FormComponent, WorkerModel } from './form.component';
import { DialogService } from './services/dialog.service';
import { LoaderService } from './services/loader.service';
import { WorkerService } from './services/worker.service';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let workerServiceMock: any;
  let loaderServiceMock: any;
  let dialogServiceMock: any;

  beforeEach(async () => {
    workerServiceMock = {
      submitWorker: jest.fn(),
    };
    loaderServiceMock = {
      setLoaderState: jest.fn(),
    };
    dialogServiceMock = {
      showDialog: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        {
          provide: WorkerService,
          useValue: workerServiceMock,
        },
        {
          provide: LoaderService,
          useValue: loaderServiceMock,
        },
        {
          provide: DialogService,
          useValue: dialogServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should generate worker form base on worker model', () => {
      const worker = {
        active: true,
        id: '123',
        name: 'TEst worker',
        role: ['menager'],
      };

      component.worker = worker;
      const generateWorkerFormSpy = jest.spyOn(component, 'generateWorkerForm');

      component.ngOnInit();

      expect(generateWorkerFormSpy).toHaveBeenCalledWith(worker);
    });
  });

  describe('generateWorkerForm', () => {
    it('should generate form with passed values', () => {
      const worker = {
        active: true,
        id: 'worker1',
        name: 'Test worker',
        role: ['manager'],
      };

      component.generateWorkerForm(worker);

      expect(component.workerForm.value).toEqual(worker);
    });

    it('should generate form with default values', () => {
      const expectedResult = {
        active: true,
        id: expect.any(String),
        name: null,
        role: [],
      };

      component.generateWorkerForm();

      expect(component.workerForm.value).toEqual(expectedResult);
    });
  });

  describe('workerForm', ()=>{
    describe('Validations', () =>{

    beforeEach(()=>{
      const worker = {
        active: true,
        id: 'worker1',
        name: 'Test worker',
        role: ['manager'],
      };

      component.generateWorkerForm(worker);

    });

    it('should id control be valid', () => {
      const id =  component.workerForm.get('id');
 
      id?.setValue('test')
 
       expect(id?.valid).toBeTruthy();
     });

    it('should id control be invalid', () => {
     const id =  component.workerForm.get('id');

     id?.setValue('')

      expect(id?.valid).toBeFalsy();
    });



     it('should name control be valid', () => {
      const name =  component.workerForm.get('name');
 
      name?.setValue('test')
 
       expect(name?.valid).toBeTruthy();
     });

     it('should name control with empty string be invalid', () => {
      const name =  component.workerForm.get('name');
 
      name?.setValue('')
 
       expect(name?.valid).toBeFalsy();
     });

     it('should name control with over 100 letters be invalid', () => {
      const name =  component.workerForm.get('name');
 
      name?.setValue(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`)
 
       expect(name?.valid).toBeFalsy();
     });
 
     it('should role control be valid', () => {
      const role =  component.workerForm.get('role');
 
      role?.setValue([])
 
       expect(role?.valid).toBeTruthy();
     });

     it('should role control with 6 elements be invalid', () => {
      const role =  component.workerForm.get('role');
 
      role?.setValue(['1','2','3','4','5','6'])
 
       expect(role?.valid).toBeFalsy();
     });

  })
})

  describe('submitWorkerForm', () => {
    describe('Form not valid', () => {
      it('should not be called submitWorker', () => {
        const worker = {
          active: true,
          id: '123',
          name: '',
          role: [],
        };
        jest.spyOn(workerServiceMock, 'submitWorker');

        component.generateWorkerForm(worker);
        component.submitWorkerForm();

        expect(workerServiceMock.submitWorker).not.toHaveBeenCalled();
      });
    });

    describe('Form is valid', () => {
      let worker: WorkerModel;
      beforeEach(() => {
        worker = {
          active: true,
          id: 'worker1',
          name: 'Test worker',
          role: ['manager'],
        };
        component.generateWorkerForm(worker);
      });

      it('should be called submitWorker', () => {
        jest
          .spyOn(workerServiceMock, 'submitWorker')
          .mockReturnValue(of(worker));

        component.submitWorkerForm();

        expect(workerServiceMock.submitWorker).toHaveBeenCalledWith(worker);
      });

      it('should set isSubmitting', () => {
        jest
          .spyOn(workerServiceMock, 'submitWorker')
          .mockReturnValue(of(worker));

        component.submitWorkerForm();

        expect(component.isSubmitting).toBe(false);
      });

      it('should be called loaderService.setLoaderState with true', () => {
        jest.spyOn(loaderServiceMock, 'setLoaderState');
        jest
          .spyOn(workerServiceMock, 'submitWorker')
          .mockReturnValue(of(worker));

        component.submitWorkerForm();

        expect(loaderServiceMock.setLoaderState).toHaveBeenCalledWith(true);
      });

      describe('submission successful', () => {
        let response: WorkerModel;
        beforeEach(() => {
          response = {
            active: true,
            id: 'Response',
            name: 'Response ',
            role: ['Response'],
          };
          jest
            .spyOn(workerServiceMock, 'submitWorker')
            .mockReturnValue(of(response));
        });

        it('should set this.worker', () => {
          component.submitWorkerForm();

          expect(component.worker).toEqual(response);
        });

        it('should set isSubmitting with false', () => {
          component.submitWorkerForm();

          expect(component.isSubmitting).toEqual(false);
        });

        it('should set loaderService.setLoaderState with false', () => {
          component.submitWorkerForm();

          expect(loaderServiceMock.setLoaderState).toHaveBeenCalledWith(false);
        });
      });

      describe('submission failed', () => {
        let response: WorkerModel;
        let error: HttpErrorResponse;
        beforeEach(() => {
          response = {
            active: true,
            id: 'Response',
            name: 'Response ',
            role: ['Response'],
          };

          error = new HttpErrorResponse({
            error: 'Response error',
            statusText: 'Response error status text',
            status: 404,
          });

          jest
            .spyOn(workerServiceMock, 'submitWorker')
            .mockReturnValue(throwError(() => error));
        });

        it('should call handleSubmitWorkerFormError with error', () => {
          // @ts-ignore`
          const handleSubmitWorkerFormErrorMock = jest.spyOn(component,'handleSubmitWorkerFormError');

          component.submitWorkerForm();

          expect(handleSubmitWorkerFormErrorMock).toHaveBeenCalledWith(error);
        });

        it('should call handleSubmitWorkerFormError with error', () => {
          // @ts-ignore`
          const handleSubmitWorkerFormErrorMock = jest.spyOn(component,'handleSubmitWorkerFormError');

          component.submitWorkerForm();

          expect(handleSubmitWorkerFormErrorMock).toHaveBeenCalledWith(error);
        });

        describe('handleSubmitWorkerFormError', () => {
          it('should call dialogService.showDialog with default config', () => {
            error = new HttpErrorResponse({
              error: 'Response error',
              statusText: 'Response error status text',
              status: 404,
            });

            let dialogConfig: DialogConfigModel = {
              subject: 'Ooops 💀',
              message: 'It looks like something went wrong. Please try again..',
              type: DialogTypeEnum.negative,
            };

            // @ts-ignore
            component.handleSubmitWorkerFormError(error);

            expect(dialogServiceMock.showDialog).toHaveBeenCalledWith(dialogConfig);
            expect(loaderServiceMock.setLoaderState).toHaveBeenCalledWith(false);
          });

          it('should call loaderService.setLoaderState with 401 error and not admin permission', () => {
            error = new HttpErrorResponse({
              error: 'notAdmin',
              statusText: 'notAdmin status Text',
              status: 401,
            });

            let dialogConfig: DialogConfigModel = {
              subject: 'Ooops 💀',
              message: 'Only admins members can view these users.',
              type: DialogTypeEnum.negative,
            };

            // @ts-ignore
            component.handleSubmitWorkerFormError(error);

            expect(loaderServiceMock.setLoaderState).toHaveBeenCalledWith(false);
            expect(dialogServiceMock.showDialog).toHaveBeenCalledWith(dialogConfig);
          });
        });
      });
    });
  });
});
