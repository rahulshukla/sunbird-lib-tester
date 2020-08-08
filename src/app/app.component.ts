import { Component, AfterViewInit, OnInit } from '@angular/core';
// import { questionSet , questionSetSa } from './data';
import { newQuestionFormatMcq } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pdfDemo';
  pdfMetadataEvents: object;
  constructor() { }

  navigationConfig = {
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
};

  pdfPlayerConfig = {
    'src': '/assets/sample.pdf',
    'showOpenFileButton': false,
    'showPropertiesButton': false,
    'textLayer': true,
    'showHandToolButton': false,
    'useBrowserLocale': true,
    'showBookmarkButton': false,
    'showBorders': true,
    'startFromPage': Number(localStorage.getItem('lastPageVisited')) || 0,
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
    'backgroundColor': '#00000'
};

  ngOnInit() {

  }

  pdfEventHandler(valueEmitted) {
      console.log(valueEmitted);
      this.pdfMetadataEvents = valueEmitted;
      localStorage.setItem('lastPageVisited', this.pdfMetadataEvents['metaData']['currentPagePointer']);
  }


  public navigationHandler(event: any) {
    if ( (window as any).PDFViewerApplication) {
      event === 'next' ?
      (window as any).PDFViewerApplication.eventBus.dispatch('nextpage') :
      (window as any).PDFViewerApplication.eventBus.dispatch('previouspage');
    }
  }
}
