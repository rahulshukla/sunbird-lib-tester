import { Component, OnInit } from '@angular/core';
import { navigationConfig , pdfPlayerConfig , startPageDetails, endPageConfig, contentDetails, configuration, libEnabler} from './data';

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
  navigate = {};
  showStartPage = true;
  showEndpage = false;
  showPdf = false;
  playerLifeCycle = configuration;
  presentIndex: number;
  viewEnabler: object;
  currentConfig: object;
  EndPageData = {};
  getVideoConfig = {
    type: 'player'
  };

  libEnabler = libEnabler;


  constructor() { }

  ngOnInit() {
    this.presentIndex = 1;
    const currentPlayerConfig = (this.getCurrentPlayerConfig(this.playerLifeCycle, 'index', this.presentIndex));
    this.currentConfig = currentPlayerConfig.config;
    console.log('CurrentIndex:', this.presentIndex);
    console.log('CurrentConfig:', this.currentConfig);
    this.updateLibEnabler(currentPlayerConfig.id);
  }

  private startPageEventHandler(valueEmitted: any) {
    console.log(valueEmitted);
    this.EndPageData = valueEmitted;
  }

  private pdfEventHandler(valueEmitted: object) {
      console.log(valueEmitted);
      this.pdfMetadataEvents = valueEmitted;
      this.EndPageData = valueEmitted;
  }

  public EndPageEventHandler(valueEmitted) {
    // this.EndPageData = valueEmitted;
    console.log('Telemetry Events:', valueEmitted);
  }


  private updateLibEnabler(module: string) {
    switch ( module ) {
      case 'startPage':
        this.libEnabler['pdf'] = false;
        this.libEnabler['endPage'] = false;
        this.libEnabler['startPage'] = true;
        this.libEnabler['video'] = false;
        this.libEnabler['navigation'] = true;
        break;
      case 'pdfPlayer':
        this.libEnabler['pdf'] = true;
        this.libEnabler['endPage'] = false;
        this.libEnabler['startPage'] = false;
        this.libEnabler['video'] = false;
        this.libEnabler['navigation'] = true;
        break;
      case 'navigation':
        this.libEnabler['pdf'] = false;
        this.libEnabler['endPage'] = false;
        this.libEnabler['startPage'] = false;
        this.libEnabler['video'] = false;
        this.libEnabler['navigation'] = true;
        break;
      case 'endPage':
        this.libEnabler['pdf'] = false;
        this.libEnabler['endPage'] = true;
        this.libEnabler['startPage'] = false;
        this.libEnabler['video'] = false;
        this.libEnabler['navigation'] = true;
        break;
      case 'video':
        this.libEnabler['pdf'] = false;
        this.libEnabler['endPage'] = false;
        this.libEnabler['startPage'] = false;
        this.libEnabler['video'] = true;
        this.libEnabler['navigation'] = true;
        break;
    }
  }



  private getCurrentPlayerConfig(theObject: object, key: string , value: number) {
    let result = null;
    if (theObject instanceof Array) {
        for (let i = 0; i < theObject.length; i++) {
            result = this.getCurrentPlayerConfig(theObject[i], key, value);
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
                result = this.getCurrentPlayerConfig(theObject[prop], key, value);
                if (result) {
                    break;
                }
            }
        }
    }
    return result;
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


  private navigationHandler(event: any) {
    if (this.presentIndex <= this.playerLifeCycle ['totalIndex'] && this.presentIndex !== 0) {
    if (event === 'next') {
          this.presentIndex = this.presentIndex + 1;
          const currentPlayerConfig = (this.getCurrentPlayerConfig(this.playerLifeCycle, 'index', this.presentIndex));
          this.currentConfig = currentPlayerConfig.config;
          this.updateLibEnabler(currentPlayerConfig.id);
          console.log('CurrentIndex:', this.presentIndex);
          console.log('CurrentConfig:', this.currentConfig);
        } else {
          this.presentIndex = this.presentIndex - 1;
          const currentPlayerConfig = (this.getCurrentPlayerConfig(this.playerLifeCycle, 'index', this.presentIndex));
          this.currentConfig = currentPlayerConfig.config;
          this.updateLibEnabler(currentPlayerConfig.id);
          console.log('CurrentIndex:', this.presentIndex);
          console.log('CurrentConfig:', this.currentConfig);
        }
    } else {
      if (this.presentIndex > this.playerLifeCycle['totalIndex']) {
        this.presentIndex = this.presentIndex - 1;
      } else if (this.presentIndex <= 1 ) {
        this.presentIndex = 1;
      }
      console.log('last content reached');
    }
  }

}
