export const startPageDetails = {
  'message': 'thermodynamics',
  'showMessage': true,
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
  'showCopyRight': true,
};

export const navigationConfig = {
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

export const pdfPlayerConfig = {
    'src': '/assets/thermodynamics.pdf',
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
};


export const endPageConfig = {
  'showMessage': true,
  'showContentInfo': true,
  'showClockIcon': true,
  'showAuthor': true,
  'showReplay': true,
  'showExit': true,
  'showUser': true
};



export const contentDetails = {
  message: 'You Just Completed',
  timeLabel: 'TIME',
  contentInfo: 'Thermodynamics',
  clockIcon: 'assets/clock.svg',
  author: 'Universal Learning Aid (Let"s learn)',
  authorLabel: 'author',
  replayIcon: 'assets/icn_replay.png',
  replayLabel: 'replay',
  exitIcon: 'assets/home.png',
  exitLabel: 'exit',
  user: 'anonymous'
};

export const pdfEndData = {};


export const configuration = {
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
      'config': {
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
        'message': 'thermodynamics-2',
        'credits': ['Rahul Shukla', 'RS Aggarwal'],
        'creditsLabel': 'credits',
        'showCredits': true,
        'poweredByLabel': 'powered by',
        'poweredByImageURL': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Wikipedia%27s_W.svg',
        'showPoweredBy': true,
        'licenseTerms': 'CC BY 4.0',
        'licenseTermsLabel': 'license Terms',
        'showlicenseTerms': true,
        'copyright': 'CBSE, 2020',
        'copyrightLabel': 'copyright',
        'showCopyRight': true
  }
  }
  ],
  'pdfPlayer': {
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
      'showMessage': 'test last',
      'showContentInfo': true,
      'showClockIcon': true,
      'showAuthor': true,
      'showReplay': true,
      'showExit': true,
      'showUser': true
      }
    }
  ],
  'video': {
    'index': 3,
    'id': 'video'
  }
};

export const libEnabler = {
  pdf: false,
  endPage: false,
  startPage: false,
  video : false,
  navigation: true
};

