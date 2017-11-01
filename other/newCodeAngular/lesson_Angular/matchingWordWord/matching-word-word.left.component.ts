import {
    Component,
    ViewContainerRef,
    NgModule,
    Compiler
} from '@angular/core';
import { ManageTestService } from '../manage-test.service';
import { MediaService } from '../media.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule } from '@angular/material';

@Component( {
    template: ``
} )
export class MatchingWordWordLeftComponent {
    
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
         * stuff to show content in test modify. Three pipes is an ingenious decision
         */
        if ( this.manageTestService.id && self.manageTestService.testObject[ 'question_data' ] ) {
            self.manageTestService.testObject[ 'question_data' ].forEach( function( value: any ) {
                value.test_question_data_left = value.test_question_data.split( '|||' )[ 0 ];
                value.test_question_data_right = value.test_question_data.split( '|||' )[ 1 ];
            } )
        } else {
            self.manageTestService.testObject[ 'question_data' ] = [];
        }
        /**
         * Matching word word component
         * test_model param number - test type/test model. Unique to each test type
         * test_model = 11
         * revision param boolean - switcher between program/cabinet template
         */
        @Component( {
            selector:    'matching-word-word-left',
            templateUrl: `${ location.pathname }?test_model=11&revision=${ /^(true)/.test(self.manageTestService.isRevision) }`
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