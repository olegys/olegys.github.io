import { Injectable } from '@angular/core';
import { ManageTestService } from './manage-test.service';
import { RESTRICTIONS } from './collections/restrictions';

@Injectable()
export class MediaService {
    constructor( private manageTestService: ManageTestService ) {
    }
    
    /**
     * Method for common or question pictures load (like small pictures for tap right picture or matching word picture)
     * @param event {Event}
     * @param i {number} index of row
     * @return {void}
     */
    private imageReader( event: any, i: number ): void {
        let reader = new FileReader(),
            fileType: string = event.target.files[ 0 ] && event.target.files[ 0 ].type,
            fileSize: number = event.target.files[ 0 ] && event.target.files[ 0 ].size;
        
        if ( !event.target.files[ 0 ] ) return;
        
        if ( event.target.getAttribute( 'accept' ).split( '/' )[ 0 ] !== fileType.split( '/' )[ 0 ] ) {
            this.manageTestService.openSnackBar( 'Incorrect file type', 'close', 'snackBarError' );
            return;
        }
        
        reader.onload = ( event: any ): void => {
            let img = new Image();
            img.onload = (): void => {
                if ( fileSize >= RESTRICTIONS.image.size ) {
                    this.manageTestService.openSnackBar( 'File size must be less than ' + (RESTRICTIONS.image.size / 1024) + 'kb', 'close', 'snackBarError' );
                    return;
                } else if ( img.width > RESTRICTIONS[ RESTRICTIONS.programType ][ this.manageTestService.currentTest ].imageWidth || img.height > RESTRICTIONS[ RESTRICTIONS.programType ][ this.manageTestService.currentTest ].imageHeight ) {
                    this.manageTestService.openSnackBar( 'File width or height is not correct', 'close', 'snackBarWarning' );
                }
                this.rows[ 'question_data' ][ i ].test_question_image = event.target.result;
            };
            img.src = reader.result;
        };
        reader.readAsDataURL( event.target.files[ 0 ] );
    };
    
    /**
     * Method for backgrounds load. Backgrounds are common thing for program tests, but not for cabinet (revision)
     * @param event {Event}
     * @return {void}
     */
    private backgroundReader( event: any ): void {
        console.log( event );
        let reader = new FileReader(),
            fileType: string = event.target.files[ 0 ] && event.target.files[ 0 ].type,
            fileSize: number = event.target.files[ 0 ] && event.target.files[ 0 ].size;
        
        if ( !event.target.files[ 0 ] ) return;
        
        if ( event.target.getAttribute( 'accept' ).split( '/' )[ 0 ] !== fileType.split( '/' )[ 0 ] ) {
            this.manageTestService.openSnackBar( 'Incorrect file type', 'close', 'snackBarError' );
            return;
        }
        
        reader.onload = ( event: any ): void => {
            let img = new Image();
            img.onload = (): void => {
                if ( fileSize >= RESTRICTIONS.background.size ) {
                    this.manageTestService.openSnackBar( 'File size must be less than ' + (RESTRICTIONS.background.size / 1024) + 'kb', 'close', 'snackBarError' );
                    return;
                } else if ( img.width > RESTRICTIONS.background.width || img.height > RESTRICTIONS.background.height ) {
                    this.manageTestService.openSnackBar( 'File width or height is not correct', 'close', 'snackBarWarning' );
                }
                this.rows[ 'test_data' ].background = event.target.result;
            };
            img.src = reader.result;
        };
        reader.readAsDataURL( event.target.files[ 0 ] );
    }
    
    /**
     * Method for common or question sound (like fragments in beethoven)
     * @param event {Event}
     * @param i {number} index of row
     * @return {void}
     */
    private audioReader( event: any, i: number ): void {
        let reader = new FileReader(),
            fileType: string = event.target.files[ 0 ] && event.target.files[ 0 ].type,
            fileName: string = event.target.files[ 0 ] && event.target.files[ 0 ].name,
            fileSize: number = event.target.files[ 0 ] && event.target.files[ 0 ].size;
        
        if ( !event.target.files[ 0 ] ) return;
        
        if ( event.target.getAttribute( 'accept' ).split( '/' )[ 0 ] !== fileType.split( '/' )[ 0 ] ) {
            this.manageTestService.openSnackBar( 'Incorrect file type', 'close', 'snackBarError' );
            return;
        }
        
        reader.onload = ( event: any ): void => {
            if ( fileSize >= RESTRICTIONS.audio.size ) {
                this.manageTestService.openSnackBar( 'File size must be less than ' + (RESTRICTIONS.audio.size / 1024) + 'kb', 'close', 'snackBarError' );
                return;
            } else {
                this.rows[ 'question_data' ][ i ].test_question_audio = event.target.result;
                this.rows[ 'question_data' ][ i ].test_question_audio_name = fileName;
            }
        };
        reader.readAsDataURL( event.target.files[ 0 ] );
    }
    
    /**
     * Method for main or answer sound (like whole answer from beethoven or build the word)
     * @param event {Event}
     * @return {void}
     */
    private mainAudioReader( event: any ): void {
        let reader = new FileReader(),
            fileType: string = event.target.files[ 0 ] && event.target.files[ 0 ].type,
            fileName: string = event.target.files[ 0 ] && event.target.files[ 0 ].name,
            fileSize: number = event.target.files[ 0 ] && event.target.files[ 0 ].size;
        
        if ( !event.target.files[ 0 ] ) return;
        
        if ( event.target.getAttribute( 'accept' ).split( '/' )[ 0 ] !== fileType.split( '/' )[ 0 ] ) {
            this.manageTestService.openSnackBar( 'Incorrect file type', 'close', 'snackBarError' );
            return;
        }
        
        reader.onload = ( event: any ): void => {
            if ( fileSize >= RESTRICTIONS.audio.size ) {
                this.manageTestService.openSnackBar( 'File size must be less than ' + (RESTRICTIONS.audio.size / 1024) + 'kb', 'close', 'snackBarError' );
                return;
            } else {
                this.rows[ 'test_data' ][ 'test_sound' ] = event.target.result;
                this.rows[ 'test_data' ].test_sound_name = fileName;
            }
        };
        reader.readAsDataURL( event.target.files[ 0 ] );
    }
    
    rows = this.manageTestService.testObject;
}
