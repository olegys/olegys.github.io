import { Component } from '@angular/core';
import { ManageTestService } from '../manage-test.service';
import { MediaService } from '../media.service';
import { ActivatedRoute } from '@angular/router';
import { RESTRICTIONS } from '../collections/restrictions';

@Component( {
    selector: 'tap-streak-right',
    template: `
        <div class="rowWrapper" *ngFor="let item of rows['question_data']; let i = index; trackBy: trackById">
            <label (change)="mediaService.imageReader($event, i);">
                <div class="uploadImg" [ngStyle]="{'background-image': 'url(' + item.test_question_image + ')'}">
                    <md-icon *ngIf="!item.test_question_image">filter_hdr</md-icon>
                    <input type="file" hidden [accept]="manageTestService.imageType">
                </div>
            </label>
            <div>
                <md-input-container>
                    <input mdInput #length (input)="onInput(i, $event)" [value]="item.test_question_data">
                    <md-hint align="end"
                             [ngClass]="{'fail': length.value.length > restrictionInput}"
                             [innerHTML]="length.value.length + '/' + restrictionInput">
                    </md-hint>
                </md-input-container>
                <div class="buttonWrapper">
                    <label (change)="mediaService.audioReader($event, i)" class="addAudioButton">
                        <md-icon *ngIf="!item.test_question_audio_name">audiotrack</md-icon>
                        <input type="file" hidden [accept]="manageTestService.audioType">
                        <span class="name"
                              [ngClass]="{'hidden': !item.test_question_audio_name}"
                              [innerHtml]="item.test_question_audio_name">
                        </span>
                    </label>
                    <button md-mini-fab class="playButton" *ngIf="item.test_question_audio">
                        <md-icon (click)="$event.target.parentNode.querySelector('audio').play();">play_arrow</md-icon>
                        <audio hidden [src]="item.test_question_audio"></audio>
                    </button>
                </div>
            </div>
            <button md-button class="delete" (click)="deleteRow(i)">
                <md-icon>delete</md-icon>
            </button>
        </div>
        <div class="addNewItems" [ngClass]="{'hidden': rows['question_data'].length === restrictionRows}">
            <button md-raised-button class="addButton green" (click)="createNewRow()">
                <md-icon>add</md-icon>
                <span>New</span>
            </button>
        </div>
    `
} )

export class TapStreakRightComponent {
    constructor( private manageTestService: ManageTestService,
                 private mediaService: MediaService,
                 private route: ActivatedRoute ) {
    }
    /**
     * Object with test data.
     * @type {Object}
     */
    rows = this.manageTestService.testObject;
    
    /**
     * Restrictions to the inputs of the test
     */
    private restrictionInput: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'tap-streak' ].input;
    private restrictionRows: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'tap-streak' ].rows;
    private restrictionImageWidth: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'tap-streak' ].imageWidth;
    private restrictionImageHeight: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'tap-streak' ].imageHeight;
    
    /**
     * Creates new row by adding new Object to question_data. *ngFor does actual creation of row
     */
    createNewRow(): void {
        this.rows[ 'question_data' ].push( {
            'test_question_audio':    null,
            'test_question_data':     null,
            'test_question_image':    `http://via.placeholder.com/${this.restrictionImageWidth}x${this.restrictionImageHeight}`,
            'test_question_position': ''
        } );
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
    
    onInput( index: number, value: any ): void {
        this.rows[ 'question_data' ][ index ].test_question_data = value.target.value;
    }
    
    /**
     * Deletes row from array. *ngFor does the rest
     * @param index {number} *ngFor index. Matches index in array
     */
    deleteRow( index: number ): void {
        this.rows[ 'question_data' ].splice( index, 1 );
    }
}
