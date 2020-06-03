import { Component, OnInit } from '@angular/core';
import { FileEditService } from '../service/file-edit.service';
import {fileContent} from './fileContents';

@Component({
  selector: 'app-file-editor',
  templateUrl: './file-editor.component.html',
  styleUrls: ['./file-editor.component.scss']
})
export class FileEditorComponent {

  constructor(private fileEditorService: FileEditService) {}
  contents;
  i:number=0;
 fileContentList :fileContent[]=[]; 
 response :any;
 
  loading: boolean = false;
  errorMessage
  ngOnInit(): void {
    console.log("Start")
    this.getfileContent();
    console.log('this.getfile') 
   }
  public getfileContent() {
    console.log('inside this')
    this.errorMessage = "";
    this.fileEditorService.getfileContent()
      .subscribe(
        (response) => {                          
        this.response=response;
          this.formatContent(response);
          this.contents=[{content:response}]
        },
        (error) => {                           
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        )
  }

  public formatContent(responses){
    var array =[];
    var keyValue=[];
    this.fileContentList=[];
  
    array=responses.split(/\r?\n/);

    for (var value of array) {
       keyValue=value.split("=");
       console.log(keyValue.length)
       if(keyValue.length==2){
      const  content:fileContent={index : this.i,name :keyValue[0],
       value:keyValue[1]
      };
       this.fileContentList.push(content);
        this. i=this.i+1;
    }
    }
    
return this.fileContentList;
  }
 
  editField: string;
 

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    event.target.textContent=editField;
    this.fileContentList[id][property] = editField;
    console.log('updatted list');
   console.log(this.fileContentList);
   this.editField='';
  }

  updateAll() {
    console.log('inside update')
    this.fileEditorService.updateFileContents(this.fileContentList)
    .subscribe(
      (response) => {                          
        console.log('response received'+response)
      this.response=response;
        console.log(response);
        window.alert("Updated Sucessfully");
        this.formatContent(response);
       
      },
      (error) => {                
        console.error('Request failed with error')
        this.errorMessage = error;
        this.loading = false;
      },
      )
  }

  add() {
    
   const  content:fileContent={index : this.i,name :'',
      value:''
     };
      this.fileContentList.push(content);
       this. i=this.i+1;
  }

 
}
