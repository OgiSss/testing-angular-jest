import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpService } from '../../http/http.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpServiceMock: any;
  beforeEach(async () => {
    httpServiceMock = {
      getGETData: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: HttpService, useValue: httpServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create and call init data', () => {
    const response = { name: 'name', surname: 'surname', someNumber: 1 };
    jest.spyOn(httpServiceMock, 'getGETData').mockReturnValue(of(response));
    fixture.detectChanges();

    expect(httpServiceMock.getGETData).toHaveBeenCalledTimes(1);
    expect(component).toBeTruthy();
    expect(component.data).toBe(response);
  });

  it('should create and call init data', () => {
    const errorMessage = new HttpErrorResponse({
      error: 'Error test',
      status: 404,
      statusText: 'Tes 123',
    });
    jest
      .spyOn(httpServiceMock, 'getGETData')
      .mockReturnValue(throwError( ()=> errorMessage));
    fixture.detectChanges();

    expect(httpServiceMock.getGETData).toHaveBeenCalledTimes(1);
    expect(component.error).toBe(errorMessage.statusText);
  });

  it('should create and call init data then call setSomeData', () => {
    const response = { name: 'name', surname: 'surname', someNumber: 1 };
    jest.spyOn(httpServiceMock, 'getGETData').mockReturnValue(of(response));
    fixture.detectChanges();

    expect(httpServiceMock.getGETData).toHaveBeenCalledTimes(1);
    expect(component).toBeTruthy();
    expect(component.data).toBe(response);

    expect(component.someData).toBe('=1')

  });

  it('should create and call init data then call setSomeData', () => {
    const response = { name: 'name', surname: 'surname', someNumber: 2 };
    jest.spyOn(httpServiceMock, 'getGETData').mockReturnValue(of(response));
    fixture.detectChanges();

    expect(httpServiceMock.getGETData).toHaveBeenCalledTimes(1);
    expect(component).toBeTruthy();
    expect(component.data).toBe(response);

    expect(component.someData).toBe('>1')

  });

  it('should create and call init data then call setSomeData', () => {
    const response = { name: 'name', surname: 'surname', someNumber: 0 };
    jest.spyOn(httpServiceMock, 'getGETData').mockReturnValue(of(response));
    fixture.detectChanges();

    expect(httpServiceMock.getGETData).toHaveBeenCalledTimes(1);
    expect(component).toBeTruthy();
    expect(component.data).toBe(response);

    expect(component.someData).toBe('<1')

  });
});
