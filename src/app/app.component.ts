import { Component, OnInit, ɵConsole } from '@angular/core';
import { navigationConfig , pdfPlayerConfig , startPageDetails, endPageConfig, contentDetails, pdfEndData, configuration } from './data';
// import * as _ from 'lodash';
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
  configuration = configuration;
  navigate = {};

 libEnabler = {
   pdf: false,
   endPage: false,
   startPage: true,
   video : false
 };

  constructor() { }

  ngOnInit() {
    // console.log(this.configuration);
    console.log(this.getObject(this.configuration, 'index', 1));

  }

  private getObject(theObject: object, key: string , value: number) {
      let result = null;
      if (theObject instanceof Array) {
          for (let i = 0; i < theObject.length; i++) {
              result = this.getObject(theObject[i], key, value);
              if (result) {
                  break;
              }
          }
      } else {
          // tslint:disable-next-line:forin
          for (const prop in theObject) {
              if (prop === key) {
                  if (theObject[prop] === value) {
                      return theObject;
                  }
              }
              if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                  result = this.getObject(theObject[prop], key, value);
                  if (result) {
                      break;
                  }
              }
          }
      }
      return result;
  }


  private startPageEventHandler(valueEmitted: any) {
    console.log(valueEmitted);
    this.pdfEndData = valueEmitted;
  }

  private findNestedObj(entireObj, keyToFind, valToFind) {
      let foundObj;
      JSON.stringify(entireObj, (_, nestedValue) => {
        if (nestedValue && nestedValue[keyToFind] === valToFind) {
          foundObj = nestedValue;
        }
        return nestedValue;
      });
      return foundObj;
    }


  private pdfEventHandler(valueEmitted: object) {
      console.log(valueEmitted);
      this.pdfMetadataEvents = valueEmitted;
      this.pdfEndData = valueEmitted;
  }

  public EndPageEventHandler(valueEmitted) {
    this.pdfEndData = valueEmitted;
    console.log('Telemetry Events:', valueEmitted);
  }


  private navigationHandler(event: any) {
    if (this.libEnabler.startPage === true && event === 'next') {
      this.libEnabler.startPage = false;
      this.libEnabler.pdf = true;
    } else if (this.libEnabler.startPage === false &&
      (this.pdfMetadataEvents['metaData']['currentPagePointer'] !== this.pdfMetadataEvents['metaData']['totalNumberOfPages']) ) {
      this.navigate = {
        'navigate': event,
        'pageNumber': this.pdfMetadataEvents['metaData']['currentPagePointer']
      };
    }  else {
        this.libEnabler.endPage = true;
        this.libEnabler.pdf = false;
        this.navigationConfig.isNavCtrl = false;
      }
      console.log(this.findNestedObj(configuration, 'index', 1));

  }

  private replayHandler(valueEmitted: any) {
    console.log(valueEmitted);
    if (valueEmitted === 'replay') {
      this.pdfMetadataEvents['metaData']['currentPagePointer'] = 1;
      this.libEnabler.endPage = false;
      this.libEnabler.startPage = true;
      this.libEnabler.pdf = false;
      this.navigationConfig.isNavCtrl = true;
    } else if (valueEmitted === 'exit') {
        alert('you pressed exit');
    }
  }
}
