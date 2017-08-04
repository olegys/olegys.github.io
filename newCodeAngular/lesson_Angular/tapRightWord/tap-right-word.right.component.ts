import { Component } from '@angular/core';
import { ManageTestService } from '../manage-test.service';
import { MediaService } from '../media.service';
import { RESTRICTIONS } from '../collections/restrictions'

@Component( {
    selector: 'tap-right-word-right',
    template: `
        <div class="mainSound">
            <label (change)="mediaService.mainAudioReader($event)" class="addAudioButton">
                <md-icon *ngIf="!rows['test_data']['test_sound']">volume_up</md-icon>
                <input type="file" hidden [accept]="manageTestService.audioType" tabindex="-1">
                <span class="name" [innerHtml]="rows['test_data'].test_sound_name"></span>
            </label>
            <button md-mini-fab class="playButton" *ngIf="rows['test_data']['test_sound']" tabindex="-1">
                <md-icon (click)="$event.target.parentNode.querySelector('audio').play();">play_arrow</md-icon>
                <audio hidden [src]="rows['test_data'].test_sound"></audio>
            </button>
        </div>

        <div class="rowWrapper"
             *ngFor="let row of rows['question_data']; let i = index; trackBy: trackById"
             [ngClass]="{'right': row.test_question_type == 2, 'fixed': row.test_question_type == 1, 'wrong': row.test_question_type == 3}">

            <md-input-container class="mat-input-container">
                <input mdInput #length type="text" (input)="onInput(i, $event)" [value]="row.test_question_data" [tabindex]="i">
                <md-hint align="end"
                         [ngClass]="{'fail': length.value.length > restrictionInput}"
                         [innerHTML]="length.value.length + '/' + restrictionInput">
                </md-hint>
            </md-input-container>
            <button md-raised-button class="type" (click)="toggleType(i, row.test_question_type)"
                    tabindex="-1"
                    [innerHtml]="row.test_question_type == 1 ? 'Fixed' : row.test_question_type == 2 ? 'Right' : 'Wrong'">
            </button>
            <button md-button class="delete" (click)="deleteRow(i)"
                    tabindex="-1">
                <md-icon>delete</md-icon>
            </button>
        </div>
        <div class="addNewItems">
            <button md-raised-button class="addButton green" (click)="createNewRow(2)" tabindex="-1">
                <md-icon>add</md-icon>
                <span class="noSelect">Right</span>
            </button>
            <button md-raised-button class="addButton red" (click)="createNewRow(3)" tabindex="-1">
                <md-icon>remove</md-icon>
                <span class="noSelect">Wrong</span>
            </button>
            <button md-raised-button class="addButton gray" (click)="createNewRow(1)" tabindex="-1">
                <md-icon>clear</md-icon>
                <span class="noSelect">Fixed</span>
            </button>
        </div>`
} )

export class TapRightWordRightComponent {
    constructor( private manageTestService: ManageTestService,
                 private mediaService: MediaService ) {
    }
    
    /**
     * Object with test data.
     * @type {Object}
     */
    rows = this.manageTestService.testObject;
    
    /**
     * Restrictions to the inputs of the test
     */
    private restrictionInput: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'tap-right-word' ].input;
    
    /**
     * Tracking for *ngFor
     * @param index {number}
     * @param item {any}
     * @return {number}
     */
    trackById( index: number, item: any ): number {
        item.test_question_position = index;
        return item.id;
    }
    
    /**
     * Changes value of the current word
     * @param index {number} *ngFo index
     * @param event {Event}
     */
    onInput( index: number, event: any ): void {
        this.rows[ 'question_data' ][ index ].test_question_data = event.target.value;
    }
    
    /**
     * Creates new row by adding new Object to question_data. *ngFor does actual creation of row
     */
    createNewRow( type: number ): void {
        this.rows[ 'question_data' ].push( {
            test_question_data: '',
            test_question_type: type
        } );
    }
    
    /**
     * Toggles type of the row. Can be 'right' or 'left'. Both stand for category type
     * @param index {number} *ngFor index of row. Matches index in array
     * @param type {number} number of type of row. 1 - 'select', 2 - 'fixed'
     */
    toggleType( index: number, type: number ): void {
        if ( type == 1 ) {
            this.rows[ 'question_data' ][ index ].test_question_type = 2;
        } else if ( type == 2 ) {
            this.rows[ 'question_data' ][ index ].test_question_type = 3;
        } else {
            this.rows[ 'question_data' ][ index ].test_question_type = 1;
        }
    }
    
    /**
     * Deletes row from array. *ngFor does the rest
     * @param index {number} *ngFor index. Matches index in array
     */
    deleteRow( index: number ): void {
        this.rows[ 'question_data' ].splice( index, 1 );
    }
}
