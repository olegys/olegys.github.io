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
export class OddOneOutLeftComponent {
    constructor( public manageTestService: ManageTestService,
                 public vc: ViewContainerRef,
                 public mediaService: MediaService,
                 public compiler: Compiler,
                 public route: ActivatedRoute ) {
    }
    
    dynamicComponent() {
        const self = this;
        
        @Component( {
            selector:    'odd-one-out-left',
            templateUrl: `${ location.pathname }?test_model=8&revision=${ /^(true)/.test(self.manageTestService.isRevision) }`
        } )
        class DynamicComponent {
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