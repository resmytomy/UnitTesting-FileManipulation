import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { FileEditService } from './file-edit.service';
import { HttpResponse } from '@angular/common/http';

describe('FileEditService', () => {
  let service: FileEditService;
  const fakeResp="Prefix12=${appdata}\nsuffix12123=${appdata}"
  const fakeRespAfterUpdate="Prefix12=${appdata}\nsuffix12123=${appdata}\nNew=NewValue"
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileEditService],
    });

    service = TestBed.inject(FileEditService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
    });
    

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get the file content fr',()=>{
    
    service.getfileContent().subscribe((data) => {
      expect(data).toEqual(fakeResp);
    });

    const request = httpTestingController.expectOne('http://localhost:8080/');
    expect(request.request.method).toBe('GET');
    request.flush(fakeResp);
  });
  it('should get the write  content to the file',()=>{
    
  service.updateFileContents('data').subscribe((data) => {
    expect(data).toEqual(fakeResp);
  });
  const request = httpTestingController.expectOne('http://localhost:8080/edit');
  expect(request.request.method).toBe('POST');
  request.flush(fakeResp);

  });
    
    

 


});
