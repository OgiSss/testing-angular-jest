import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
    };

    service = new HttpService(httpClientSpy);
  });

  // beforeEach(() => {
  // TestBed.configureTestingModule({
  //   providers: [httpClientSpy]
  // });
  // service = TestBed.inject(HttpService);
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getGETData method and return data', () => {
    // Arrange
    const responseData = {
      someValue: 'some value',
    };

    const url = 'someUrl';

    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(responseData));
    // Act
    service.getGETData();

    // Assert
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should call getGETData method and return data', (done) => {
    // Arrange
    jest.spyOn(console, 'log');
    const responseData = {
      someValue: 'some value',
    };

    const url = 'someUrl';

    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(responseData));
    // Act
    service.getGETData().subscribe(()=>{
      expect(console.log).toHaveBeenCalledWith('Error')
      done()
    })

    // Assert
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should call getGETData and catch error', (done) => {
    // Arrange
    const errorResponse = new HttpErrorResponse({
      error: 'Some error',
      status: 404,
      statusText: 'Not found',
    });

    const url = 'someUrl';

    jest
      .spyOn(httpClientSpy, 'get')
      .mockReturnValue(throwError(() => errorResponse));

    // Act
    service.getGETData().subscribe({
      next: (data) => console.log(data),
      error: (error: HttpErrorResponse) => {
        // expect(error.statusText).toContain(errorResponse.statusText);
        done();
      },
    });

    // Assert
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should call getPOSTData', () => {
    // Arrange
    const responseData = {
      someValue: 'some value',
    };

    const url = 'someUrl';
    const inputData = { data: 'value' };

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(responseData));
    // Act
    service.getPOSTData(inputData);

    // Assert
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.post).toHaveBeenCalledWith(url, { data: inputData });
  });
});
