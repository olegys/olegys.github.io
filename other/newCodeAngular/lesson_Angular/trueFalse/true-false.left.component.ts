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
export class TrueFalseLeftComponent {
    
    constructor( public manageTestService: ManageTestService,
                 public vc: ViewContainerRef,
                 public mediaService: MediaService,
                 public compiler: Compiler,
                 public route: ActivatedRoute ) {
    }
    
    dynamicComponent() {
        const self = this;
        
        @Component( {
            selector:    'true-false-left',
            templateUrl: `${location.pathname}?test_model=6&revision=${ /^(true)/.test(self.manageTestService.isRevision) }`,
        } )
        class DynamicComponent {
            rows: any = self.manageTestService.testObject;
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