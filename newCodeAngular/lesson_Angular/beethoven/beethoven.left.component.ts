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
export class BeethovenLeftComponent {
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
         * Stuff to load content on modify
         */
        if ( this.manageTestService.id && self.manageTestService.testObject[ 'question_data' ] ) {
            self.manageTestService.testObject[ 'question_data' ].forEach( function( value: any ) {
                value.test_question_audio_name = value.test_question_audio;
                value.test_question_audio = '/Files/TestBeethovenFiles/' + value.test_question_audio;
            } )
        } else {
            self.manageTestService.testObject[ 'question_data' ] = [];
        }
        
        
        /**
         * Beethoven component
         * test_model param number - test type/test model. Unique to each test type
         * test_model = 10
         * revision param boolean - switcher between program/cabinet template
         */
        @Component( {
            selector:    'beethoven-left',
            templateUrl: `${ location.pathname }?test_model=10&revision=${ /^(true)/.test(self.manageTestService.isRevision) }`
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