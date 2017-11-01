import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { TEST_OBJECT } from "./collections/test-object";
import { TEST_TYPE_OBJECT } from './collections/test-type-object';
import { MainLessonService } from './lesson.service';
import { RESTRICTIONS } from './collections/restrictions';

/**
 * Service which contains different tools to work with particular test (e.g. save, manage etc.)
 */
@Injectable()
export class ManageTestService {
    
    constructor( private http: Http,
                 private snackBar: MdSnackBar,
                 private router: Router,
                 private mainLessonService: MainLessonService ) {
        this.getTestsMenu();
    }
    
    url: string = location.href.match( /^.+\d\// )[ 0 ];
    /**
     * Headers for php to understand Angular's http request
     * @type {Headers}
     */
    headers: any = new Headers( {
        'Content-Type':     'application/json; charset=UTF-8;',
        'X-Requested-With': 'XMLHttpRequest'
    } );
    testObject: Object = TEST_OBJECT;
    testTypeObject: Object = TEST_TYPE_OBJECT;
    //can be 'cabinet' or 'ui'. Type of view depends on this
    typeLesson: string = RESTRICTIONS.programType === 'revision' ? 'cabinet' : 'ui';
    // ui, cabinet, lexis or grammar
    typeLessonString: string = RESTRICTIONS.programType === 'revision' ? 'LEXIS' : 'UI';
    options = new RequestOptions( { headers: this.headers } );
    id: number = null;
    
    /**
     * Commonly taken from queryParams of Angular router. Can be:
     * 'false!ui' - for program tests in lesson
     * 'true!cabinet' - for cabinet tests in lesson
     * 'true!lexis' - for lexis part in revision lesson type
     * 'true!grammar' - for grammar par in revision lesson type
     * 'true!checkPulse' - for check pulse
     * @type {string|string}
     */
    isRevision: string = RESTRICTIONS.programType === 'revision' ? 'true!lexis' : 'false!ui';
    
    //current test from list of tests
    currentTest: string = 'Choose test';
    
    audioType = RESTRICTIONS.audio.type;
    imageType = RESTRICTIONS.image.type;
    
    /**
     * List of test types
     * @type {Array}
     */
    testsMenu: any = [];
    
    /**
     * Opens material snack bar
     * @see {@link https://material.angular.io/components/snack-bar/overview} for more information
     * @param {string} message
     * @param {string} action
     * @param {string} type - type of message; snackBarSuccess, snackBarError, snackBarWarning
     * @return {void}
     */
    
    openSnackBar( message: string, action: string, type: string ): void {
        // noinspection TypeScriptValidateTypes
        this.snackBar.open( message, action, {
            duration:     5000,
            extraClasses: [ type ]
        } );
    }
    
    //todo зачем возвращать промис здесь?
    /**
     * Sends request to get test types list available to this lesson
     * @return {Promise}
     */
    getTestsMenu(): Promise<any> {
        return this.http.post( this.url, { 'function': 'getTestmenu' }, this.options )
            .toPromise()
            .then( ( response: Response ) => {
                this.testsMenu = response.json();
                this.testsMenu.map( ( item: any, index: any, array: any ) => {
                    item.route = item.name.toLowerCase().split( ' ' ).join( '-' );
                } );
            } );
    }
    
    /**
     * Method to save test to DB
     * @return {Promise}
     */
    saveTest(): Promise<any> {
        let self = this, router = this.router;
        self.testObject[ 'function' ] = 'setTest';
        
        return this.http.post( this.url, this.testObject, this.options )
            .toPromise()
            .then( function() {
                self.openSnackBar( 'Test save', 'Success!', 'snackBarSuccess' );
                router.navigate(['/lessonManage']).then(() => {
                    self.mainLessonService.getLesson().then( ( response: any ) => {
                        let res = response.json();
                        self.mainLessonService.listArray.overall = [];
                        self.mainLessonService.listArray.left = res.video_data || [];
                        self.mainLessonService.listArray.right = res.test_data || [];
                        self.mainLessonService.listArray.ruler = res.lesson_data || [];
                        self.mainLessonService.lessonType = res.type_lesson;
                        self.mainLessonService.lessonTitle = res.lesson_title;
                        self.mainLessonService.checkIfOnRuler();
                    } );
                });
            } );
    }
    
    /**
     * Method to open initialize test edition
     * @param id {number} test id
     * @return {Promise}
     */
    editTest( id: number ): Promise<any> {
        let routes = {
            1:  'build-the-word',
            3:  'tap-right-picture',
            4:  'build-the-sentence',
            5:  'tap-right-word',
            6:  'true-or-false',
            7:  'sorting',
            8:  'odd-one-out',
            9:  'tap-streak',
            10: 'beethoven',
            11: 'matching-words',
            12: 'matching-picture'
        };
        
        let router = this.router,
            obj = this.testObject,
            self = this,
            data;
        
        this.id = id;
        obj[ 'question_data' ] = [];
        
        return this.http.post( this.url, { 'function': 'getTestData', id: id }, this.options )
            .toPromise()
            .then( ( result: any ) => {
                data = result.json();
                obj[ 'question_data' ] = data.testPart;
                obj[ 'test_data' ][ 'test_model' ] = data.testData.test_model;
                obj[ 'test_data' ][ 'id_test_type' ] = data.testData.test_ui_type;
                obj[ 'test_data' ][ 'background' ] = '/Files/TestBackgrounds/' + data.testData.test_background;
                obj[ 'test_data' ][ 'test_sound' ] = '/Files/TestSound/' + data.testData.test_sound;
                obj[ 'test_data' ][ 'test_sound_name' ] = data.testData.test_sound;
                
                if ( data.testData.test_model == 7 ) {
                    obj[ 'test_data' ][ 'test_category' ] = [
                        data.testCategory[ 0 ][ 'test_question_category' ],
                        data.testCategory[ 1 ][ 'test_question_category' ]
                    ];
                }
                
                router.navigate( [
                    '/lessonManage', {
                        outlets: {
                            'leftContainer': [ routes[ data.testData.test_model ] ],
                            'manage':        [ 'testManage', routes[ data.testData.test_model ] ]
                        }
                    }
                ], {
                    queryParams: {
                        test:     routes[ data.testData.test_model ],
                        revision: self.isRevision
                    }
                } );
            } );
    }
    
    /**
     * Same as saveTest, but in test edition
     * @see saveTest
     * @return {any}
     */
    modifyTest(): Promise<any> {
        let self = this, router = this.router;
        this.testObject[ 'function' ] = 'modifyTest';
        this.testObject[ 'test_data' ].test_id = self.id;
        return this.http.post( this.url, this.testObject, this.options )
            .toPromise()
            .then( function() {
                self.openSnackBar( 'Test has been modified', 'Success!', 'snackBarSuccess' );
                router.navigate(['/lessonManage']);
            } );
    }
    
    /**
     * Method to delete test
     * @param id {number} test id in DB
     * @param index {number} *ngFor index
     * @return {Promise}
     */
    deleteTest( id: number, index: number ): Promise<any> {
        let self = this;
        return this.http.post( this.url, { 'function': 'deleteTest', id: id }, this.options )
            .toPromise()
            .then( function() {
                self.mainLessonService.listArray.overall.splice( index, 1 );
                self.openSnackBar( 'Test has been deleted!', `test id: ${id}`, 'snackBarSuccess' );
            } );
    }
}
