import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MainLessonService {
    url: string = location.href.match( /^.+\d\// )[ 0 ];
    headers: any = new Headers( {
        'Content-Type':     'application/json; charset=UTF-8;',
        'X-Requested-With': 'XMLHttpRequest'
    } );
    options = new RequestOptions( { headers: this.headers } );
    
    /**
     * Object which contains data for ruler, videos and tests.
     * left, right, ruler are deprecated. Use overall instead
     * @type {{left: Array; right: Array; ruler: Array; overall: Array}}
     */
    listArray: any = {
        /**
         * @deprecated Use overall instead
         */
        left:    [],
        /**
         * @deprecated Use overall instead
         */
        right:   [],
        /**
         * @deprecated Use overall instead
         */
        ruler:   [],
        overall: []
    };
    
    /**
     * Lesson type. Table catalog_topic in DB
     * 3 Listening & Comprehension
     * 4 Entertainment
     * 2 Grammar
     * 5 Lexis
     * 6 Speaking
     * 7 Revision
     * @type {string}
     */
    lessonType: string = '';
    
    /**
     * The 'name' of the lesson
     * @type {string}
     */
    lessonTitle: string = '';
    
    /**
     * Test id in database
     * @type {number}
     */
    id: number = null;
    
    constructor( private http: Http ) {
        this.getLesson().then( ( response: any ) => {
            let res = response.json();
            this.listArray.left = res.video_data || [];
            this.listArray.right = res.test_data || [];
            this.listArray.ruler = res.lesson_data || [];
            this.lessonType = res.type_lesson;
            this.lessonTitle = res.lesson_title;
            this.checkIfOnRuler();
        } );
    }
    
    /**
     * Merges arrays with lesson data in one. Hash property $$onRuler makes an object to appear on ruler
     */
    public checkIfOnRuler() {
        let str = this.listArray.ruler.reduce( function( p: any, c: any ) {
            return p + '|' + c.name;
        }, '' );
        
        this.listArray.right.map( map );
        this.listArray.left.map( map );
        
        for ( let key in this.listArray ) {
            if ( key === 'overall' ) break;
            this.listArray[ key ].map( ( element: any ) => {
                element.$$ruler = key === 'ruler';
                if ( !element.$$onRuler ) {
                    this.listArray.overall.push( element );
                }
                
            } );
        }
        
        function map( element: any ) {
            if ( str.search( element.name ) > -1 ) {
                element.$$onRuler = true;
            }
            return element;
        }
    }
    
    /**
     * Get lesson data from server
     * @return {Promise}
     */
    getLesson(): Promise<any> {
        return this.http.post( this.url, { 'function': 'getTest' }, this.options )
            .toPromise();
    }
    
    /**
     * Method to save lesson. It appears, that only array form ruler is saved to DB with this one.
     * @return {Promise}
     */
    saveLesson(): Promise<any> {
        let array: Array<any> = this.listArray.overall.filter( ( el: any ) => {
            return el.$$ruler;
        } );
        
        let data = {
            'function': 'setLesson',
            'lesson':   array
        };
        
        return this.http.post( this.url, data, this.options )
            .toPromise()
            .then( function() {
            } );
    }
}
