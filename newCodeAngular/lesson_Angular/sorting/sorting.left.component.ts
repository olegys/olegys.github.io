import {
    Component,
    ViewContainerRef,
    NgModule,
    Compiler,
    trigger,
    transition,
    style,
    animate,
    OnInit
} from '@angular/core';
import { ManageTestService } from '../manage-test.service';
import { MediaService } from '../media.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdIconModule } from '@angular/material';

@Component( {
    template: ``
} )
export class SortingLeftComponent {
    
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
                value.test_question_audio = location.origin + '/Files/TestSortingFiles/' + value.test_question_audio;
            } );
        } else {
            self.manageTestService.testObject[ 'question_data' ] = [];
        }
        
        /**
         * Sorting component
         * test_model param number - test type/test model. Unique to each test type
         * test_model = 7
         * revision param boolean - switcher between program/cabinet template
         */
        @Component( {
            selector:    'sorting-left',
            animations:  [
                trigger(
                    'enterAnimation', [
                        transition( ':enter', [
                            style( { opacity: 0 } ),
                            animate( '250ms', style( { opacity: 1 } ) )
                        ] ),
                        transition( ':leave', [
                            style( { opacity: 1 } ),
                            animate( '250ms', style( { opacity: 0 } ) )
                        ] )
                    ]
                )
            ],
            templateUrl: `${ location.pathname }?test_model=7&revision=${ /(true)/.test(self.manageTestService.isRevision) }`
        } )
        class DynamicComponent implements OnInit {
            /**
             * Object with test data.
             * @type {Object}
             */
            rows = self.manageTestService.testObject;
            
            /**
             * Creates array with empty categories if none was detected
             * (array with categories may be already in place only if modifying)
             */
            ngOnInit() {
                if ( !this.rows[ 'test_data' ].test_category ) {
                    this.rows[ 'test_data' ].test_category = [ '', '' ];
                }
            }
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