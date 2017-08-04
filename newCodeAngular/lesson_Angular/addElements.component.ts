import {
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver
}                                            from '@angular/core';
import { ActivatedRoute }                    from '@angular/router';
import { TrueFalseRightComponent }           from './trueFalse/true-false.right.component';
import { TapRightPictureRightComponent }     from './tapRightPicture/tap-right-picture.right.component';
import { OddOneOutRightComponent }           from './oddOneOut/odd-one-out.right.component';
import { MatchingWordPictureRightComponent } from './matchingWordPicture/matching-word-picture.right.component';
import { BeethovenRightComponent }           from './beethoven/beethoven.right.component';
import { MatchingWordWordRightComponent }    from './matchingWordWord/matching-word-word.right.component';
import { TapStreakRightComponent }           from './tapStreak/tap-streak-right.component';
import { BuildTheSentenceRightComponent }    from './buildTheSentence/build-the-sentence.right.component';
import { TapRightWordRightComponent }        from './tapRightWord/tap-right-word.right.component';
import { SortingRightComponent }             from './sorting/sorting.right.component';
import { BuildTheWordRightComponent }        from './buildTheWord/build-the-word.right.component';

import { ManageTestService }                 from './manage-test.service';

@Component( {
    selector:        'add-elements',
    template:        `
        <div #parent></div>`,
    entryComponents: [
        TrueFalseRightComponent,
        OddOneOutRightComponent,
        TapRightPictureRightComponent,
        MatchingWordPictureRightComponent,
        BeethovenRightComponent,
        MatchingWordWordRightComponent,
        BuildTheSentenceRightComponent,
        TapStreakRightComponent,
        TapRightWordRightComponent,
        SortingRightComponent,
        BuildTheWordRightComponent
    ]
} )

export class AddElementsComponent implements OnInit {
    
    testObject: any = {
        'odd-one-out':        OddOneOutRightComponent,
        'true-or-false':      TrueFalseRightComponent,
        'tap-right-picture':  TapRightPictureRightComponent,
        'matching-picture':   MatchingWordPictureRightComponent,
        'beethoven':          BeethovenRightComponent,
        'matching-words':     MatchingWordWordRightComponent,
        'tap-streak':         TapStreakRightComponent,
        'build-the-sentence': BuildTheSentenceRightComponent,
        'tap-right-word':     TapRightWordRightComponent,
        'sorting':            SortingRightComponent,
        'build-the-word':     BuildTheWordRightComponent
    };
    
    @ViewChild( 'parent', { read: ViewContainerRef } )
    parent: ViewContainerRef;
    component: any;
    
    constructor( private componentFactoryResolver: ComponentFactoryResolver,
                 public route: ActivatedRoute,
                 public manageTestService: ManageTestService ) {
    }
    
    ngOnInit() {
        
        this.route.params.subscribe( ( params: { test: string } ) => {
            if ( params.test && this.manageTestService.testTypeObject ) {
                this.manageTestService.testObject[ 'test_data' ].id_test_type = this.manageTestService.testTypeObject[ this.manageTestService.typeLesson ][ params.test ].id_test_type;
                this.manageTestService.testObject[ 'test_data' ].test_model = this.manageTestService.testTypeObject[ this.manageTestService.typeLesson ][ params.test ].test_model;
                
                //dynamic component load for right side
                const childComponent = this.componentFactoryResolver.resolveComponentFactory( this.testObject[ params.test ] );
                setTimeout( () => {
                    // at this point we want the "child" component to be rendered into the app.component:
                    this.component = this.parent.createComponent( childComponent );
                }, 0 );
            }
            this.component && this.component.destroy();
        } );
    }
}
