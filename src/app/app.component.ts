import { Component, AfterViewInit, OnInit } from '@angular/core';
import { navigationConfig , pdfPlayerConfig , startPageDetails, endPageConfig, contentDetails, pdfEndData } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pdfDemo';
  pdfMetadataEvents: object;
  navigationConfig = navigationConfig;
  pdfPlayerConfig = pdfPlayerConfig;
  startPageDetails = startPageDetails;
  endPageConfig = endPageConfig;
  contentDetails = contentDetails;
  pdfEndData = pdfEndData;
  navigate = {};
  showStartPage = true;
  showEndpage = false;
  showPdf = false;

  constructor() { }

  ngOnInit() {}

  private startPageEventHandler(valueEmitted: any) {
    console.log(valueEmitted);
  }

  private pdfEventHandler(valueEmitted: object) {
      console.log(valueEmitted);
      this.pdfMetadataEvents = valueEmitted;
  }

  public EndPageEventHandler(valueEmitted) {
    console.log('Telemetry Events:', valueEmitted);
  }

  private navigationHandler(event: any) {
    if (this.showStartPage === true && event === 'next') {
      this.showStartPage = false;
      this.showPdf = true;
      this.navigationConfig.isLeftEnable = true;
    } else if (this.showStartPage === false &&
      (this.pdfMetadataEvents['metaData']['currentPagePointer'] !== this.pdfMetadataEvents['metaData']['totalNumberOfPages']) ) {
      this.navigate = {
        'navigate': event,
        'pageNumber': this.pdfMetadataEvents['metaData']['currentPagePointer']
      };
    }  else {
        this.showEndpage = true;
        this.showPdf = false;
        this.navigationConfig.isNavCtrl = false;
      }
  }
}
