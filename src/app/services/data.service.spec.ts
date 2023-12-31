import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Data } from '@angular/router';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests after each test
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('should get data successfully', () => {
    const testData: Data[] = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];

    // Make an HTTP request
    service.data$.subscribe((data) => {
      expect(data).toEqual(testData);
    });

    // Expect a single request to the specified URL
    const req = httpTestingController.expectOne('assets/data.json');

    // Respond with the mock data
    req.flush({ data: testData });
  });

  it('should handle HTTP error', () => {
    // Subscribe to the data$ observable
    const subscription = service.data$.subscribe(
      () => {
        // If it reaches here, the test should fail
        fail('should have failed with an error');
      },
      (error) => {
        // Expect an error and add any necessary expectations
        expect(error).toBeTruthy();
      }
    );

    // Expect a single request to the specified URL
    const req = httpTestingController.expectOne('assets/data.json');

    // Respond with an error
    req.error(new ErrorEvent('Network error'));

    // Clean up the subscription
    subscription.unsubscribe();
  });
});
