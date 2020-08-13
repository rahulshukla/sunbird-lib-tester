import { Component, OnInit } from '@angular/core';
import { navigationConfig , pdfPlayerConfig , startPageDetails, endPageConfig, contentDetails, EndPageData} from './data';

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
  EndPageData = EndPageData;
  navigate = {};
  showStartPage = true;
  showEndpage = false;
  showPdf = false;
  playerLifeCycle: object;
  presentIndex: number;
  viewEnabler: object;
  currentConfig: object;

  libEnabler = {
    pdf: false,
    endPage: false,
    startPage: false,
    video : false,
    navigation: true
  };

  constructor() { }

  ngOnInit() {
    this.initializeJSONConfig();
    this.presentIndex = 1;
    const currentPlayerConfig = (this.getObject(this.playerLifeCycle, 'index', this.presentIndex));
    this.currentConfig = currentPlayerConfig.config;
    this.presentIndex = this.presentIndex + 1;
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
    this.EndPageData = valueEmitted;
    console.log('Telemetry Events:', valueEmitted);
  }

  private navigationHandler(event: any) {
    // if (this.showStartPage === true && event === 'next') {
    //   this.showStartPage = false;
    //   this.showPdf = true;
    //   this.navigationConfig.isLeftEnable = true;
    // } else if (this.showStartPage === false &&
    //   (this.pdfMetadataEvents['metaData']['currentPagePointer'] !== this.pdfMetadataEvents['metaData']['totalNumberOfPages']) ) {
    //   this.navigate = {
    //     'navigate': event,
    //     'pageNumber': this.pdfMetadataEvents['metaData']['currentPagePointer']
    //   };
    // }  else {
    //     this.showEndpage = true;
    //     this.showPdf = false;
    //     this.showPdf2 = true;
    //     this.navigationConfig.isNavCtrl = false;
    //   }
    if (this.presentIndex <= this.playerLifeCycle ['totalIndex'] && this.presentIndex !== 0) {
    if (event === 'next') {
          const currentPlayerConfig = (this.getObject(this.playerLifeCycle, 'index', this.presentIndex));
          this.currentConfig = currentPlayerConfig.config;
          this.presentIndex = this.presentIndex + 1;
          this.updateLibEnabler(currentPlayerConfig.id);
          console.log('CurrentIndex:', this.presentIndex);
          console.log('CurrentConfig:', this.currentConfig);
        } else { 
          const currentPlayerConfig = (this.getObject(this.playerLifeCycle, 'index', this.presentIndex));
          this.currentConfig = currentPlayerConfig.config;
          this.presentIndex = this.presentIndex - 1;
          this.updateLibEnabler(currentPlayerConfig.id);
          console.log('CurrentIndex:', this.presentIndex);
          console.log('CurrentConfig:', this.currentConfig);
        }
    } else {
      if(this.presentIndex > this.playerLifeCycle['totalIndex']) {
        this.presentIndex = this.presentIndex - 1;
      } else if (this.presentIndex <= 0 ){
        this.presentIndex = 1;
      }
      console.log('last content reached');
    }
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

  private replayHandler(valueEmitted: any) {
    console.log(valueEmitted);
    if (valueEmitted === 'replay') {
      this.pdfMetadataEvents['metaData']['currentPagePointer'] = 1;
      this.showEndpage = false;
      this.showStartPage = true;
      this.showPdf = false;
      this.navigationConfig.isNavCtrl = true;
    } else if (valueEmitted === 'exit') {
        alert('you pressed exit');
    }
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

initializeJSONConfig() {
  this.playerLifeCycle = {
    'totalIndex': 6,
    'navigationConfig': {
      'index': 0,
      'config': {
        'isNavCtrl': true,
        'alignment': 'middle',
        'isLeftEnable': true,
        'isRightEnable': true,
        'isFirstPage': true,
        'isLastPage': false,
        'leftIcon': '',
        'rightIcon': '',
        'leftIconUrl': 'assets/previous.png',
        'rightIconUrl': 'assets/next.png',
        'iconSize': 'fa-3x'
      }
    },
    'startPage': [
      {
        'index': 1,
        'id': 'startPage',
        'config':{
          'showMessage': true,
          'message': 'thermodynamics',
          'credits': ['HC Verma', 'RS Aggarwal'],
          'creditsLabel': 'credits',
          'showCredits': true,
          'poweredByLabel': 'powered by',
          'poweredByImageURL': 'https://diksha.gov.in/assets/imgs/logos.svg',
          'showPoweredBy': true,
          'licenseTerms': 'CC BY 4.0',
          'licenseTermsLabel': 'license Terms',
          'showlicenseTerms': true,
          'copyright': 'CBSE, 2020',
          'copyrightLabel': 'copyright',
          'showCopyRight': true
        }
    },
    {
        'index': 6,
        'id': 'startPage',
        'config': {
          'showMessage': true,
          'message': 'string',
          'showCredits': true,
          'credits': [],
          'creditsLabel': 'string',
          'showPoweredBy': true,
          'poweredByLabel': 'powered by',
          'poweredByImageURL': 'string',
          'showlicenseTerms': true,
          'licenseTerms': 'string',
          'licenseTermsLabel': 'string',
          'showCopyRight': true,
          'copyright': 'string',
          'copyrightLabel': 'copyright'
    }
    }
    ],
    'pdfPlayer':{
      'index': 2,
      'id': 'pdfPlayer',
      'config': {
        'src': '/assets/abc_packet.pdf',
        'showOpenFileButton': false,
        'showPropertiesButton': false,
        'textLayer': true,
        'showHandToolButton': false,
        'useBrowserLocale': true,
        'showBookmarkButton': false,
        'showBorders': true,
        'startFromPage': 0,
        'contextMenuAllowed': true,
        'showSidebarButton': false,
        'showFindButton': true,
        'showPagingButtons': true,
        'showZoomButtons': true,
        'showPresentationModeButton': false,
        'showPrintButton': true,
        'showDownloadButton': true,
        'showSecondaryToolbarButton': false,
        'showRotateButton': false,
        'showScrollingButton': false,
        'showSpreadButton': false,
        'backgroundColor': '#fffff'
      }
    },
    'endPage': [
    {
      'index': 4,
      'id': 'endPage',
      'config': {
        'showMessage': true,
        'showContentInfo': true,
        'showClockIcon': true,
        'showAuthor': true,
        'showReplay': true,
        'showExit': true,
        'showUser': true
      }
    },
    {
      'index': 5,
      'id': 'endPage',
      'config': {
        'showMessage': true,
        'showContentInfo': true,
        'showClockIcon': true,
        'showAuthor': true,
        'showReplay': true,
        'showExit': true,
        'showUser': true
        }
      }
    ],
    'video':{
      'index': 3,
      'id': 'video'
    }
  };
}

}
