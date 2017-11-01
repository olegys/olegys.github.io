import {
    Component,
    ViewContainerRef,
    NgModule,
    Compiler
} from '@angular/core';
import { MediaService } from '../media.service';
import { ManageTestService } from '../manage-test.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule } from '@angular/material';

@Component( {
    template: ``
} )
export class TapRightWordLeftComponent {
    
    constructor( public manageTestService: ManageTestService,
                 public vc: ViewContainerRef,
                 public mediaService: MediaService,
                 public compiler: Compiler,
                 public route: ActivatedRoute ) {
    }
    
    /**
     * Function for creating left component dynamically. Common among left components
     * @return {{component: DynamicComponent, dynamic: DynamicHtmlModule}}
     */
    dynamicComponent() {
        const self = this;
        /**
         * Tap right word component
         * test_model param number - test type/test model. Unique to each test type
         * test_model = 5
         * revision param boolean - switcher between program/cabinet template
         */
        @Component( {
            selector:    'tap-right-word-left',
            templateUrl: `${ location.pathname }?test_model=5&revision=${ /^(true)/.test(self.manageTestService.isRevision) }`,
            host:        { 'style': 'width: 100%; height: 100%;' }
        } )
        class DynamicComponent {
            /**
             * Object with test data.
             * @type {Object}
             */
            rows = self.manageTestService.testObject;
        }
        
        @NgModule( {
            imports:      [ CommonModule, MdIconModule ],
            declarations: [ DynamicComponent ],
            providers:    [ MediaService ]
        } )
        class DynamicHtmlModule {
        }
        
        return {
            component: DynamicComponent,
            dynamic:   DynamicHtmlModule
        };
    }
}