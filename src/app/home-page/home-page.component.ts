import { Component, OnDestroy, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';
import { ProductMain } from '../productMain';
import * as _ from 'lodash';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit,OnDestroy {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;


  searchValue: string = '';

   product: Product = {
    siteCode: 0,
    siteName: '-',
    btsId: '-',
    rncId: 0,
    wbtsId: 0,
    bscId: 0,
    bcfId: 0,
    oamIp: '-',
    existingSiteConfig: '-',
    newSiteConfig: '-'
  };

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private dataService: DataService,private formBuilder: FormBuilder) { }

  ngOnInit() : void {
   this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  onFileSelect(event) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile')?.setValue(file);
      }
    }
  }

  onFormSubmit() {
    if (!this.fileUploadForm.get('myfile')?.value) {
      alert('Please select the file first!');
      return false;
    }
    
    this.dataService.uploadFile(this.fileUploadForm.get('myfile')?.value).subscribe((data:ProductMain)=>{
      if(data.success==true){
        alert(data.message)
      }else{
        alert(data.message)
      }
    })
    return true
  }

  performSearch() {
    this.dataService.sendGetRequest(this.searchValue).subscribe((data:ProductMain)=>{
      if(data.success==true){
        this.product.siteCode = data.data.siteCode
      this.product.siteName = data.data.siteName
      this.product.btsId = data.data.btsId
      this.product.rncId = data.data.rncId
      this.product.wbtsId = data.data.wbtsId
      this.product.bscId = data.data.bscId
      this.product.bcfId = data.data.bcfId
      this.product.oamIp = data.data.oamIp
      this.product.existingSiteConfig = data.data.existingSiteConfig
      this.product.newSiteConfig = data.data.newSiteConfig
      }else{
        alert(data.message)
      }
      
      
    }) 
  }


  }
