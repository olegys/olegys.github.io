import { Component } from '@angular/core';

import { MediaService } from '../media.service';
import { ManageTestService } from '../manage-test.service';

import { RESTRICTIONS } from '../collections/restrictions';

@Component( {
    selector: 'beethoven-right',
    template: `
        <div class="mainSound">
            <div class="buttonWrapper">
                <label (change)="mediaService.mainAudioReader($event)" class="addAudioButton">
                    <md-icon *ngIf="!rows['test_data']['test_sound']">volume_up</md-icon>
                    <input type="file" hidden [accept]="manageTestService.audioType">
                    <span class="name" [innerHtml]="rows['test_data'].test_sound_name"></span>
                </label>
                <button md-mini-fab class="playButton" *ngIf="rows['test_data']['test_sound']">
                    <md-icon (click)="$event.target.parentNode.querySelector('audio').play();">play_arrow</md-icon>
                    <audio hidden [src]="rows['test_data']['test_sound']"></audio>
                </button>
            </div>
        </div>

        <div class="rowWrapper" *ngFor="let row of rows['question_data']; let i = index; trackBy: trackById">
            <label (change)="mediaService.audioReader($event, i)" class="addAudioButton">
                <md-icon *ngIf="!row.test_question_audio_name">audiotrack</md-icon>
                <input type="file" hidden [accept]="manageTestService.audioType">
                <span class="name"
                      [ngClass]="{'hidden': !row.test_question_audio_name}"
                      [innerHtml]="row.test_question_audio_name">
                </span>
            </label>
            <button md-mini-fab class="playButton" *ngIf="row.test_question_audio">
                <md-icon (click)="$event.target.parentNode.querySelector('audio').play();">play_arrow</md-icon>
                <audio hidden [src]="row.test_question_audio"></audio>
            </button>
            <button md-button class="delete" (click)="deleteRow(i)">
                <md-icon>delete</md-icon>
            </button>
        </div>

        <div class="addNewItems" [ngClass]="{'hidden': rows['question_data'].length === restriction}">
            <button md-raised-button class="addButton green" (click)="createNewRow()">
                <md-icon>add</md-icon>
                <span>New</span>
            </button>
        </div>`
} )

export class BeethovenRightComponent {
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
    private restriction: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'beethoven' ];
    
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
            test_question_audio:      '',
            test_question_audio_name: ''
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
