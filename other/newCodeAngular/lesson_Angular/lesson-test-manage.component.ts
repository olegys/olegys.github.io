import { Component, Pipe, PipeTransform } from '@angular/core';
import { ManageTestService } from './manage-test.service';
import { MainLessonService } from './lesson.service';

/**
 * A pipe which transforms router link to a proper test name
 */
@Pipe( {
    name: 'testTitle'
} )
export class TitleTransform implements PipeTransform {
    transform( title: string ): any {
        return title && title.split( '-' ).join( ' ' )[ 0 ].toUpperCase() + title.split( '-' ).join( ' ' ).slice( 1 );
    }
}

/**
 * A pipe which sorts test types in alphabetic order
 */
@Pipe( {
    name: 'menuSort'
} )
export class MenuSort implements PipeTransform {
    transform( array: any ): any {
        return array.sort( ( a: any, b: any ) => {
            if ( a.name < b.name ) return -1;
            if ( a.name > b.name ) return 1;
        } )
    }
}

/**
 * This one is the main component. Parent of all others
 */
@Component( {
    selector:    'admin-test-manage',
    templateUrl: '/Files/Templates/admin/lesson-test-manage.component.html'
} )

export class LessonTestManageComponent {
    constructor( private manageTestService: ManageTestService, public mainLessonService: MainLessonService ) {
    }
    
    currentTest: string = 'choose test';
    
    /**
     * Method to nullify manageTestService.testObject
     */
    clearObject(): void {
        let obj: any = this.manageTestService;
        obj.id = null;
        obj.testObject[ 'test_data' ][ 'background' ] = '';
        obj.testObject[ 'test_data' ][ 'test_sound' ] = '';
        obj.testObject[ 'test_data' ].test_sound_name = '';
        obj.testObject[ 'question_data' ] = [];
        obj.testObject[ 'test_data' ].test_category = [];
        obj.testObject[ 'query' ] = '';
    }
}
