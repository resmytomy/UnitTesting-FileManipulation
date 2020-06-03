import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { FileEditorComponent } from './file-editor.component';
import {FileEditService} from '../service/file-edit.service'
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs'; 


describe('FileEditorComponent', () => {
  let component: FileEditorComponent;
  let fixture: ComponentFixture<FileEditorComponent>;
  const fakeResp="Prefix12=${appdata}\nsuffix12123=${appdata}"
  const fakeRespAfterUpdate="Prefix12=${appdata}\nsuffix12123=${appdata}\nNew=NewValue"

  let feditService:FileEditService;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
  
    TestBed.configureTestingModule({
      declarations: [ FileEditorComponent ],
      imports: [HttpClientTestingModule] ,
      providers: [
        FileEditService
      ],
      
    })
    .compileComponents();
    feditService = TestBed.get(FileEditService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileEditorComponent);
    component = fixture.componentInstance;
    component.fileContentList=[ {
      index:0,
      name: "Prefix12",
      value:"${appdata}"
    },
    {
      index:1,
      name: "suffix12123",
      value:"${appdata}"
    }
  ]
    fixture.detectChanges();
  });

  it('should create file editor component ', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnit() and from ngOnit it should call getfileContent()', () => {
    const spy = spyOn(component, 'getfileContent');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  
  it(' formatContent should format the json response', () => {
   
      expect(component.formatContent(fakeResp)).toEqual(component.fileContentList);
  });
  it('should call add on clicking button ADd Row', async(() => {
    spyOn(component, 'add');  
    let button = fixture.debugElement.query(By.css('#add'));
    const native=button.nativeElement;
    const buttonElem=native; 
    buttonElem.click();  
    fixture.whenStable().then(() => {
      expect(component.add).toHaveBeenCalled();
    });
  }));
  
  it ('should add new element when clicking on  add ',()=>{
    component.add();
    expect(component.fileContentList.length  ).toEqual(3);

  })
  it ('should update the list while calling updateList', ()=>{    
    component.updateList(0,'name',{    
      "target": {
        "textContent":"AppData" 
      }
    });
    expect(component.fileContentList[0] ).toEqual( {
      index:0,
      name: "AppData",
      value:"${appdata}"
    });


  });


it("should call getfileContent and return fileContent", async(() => {
 
  spyOn(feditService, 'getfileContent').and.returnValue(of(fakeResp))
  component.getfileContent();
  fixture.detectChanges();
  feditService.getfileContent().subscribe(
    (res) => {
      expect(component.response).toBe(res);
  
    }, (error) => {
      expect(component.response).toBe(error);

    });
  }));

  it(" getfilecontent should return error is there is an error from server", async(() => {
    const mockCall = spyOn(feditService, 'getfileContent')
    .and.returnValue(throwError({status: 404}));
    component.getfileContent();
    fixture.detectChanges();
    feditService.getfileContent().subscribe(
      (res) => {
        expect(component.response).toBe(res);
    
      }, (error) => {
        expect(component.errorMessage).toBe(error);
  
      });
  
  
  }));
 
    it("should call updateFileContents and return fileContent", async(() => {
 
      spyOn(feditService, 'updateFileContents').and.returnValue(of(fakeRespAfterUpdate))
      component.updateAll();
      fixture.detectChanges();
      feditService.updateFileContents(component.fileContentList).subscribe(
        (res) => {
          expect(component.response).toBe(res);
      
        }, (error) => {
          expect(component.errorMessage).toBe(error);
    
        });
 

}));
it(" updateFileContents should return error is there is an error from server", async(() => {
  spyOn(feditService, 'updateFileContents').and.returnValue(throwError({status: 404}));
  component.updateAll();
  fixture.detectChanges();
  feditService.updateFileContents(component.fileContentList).subscribe(
    (res) => {
      expect(component.response).toBe(res);
  
    }, (error) => {
      expect(component.errorMessage).toBe(error);

    });


}));


});
