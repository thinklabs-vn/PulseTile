/*
  ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
  ~  
  ~  Licensed under the Apache License, Version 2.0 (the "License");
  ~  you may not use this file except in compliance with the License.
  ~  You may obtain a copy of the License at
  ~  
  ~    http://www.apache.org/licenses/LICENSE-2.0

  ~  Unless required by applicable law or agreed to in writing, software
  ~  distributed under the License is distributed on an "AS IS" BASIS,
  ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~  See the License for the specific language governing permissions and
  ~  limitations under the License.
*/
//libs
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import uiBootstrap from 'angular-ui-bootstrap';
import ngRedux from 'ng-redux';
import dirPagination from 'angular-utils-pagination';
import createLogger from 'redux-logger';
import 'angular-loading-bar';
import 'fullcalendar';
import 'angular-ui-calendar';
import 'angularjs-slider';
import 'angular-sanitize';
import 'chart.js';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-editable';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar'
import 'angular-spinner';
import 'jquery-timepicker-jt';
import 'angular-jquery-timepicker';
import 'angular-xeditable';
import 'ng-scrollbars';
import 'angular-ui-select';
import 'angular-swiper';
import 'swiper';
import 'angular-drag-and-drop-lists';
import 'fabric.js';

//commons
import reducer from './redux/reducer';
import actions from './actions';
import httpMiddleware from './helpers/httpMiddleware';
import Patient from './helpers/patient';
import deviceDetector from './helpers/deviceDetector';
import './helpers/polyfills';

//components 
import UiKitComponent from './pulsetileui/pages/ui-kit/ui-kit.component';
import ProfileComponent from './pulsetileui/pages/profile/profile.component';
import HeaderComponent from './pulsetileui/header-bar/header.component.js';
import PatientsChartsComponent from './pulsetileui/pages/patients-charts/patients-charts.component';
import PatientsSummaryComponent from './pulsetileui/pages/patient-summary/patients-summary.component';
import PatientsListFullComponent from './pulsetileui/pages/patients-list-full/patients-list-full.component';
import PatientsSidebarComponent from './pulsetileui/pages/patients-detail/patients-sidebar.component';
import PatientsBannerComponent from './pulsetileui/pages/patients-detail/patients-banner.component';
import SearchComponent from './pulsetileui/search/search.component';
import SearchAdvancedComponent from './pulsetileui/search/search-advanced.component';
import ReportChartComponent from './pulsetileui/search/report-chart.component';
import MainComponent from './pulsetileui/main-component/main.component';
import HomeSidebarComponent from './pulsetileui/pages/patients-lookup/home-sidebar.component';
import ServiceRequests from './services/serviceRequests.js';
import ServiceStateManager from './services/serviceStateManager.js';
import ServiceVitalsSigns from './pulsetileui/pages/vitals/serviceVitalsSigns.js';
import ServiceActions from './pulsetileui/pages/dicom/serviceActions.js';
import ServiceFormatted from './services/serviceFormatted.js';
import TemplateService from './services/TemplateService.js';
import ServiceThemes from './services/serviceThemes.js';
import ServiceTransferOfCare from './pulsetileui/pages/transfer-of-care/serviceTransferOfCare.js';
import ServicePatients from './pulsetileui/pages/patients-list/servicePatients.js';

import ScheduleModal from './pulsetileui/pages/events/schedule-modal';
import ConfirmationModal from './pulsetileui/confirmation/confirmation';
import ConfirmationDocsModal from './pulsetileui/confirmation/confirmation-documents';

import routeConfig from 'app/index.route';
import 'app/scss/core.scss';

import 'app/directives/index.js';
import 'app/filters/index.js';
import 'app/pulsetileui/pages/patients-list/index.js';

import plugins from './plugins';

let app = angular
    .module('ripple-ui', [
        uiRouter,
        ngAnimate,
        uiBootstrap,
        ngRedux,
        actions,
        dirPagination,
        'ripple-ui.patients',
        'ripple-ui.directives',
        'ripple-ui.filters',
        'angularSpinner',
        'ui.calendar',
        'ui.timepicker',
        'angular-loading-bar',
        'xeditable',
        'ngScrollbars',
        'rzModule',
        'ui.select',
        'ksSwiper',
        'ngSanitize',
        'dndLists'
    ])
    .factory('ScheduleModal', ScheduleModal)
    .factory('ConfirmationModal', ConfirmationModal)
    .factory('ConfirmationDocsModal', ConfirmationDocsModal)

    
    .factory('httpMiddleware', httpMiddleware)
    .factory('Patient', Patient)
    .factory('deviceDetector', deviceDetector)

    .service('templateService', TemplateService)
    .service('serviceThemes', ServiceThemes)
    .service('serviceTransferOfCare', ServiceTransferOfCare)
    .service('servicePatients', ServicePatients)
    .service('serviceFormatted', ServiceFormatted)
    .service('serviceRequests', ServiceRequests)
    .service('serviceStateManager', ServiceStateManager)
    .service('serviceVitalsSigns', ServiceVitalsSigns)
    .service('serviceActions', ServiceActions);

  plugins.forEach((plugin)=>{
    Object.keys(plugin.components).forEach((name)=>{
      app = app.component(name, plugin.components[name]);
    })
  });

  app
    .component('uiKitComponent', UiKitComponent)
    .component('profileComponent', ProfileComponent)
    .component('headerComponent', HeaderComponent)
    .component('patientsChartsComponent', PatientsChartsComponent)
    .component('patientsSummaryComponent', PatientsSummaryComponent)
    .component('patientsSidebarComponent', PatientsSidebarComponent)
    .component('patientsBannerComponent', PatientsBannerComponent)   
    .component('patientsListFullComponent', PatientsListFullComponent)    
    .component('mainComponent', MainComponent)
    .component('homeSidebarComponent', HomeSidebarComponent)
    .component('searchComponent', SearchComponent)
    .component('searchAdvancedComponent', SearchAdvancedComponent)
    .component('reportChartComponent', ReportChartComponent)
    
    .config(routeConfig)
    .config(function (paginationTemplateProvider) {
        paginationTemplateProvider.setString(require('./pulsetileui/pagination/dirPagination.tpl.html'));
    })
    .config(['$ngReduxProvider', $ngReduxProvider => {
        const middleware = ['httpMiddleware'];

        if (process.env.NODE_ENV === 'development') {
            middleware.push(createLogger({
                level: 'info',
                collapsed: true
            }));
        }

        $ngReduxProvider.createStoreWith(reducer, middleware);
    }])
    .config(['cfpLoadingBarProvider', cfpLoadingBarProvider => {
        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .config(function (ScrollBarsProvider) {
        // the following settings are defined for all scrollbars unless the
        // scrollbar has local scope configuration
        ScrollBarsProvider.defaults = {
            scrollButtons: {
                scrollAmount: 'auto', // scroll amount when button pressed
                enable: false // enable scrolling buttons by default
            },
            scrollInertia: 0, // adjust however you want
            axis: 'y',
            theme: 'dark-custom',
            autoHideScrollbar: false,
            mouseWheel:{ preventDefault: false }
        };
    })
    .config(function(uiSelectConfig) {
        uiSelectConfig.theme = 'bootstrap';
        uiSelectConfig.resetSearchInput = false;
        uiSelectConfig.appendToBody = true;
        uiSelectConfig.searchEnabled = false;
    });
    app.run(function(editableOptions, editableThemes) {
      editableOptions.theme = 'bs3'; // bootstrap3 theme
      editableThemes.bs3.inputClass = 'input-sm';
      editableThemes.bs3.buttonsClass = 'btn-sm';
    });
    app.controller('mainCtrl', function ($scope, $timeout) {
        // $timeout(function() {
        //     $scope.updateScrollbar('scrollTo', 100, {
        //     scrollInertia: 0
        //   });
        // });
        // $scope.myScrollTo = function () {
        //   $scope.updateScrollbar('scrollTo', 1000, {
        //     scrollInertia: 0
        //   });
        // };
    });

console.log('app start');

/*Project initialise*/
app.run(function($state, serviceRequests, serviceThemes) {
    var classLoadingPage = 'loading';
    var body = angular.element('body');

    body.addClass(classLoadingPage);

    /* istanbul ignore next */
    var switchDirectByRole = function (currentUser) {
      /* istanbul ignore if  */
      if (!currentUser) return;
      // Direct different roles to different pages at login
      /* istanbul ignore next  */
      switch (currentUser.role) {
        case 'IDCR':
          $state.go('patients-charts');
          break;
        case 'PHR':
          //Trick for PHR user login
          loadPatient = patientsActions.getPatient;
          loadPatient(currentUser.nhsNumber);
          $state.go('patients-summary', {
            patientId: currentUser.nhsNumber
          });
          break;
        default:
          $state.go('patients-summary', {
            patientId: currentUser.nhsNumber
          });
      }
    };

    /* istanbul ignore next */
    var setLoginData = function (loginResult) {
      serviceRequests.publisher('setUserData', {userData: loginResult.data});
      // switchDirectByRole(loginResult.data);
    };
    
    /* istanbul ignore next */
    var login = function () {
      serviceRequests.login().then(function (result) {
        serviceRequests.currentUserData = result.data;
        setLoginData(result);
        serviceRequests.getAppSettings().then(function (res) {
          console.log('getAppSettings ', res);

          if (res.data) {
            serviceThemes.setDataApplication(res.data);
          }

          body.removeClass(classLoadingPage);
        });
      });
    };

    var auth0;


    serviceRequests.initialise().then(function (result){
      /* istanbul ignore next */
      if (result.data.token) {
        // reset the JSESSIONID cookie with the new incoming cookie
        document.cookie = "JSESSIONID=" + result.data.token;

        location.reload();

        return;
      }

      /* istanbul ignore next */
      if (result.data.redirectTo === 'auth0') {
        console.log('running in UAT mode, so now login via auth0');
        
        /*Set URL to localStorage*/
        var locationHrefBeforeLogin = localStorage.getItem('locationHrefBeforeLogin');
        if (!locationHrefBeforeLogin) {
          localStorage.setItem('locationHrefBeforeLogin', location.href);
        }

        if (!auth0) auth0 = new Auth0(result.data.config);
        auth0.login({
          connections: result.data.connections
        });
        return;
      }
      
      /* istanbul ignore if */
      if (result.data && result.data.ok) {
        var locationHrefBeforeLogin = localStorage.getItem('locationHrefBeforeLogin');
        if (locationHrefBeforeLogin) {
          /*Go to URL from localStorage*/
          localStorage.removeItem('locationHrefBeforeLogin');
          location.href = locationHrefBeforeLogin;
        }
        console.log('Cookie was for a valid session, so fetch the simulated user');
        login();
      }

    }, function (error){
      //for dev and testing
      login();
    });
});


