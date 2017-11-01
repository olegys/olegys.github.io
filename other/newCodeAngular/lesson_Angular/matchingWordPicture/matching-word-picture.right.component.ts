import { Component } from '@angular/core';

import { MediaService } from '../media.service';
import { ManageTestService } from '../manage-test.service';

import { RESTRICTIONS } from '../collections/restrictions'

@Component( {
    selector: 'matching-word-picture-right',
    template: `
        <div class="rowWrapper" *ngFor="let row of rows.question_data; let i = index; trackBy: trackById">
            <label>
                <div class="uploadImg" [ngStyle]="{'background-image': 'url(' + row.test_question_image + ')'}">
                    <md-icon class="imgIcon" *ngIf="row.test_question_image === ''">
                        filter_hdr
                    </md-icon>
                    <input type="file" (change)="mediaService.imageReader($event, i);" hidden [accept]="manageTestService.imageType">
                </div>
            </label>
            <md-input-container>
                <input mdInput #length type="text" [(ngModel)]="row.test_question_data" [tabindex]="i">
                <md-hint align="end"
                         [ngClass]="{'fail': length.value.length > restrictionInput}"
                         [innerHTML]="length.value.length + '/' + restrictionInput">
                </md-hint>
            </md-input-container>
            <button md-button class="delete" (click)="deleteRow(i)" tabindex="-1">
                <md-icon>delete</md-icon>
            </button>
        </div>
        <div class="addNewItems" [ngClass]="{'hidden': rows.question_data.length === restrictionRows}">
            <button md-raised-button class="addButton green" (click)="createNewRow()" tabindex="-1">
                <md-icon>add</md-icon>
                <span>New</span>
            </button>
        </div>`
} )

export class MatchingWordPictureRightComponent {
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
    private restrictionInput: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'matching-picture' ].input;
    private restrictionRows: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'matching-picture' ].rows;
    private restrictionImageWidth: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'matching-picture' ].imageWidth;
    private restrictionImageHeight: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'matching-picture' ].imageHeight;
    
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
     * Creates new row by adding new Object to question_data. *ngFor does actual creation of row
     */
    createNewRow(): void {
        this.rows[ 'question_data' ].push( {
            test_question_position: '',
            test_question_image:    `http://via.placeholder.com/${this.restrictionImageWidth}x${this.restrictionImageHeight}`,
            test_question_data:     ''
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
