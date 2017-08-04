import { Component } from '@angular/core';
import { ManageTestService } from '../manage-test.service';
import { RESTRICTIONS } from '../collections/restrictions'

@Component( {
    selector: 'matching-word-word-right',
    template: `
        <div class="rowWrapper" *ngFor="let row of rows['question_data']; let i = index; trackBy: trackById">
            <md-input-container>
                <input required mdInput #firstInput type="text" (input)="onInput(i, $event, 'left')"
                       [value]="row.test_question_data_left">
                <md-hint align="end"
                         [ngClass]="{'fail': firstInput.value.length > restrictionInput}"
                         [innerHTML]="firstInput.value.length + '/' + restrictionInput">
                </md-hint>
            </md-input-container>
            <md-input-container>
                <input required mdInput #secondInput type="text" (input)="onInput(i, $event, 'right')"
                       [value]="row.test_question_data_right"
                       [tabindex]="i">
                <md-hint align="end"
                         [ngClass]="{'fail': secondInput.value.length > restrictionInput}"
                         [innerHTML]="secondInput.value.length + '/' + restrictionInput">
                </md-hint>
            </md-input-container>
            <button md-button class="delete" (click)="deleteRow(i)" tabindex="-1">
                <md-icon>delete</md-icon>
            </button>
        </div>

        <div class="addNewItems" [ngClass]="{'hidden': rows['question_data'].length === restrictionRows}">
            <button md-raised-button class="addButton green" (click)="createNewRow()" tabindex="-1">
                <md-icon>add</md-icon>
                <span>New</span>
            </button>
        </div>`
} )

export class MatchingWordWordRightComponent {
    constructor( private manageTestService: ManageTestService ) {
    }
    
    /**
     * Object with test data.
     * @type {Object}
     */
    rows = this.manageTestService.testObject;
    
    /**
     * Restrictions to the inputs of the test
     */
    private restrictionInput: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'matching-words' ].input;
    private restrictionRows: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'matching-words' ].rows;
    
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
     * Event listener for inputs
     * @param index {number} *ngFor index. Matches index in array
     * @param event {Event} Event Object
     * @param position {string} left or right column
     */
    onInput( index: number, event: any, position: string ): void {
        if ( position === 'left' ) {
            this.rows[ 'question_data' ][ index ].test_question_data_left = event.target.value;
            this.rows[ 'question_data' ][ index ].test_question_data = event.target.value + '|||' + this.rows[ 'question_data' ][ index ].test_question_data_right;
        } else {
            this.rows[ 'question_data' ][ index ].test_question_data_right = event.target.value;
            this.rows[ 'question_data' ][ index ].test_question_data = this.rows[ 'question_data' ][ index ].test_question_data_left + '|||' + event.target.value;
        }
    }
    
    /**
     * Creates new row by adding new Object to question_data. *ngFor does actual creation of row
     */
    createNewRow(): void {
        this.rows[ 'question_data' ].push( {
            test_question_data:       '',
            test_question_data_left:  '',
            test_question_data_right: ''
        } );
    }
    
    /**
     * Deletes row from array. *ngFor does the rest
     * @param index {number} *ngFor index. Matches index in array
     */
    deleteRow( index: number ): void {
        this.rows[ 'question_data' ].splice( index, 1 );
    }
}
