'use strict';
import ProceduresListComponent from '../../../../app/pulsetileui/pages/procedures/procedures-list.component.js';
import '../../../../app/index';
import * as types from '../../../../app/constants/ActionTypes';
import procedures from '../../../../app/pulsetileui/pages/procedures/procedures-reducer-all.js';
import '../../../../app/index';

describe('Procedures List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, fakeCall, stateParams, state, ngRedux, proceduresActions, serviceRequests, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _proceduresActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    proceduresActions = _proceduresActions_;
    usSpinnerService = _usSpinnerService_;

    template = ProceduresListComponent.template;

    ctrl = controller(ProceduresListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      proceduresActions: proceduresActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('proceduresActions');
    // scope.$digest();
  }));
  beforeEach(function() {
    fakeCall = {
      callProcedures: procedures
    };

    spyOn(fakeCall, 'callProcedures');

    spyOn(ctrl, 'go');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');

    fakeCall.callProcedures({}, types.PROCEDURES);

    ctrl.go();
    ctrl.create();
    ctrl.setCurrentPageData();
  });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include proceduresActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("procedures reducer was called", function() {
    expect(fakeCall.callProcedures).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("create was called", function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});