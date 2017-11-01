import { Component, OnInit } from '@angular/core';
import { MainLessonService } from './lesson.service';
import { dragula, DragulaService } from 'ng2-dragula/ng2-dragula';
import { MediaService } from './media.service';
import { RESTRICTIONS } from './collections/restrictions';
import { TEST_OBJECT } from './collections/test-object';
import { ActivatedRoute }  from '@angular/router'
import { ManageTestService } from './manage-test.service';

@Component( {
    selector:      'test-manage',
    templateUrl:   '/Files/Templates/admin/lesson-main.component.html',
    viewProviders: [ DragulaService ],
    
} )
export class LessonManageComponent implements OnInit {
    constructor( public lessonService: MainLessonService,
                 dragulaService: DragulaService,
                 public mediaService: MediaService,
                 public route: ActivatedRoute,
                 public manageTestService: ManageTestService ) {
        
        dragulaService.setOptions( 'first-bag', {
            copy:           function() {
                return !arguments[ 1 ].classList.contains( 'ruler' );
            },
            copySortSource: true,
            removeOnSpill:  true,
            moves:          function( element: HTMLElement ) {
                return !element.classList.contains( 'disabled' );
            },
            accepts:        function( el: any, target: any ) {
                return target.classList.contains( 'ruler' );
            }
        } );
        
        let self: any = this;
        let dragged: any = null;
        
        dragulaService.cloned.subscribe( ( value: any[] ) => {
            this.dragged = value[ 2 ];
            console.log( value );
        } );
        
        dragulaService.drop.subscribe( ( value: any[] ) => {
            self.onDrop( value.slice( 1 ) );
        } );
        
        dragulaService.remove.subscribe( ( value: any[] ) => {
            let index = value[ 1 ].getAttribute( 'data-index' );
            lessonService.listArray.overall[ index ].$$ruler = false;
        } );
    }
    
    restrictions: Object = RESTRICTIONS;
    testObject: Object = TEST_OBJECT;
    
    dragged: HTMLElement;
    
    ngOnInit() {
        this.route.queryParams.subscribe( ( params: {revision: string} ) => {
            if (params.revision) {
                this.manageTestService.isRevision = params.revision;
                this.manageTestService.typeLessonString = params.revision.split('!')[1].toUpperCase();
                /^(true)/.test(params.revision) ? this.manageTestService.typeLesson = 'cabinet' : 'ui';
            }
        } );
    }
    
    private onDrop( arg: Array<any> ): void {
        let [ el, target, source, next ] = arg;
        let index = +el.getAttribute( 'data-index' );
        let indexNext = (next && +next.getAttribute( 'data-index' )) || this.lessonService.listArray.overall.length - 1;
        !target.classList.contains( 'ruler' ) && this.dragged.classList.add( 'disabled' );
        this.lessonService.listArray.overall[ index ].$$ruler = true;
        this.lessonService.listArray.overall.move( index, indexNext - 1 );
        !source.classList.contains( 'ruler' ) && el.remove();
    }
}
