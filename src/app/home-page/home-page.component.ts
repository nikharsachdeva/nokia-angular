import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../product';
import { ProductMain } from '../productMain';




@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit,OnDestroy {

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

  constructor(private dataService: DataService) { }

  ngOnInit() {
    
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  performSearch() {
    this.dataService.sendGetRequest(this.searchValue).subscribe((data:ProductMain)=>{
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
      
    }) 
  }


  }
