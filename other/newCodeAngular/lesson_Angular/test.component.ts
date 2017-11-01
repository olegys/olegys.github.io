import {
    Component,
    OnInit,
    ViewContainerRef,
    Compiler,
}                                         from '@angular/core';
import { ActivatedRoute }                   from '@angular/router';
import { OddOneOutLeftComponent }           from './oddOneOut/odd-one-out.left.component';
import { TrueFalseLeftComponent }           from './trueFalse/true-false.left.component';
import { MatchingWordPictureLeftComponent } from './matchingWordPicture/matching-word-picture.left.component';
import { TapRightPictureLeftComponent }     from './tapRightPicture/tap-right-picture.left.component';
import { BeethovenLeftComponent }           from './beethoven/beethoven.left.component';
import { MatchingWordWordLeftComponent }  from './matchingWordWord/matching-word-word.left.component';
import { TapStreakLeftComponent }         from './tapStreak/tap-streak-left.component';
import { BuildTheSentenceLeftComponent }  from './buildTheSentence/build-the-sentence.left.component';
import { TapRightWordLeftComponent }      from './tapRightWord/tap-right-word.left.component';
import { SortingLeftComponent }           from './sorting/sorting.left.component';
import { BuildTheWordLeftComponent }        from './buildTheWord/build-the-word.left.component';

import { ManageTestService } from './manage-test.service';

@Component( {
    selector:  'test-template',
    template:  `
        <div #parent></div>
    `,
    providers: [
        OddOneOutLeftComponent,
        TrueFalseLeftComponent,
        TapRightPictureLeftComponent,
        MatchingWordPictureLeftComponent,
        BeethovenLeftComponent,
        MatchingWordWordLeftComponent,
        BuildTheSentenceLeftComponent,
        TapRightWordLeftComponent,
        TapStreakLeftComponent,
        SortingLeftComponent,
        BuildTheWordLeftComponent
    ]
} )
export class TestFormationComponent implements OnInit {
    constructor( private route: ActivatedRoute,
                 public compiler: Compiler,
                 public vc: ViewContainerRef,
                 public manageTestService: ManageTestService,
                 public oddOneOutLeftComponent: OddOneOutLeftComponent,
                 public trueFalseLeftComponent: TrueFalseLeftComponent,
                 public tapRightPictureLeftComponent: TapRightPictureLeftComponent,
                 public matchingWordPictureLeftComponent: MatchingWordPictureLeftComponent,
                 public beethovenLeftComponent: BeethovenLeftComponent,
                 public matchingWordWordLeftComponent: MatchingWordWordLeftComponent,
                 public buildTheSentenceLeftComponent: BuildTheSentenceLeftComponent,
                 public tapRightWord: TapRightWordLeftComponent,
                 public tapStreakLeftComponent: TapStreakLeftComponent,
                 public sortingLeftComponent: SortingLeftComponent,
                 public buildTheWordLeftComponent: BuildTheWordLeftComponent ) {
    }
    
    test: any;
    
    testCollection: any = {
        'odd-one-out':        this.oddOneOutLeftComponent,
        'true-or-false':      this.trueFalseLeftComponent,
        'tap-right-picture':  this.tapRightPictureLeftComponent,
        'matching-picture':   this.matchingWordPictureLeftComponent,
        'beethoven':          this.beethovenLeftComponent,
        'matching-words':     this.matchingWordWordLeftComponent,
        'build-the-sentence': this.buildTheSentenceLeftComponent,
        'tap-right-word':     this.tapRightWord,
        'tap-streak':         this.tapStreakLeftComponent,
        'sorting':            this.sortingLeftComponent,
        'build-the-word':     this.buildTheWordLeftComponent
    };
    
    currentComponent: any;
    
    ngOnInit() {
        let self = this;
        this.route.queryParams.subscribe( ( queryParams: {revision: string, test: string} ) => {
            if ( queryParams.test ) {
                this.manageTestService.currentTest = queryParams.test;
                this.currentComponent && self.currentComponent.destroy();
                let component = self.testCollection[ queryParams.test ].dynamicComponent();
                this.compiler.compileModuleAndAllComponentsAsync( component.dynamic )
                    .then( ( factory: any ) => {
                        const compFactory = factory.componentFactories.find( ( x: any ) => x.componentType === component.component );
                        this.currentComponent = this.vc.createComponent( compFactory, 0 );
                    } );
            }
        } );
        this.route.params.subscribe( ( params: {test: string} ) => {
            this.manageTestService.testObject[ 'test_data' ].id_test_type = this.manageTestService.testTypeObject[ this.manageTestService.typeLesson ][ params.test ].id_test_type;
            this.manageTestService.testObject[ 'test_data' ].test_model = this.manageTestService.testTypeObject[ this.manageTestService.typeLesson ][ params.test ].test_model;
        } )
    }
}
