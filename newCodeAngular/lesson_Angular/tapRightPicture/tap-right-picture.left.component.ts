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
export class TapRightPictureLeftComponent {
    
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
        
        if ( this.manageTestService.id && self.manageTestService.testObject[ 'question_data' ] ) {
            self.manageTestService.testObject[ 'question_data' ].forEach( function( value: any ) {
                value.test_question_audio_name = value.test_question_audio;
                value.test_question_image_name = value.test_question_image;
                value.test_question_image = location.origin + value.test_question_image + '?' + Date.now();
                value.test_question_audio = location.origin + value.test_question_audio + '?' + Date.now();
            } );
        } else {
            self.manageTestService.testObject[ 'question_data' ] = [];
        }
    
        /**
         * Tap right picture component
         * test_model param number - test type/test model. Unique to each test type
         * test_model = 3
         * revision param boolean - switcher between program/cabinet template
         */
        @Component( {
            selector:    'tap-right-picture-left',
            templateUrl: `${ location.pathname }?test_model=3&revision=${ /^(true)/.test(self.manageTestService.isRevision) }`,
        } )
        class DynamicComponent {
            /**
             * Object with test data.
             * @type {Object}
             */
            rows: any = self.manageTestService.testObject;
            /**
             * Word in the bottom of template
             * @type {Object}
             */
            word: Object = self.manageTestService.testObject;
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