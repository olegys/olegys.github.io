import { Component, OnInit } from '@angular/core';
import { ManageTestService } from '../manage-test.service';
import { MediaService } from '../media.service';
import { RESTRICTIONS } from '../collections/restrictions'

@Component( {
    selector: 'sorting-right',
    template: `
        <div class="mainRow">
            <md-input-container class="firsRow">
                <input mdInput #firstInput type="text" [(ngModel)]="rows.test_data.test_category[0]"
                       placeholder="Category Left">
                <md-hint align="end"
                         [ngClass]="{'fail': firstInput.value.length > restrictionCategory}"
                         [innerHTML]="firstInput.value.length + '/' + restrictionCategory">
                </md-hint>
            </md-input-container>
            <md-input-container class="secondRow">
                <input mdInput #secondInput type="text" [(ngModel)]="rows.test_data.test_category[1]"
                       [tabindex]="i"
                       placeholder="Category Right">
                <md-hint align="end"
                         [ngClass]="{'fail': secondInput.value.length > restrictionCategory}"
                         [innerHTML]="secondInput.value.length + '/' + restrictionCategory">
                </md-hint>
            </md-input-container>
        </div>
        <div class="rowWrapper"
             *ngFor="let row of rows['question_data']; let i = index; trackBy: trackById"
             [ngClass]="row.test_question_type == 2 ? 'left' : 'right'">
            <md-input-container>
                <input required mdInput #input type="text" (focus)="onFocus(i)" (input)="onInputRow($event, i)"
                       [value]="row.test_question_data">
                <md-hint align="end"
                         [ngClass]="{'fail': input.value.length > restrictionInput}"
                         [innerHTML]="input.value.length + '/' + restrictionInput">
                </md-hint>
            </md-input-container>
            <div class="buttonWrapper">
                <label (change)="mediaService.audioReader($event, i)" class="addAudioButton">
                    <md-icon *ngIf="!row.test_question_audio_name">audiotrack</md-icon>
                    <input type="file" hidden [accept]="manageTestService.audioType" tabindex="-1">
                    <span class="name">{{row.test_question_audio_name}}</span>
                </label>
                <button md-mini-fab class="playButton" *ngIf="row.test_question_audio" tabindex="-1">
                    <md-icon (click)="$event.target.parentNode.querySelector('audio').play();">play_arrow</md-icon>
                    <audio hidden [src]="row.test_question_audio"></audio>
                </button>
            </div>
            <button md-raised-button class="type" (click)="toggleType(i, row.test_question_type)" tabindex="-1">
                <span>{{row.test_question_type == 2 ? 'Left' : 'Right'}}</span>
            </button>
            <button md-button class="delete" (click)="deleteRow(i)" tabindex="-1">
                <md-icon>delete</md-icon>
            </button>
        </div>

        <div class="addNewItems">
            <button md-raised-button class="addButton green left" (click)="createNewRow(2)" tabindex="-1">
                <md-icon>add</md-icon>
                <span class="noSelect">Left</span>
            </button>
            <button md-raised-button class="addButton gray right" (click)="createNewRow(1)" tabindex="-1">
                <md-icon>add</md-icon>
                <span class="noSelect">Right</span>
            </button>
        </div>`
} )

export class SortingRightComponent implements OnInit {
    constructor( private manageTestService: ManageTestService, private mediaService: MediaService ) {
    }
    
    /**
     * Object with test data.
     * @type {Object}
     */
    rows = this.manageTestService.testObject;
    
    /**
     * Restrictions to the inputs of the test
     */
    private restrictionCategory: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'sorting' ].category;
    private restrictionInput: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'sorting' ].input;
    
    /**
     * Creates array with empty categories if none was detected
     * (array with categories may be already in place only if modifying)
     */
    ngOnInit() {
        if ( !this.rows[ 'test_data' ].test_category ) {
            this.rows[ 'test_data' ].test_category = [ '', '' ];
        }
    }
    
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
     * @param event {Event}
     * @param index {number} index of *ngFor.
     */
    onInputRow( event: any, index: number ): void {
        this.rows[ 'query' ] = index;
        this.rows[ 'question_data' ][ index ].test_question_data = event.target.value;
    }
    
    /**
     * Shows selected word in the left side
     * @param index {number} *ngFor index
     */
    onFocus( index: number ): void {
        this.rows[ 'query' ] = index;
    }
    
    /**
     * Creates new row by adding new Object to question_data. *ngFor does actual creation of row
     */
    createNewRow( type: number ): void {
        this.rows[ 'question_data' ].push( {
            test_question_data:       '',
            test_question_audio:      '',
            test_question_audio_name: '',
            test_question_type:       type,
        } );
    }
    
    /**
     * Toggles type of the row. Can be 'right' or 'left'. Both stand for category type
     * @param index {number} *ngFor index of row. Matches index in array
     * @param type {number} number of type of row. 1 - 'select', 2 - 'fixed'
     */
    toggleType( index: number, type: number ): void {
        if ( type == 2 ) {
            this.rows[ 'question_data' ][ index ].test_question_type = 1;
        } else if ( type == 1 ) {
            this.rows[ 'question_data' ][ index ].test_question_type = 2;
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
