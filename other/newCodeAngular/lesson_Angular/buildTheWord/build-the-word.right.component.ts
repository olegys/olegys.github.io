import { Component, OnInit } from '@angular/core';

import { MediaService } from '../media.service';
import { ManageTestService } from '../manage-test.service';

import { ActivatedRoute } from '@angular/router';
import { RESTRICTIONS } from '../collections/restrictions'

@Component({
    selector: 'build-the-sentence-right',
    template: `
        <div class="mainSound">
            <label (change)="mediaService.mainAudioReader($event)" class="addAudioButton">
                <md-icon *ngIf="!rows['test_data'].test_sound">volume_up</md-icon>
                <input type="file" hidden [accept]="manageTestService.audioType">
                <span class="name" [innerHtml]="rows['test_data'].test_sound_name"></span>
            </label>
            <button md-mini-fab class="playButton" *ngIf="rows['test_data'].test_sound">
                <md-icon (click)="$event.target.parentNode.querySelector('audio').play();">play_arrow</md-icon>
                <audio hidden [src]="rows['test_data'].test_sound"></audio>
            </button>
        </div>

        <div class="rowWrapper"
             *ngFor="let row of rows.question_data; let i = index; trackBy: trackById"
             [ngClass]="{'select': row.test_question_type == 2, 'fixed': row.test_question_type == 1}">
            <md-input-container>
                <input mdInput #length type="text" [(ngModel)]="row.test_question_data" [tabindex]="i">
                <md-hint align="end"
                         [ngClass]="{'fail': length.value.length > restrictionInput}"
                         [innerHTML]="length.value.length + '/' + restrictionInput">
                </md-hint>
            </md-input-container>
            <button md-raised-button class="type" (click)="toggleType(i, row.test_question_type)" tabindex="-1"
                    [innerHtml]="row.test_question_type == 2 ? 'Select' : 'Fixed'">
            </button>
            <button md-button class="delete" (click)="deleteRow(i)" tabindex="-1">
                <md-icon>delete</md-icon>
            </button>
        </div>
        <div class="addNewItems" [ngClass]="{'hidden': rows.question_data.length === restrictionRows}">
            <button md-raised-button class="addButton select green" (click)="createNewRow(2)" tabindex="-1">
                <md-icon>add</md-icon>
                <span class="noSelect">Select</span>
            </button>
            <button md-raised-button class="addButton gray" (click)="createNewRow(1)" tabindex="-1">
                <md-icon>remove</md-icon>
                <span class="noSelect">Fixed</span>
            </button>
        </div>`
})

export class BuildTheWordRightComponent implements OnInit {
    constructor(private mediaService: MediaService,
                private manageTestService: ManageTestService,
                private route: ActivatedRoute) {
    }
    
    /**
     * Object with test data.
     * @type {Object}
     */
    rows = this.manageTestService.testObject;
    
    /**
     * Restrictions to the inputs of the test
     */
    private restrictionInput: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'build-the-word' ].input;
    private restrictionRows: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'build-the-word' ].rows;

    ngOnInit() {
        this.route.params.subscribe((params: { test: any }) => {
            this.manageTestService.testObject[ 'test_data' ].id_test_type = this.manageTestService.testTypeObject[ this.manageTestService.typeLesson ][ params.test ].id_test_type;
            this.manageTestService.testObject[ 'test_data' ].test_model = this.manageTestService.testTypeObject[ this.manageTestService.typeLesson ][ params.test ].test_model;
        });
    }
    
    /**
     * Tracking for *ngFor
     * @param index {number}
     * @param item {any}
     * @return {number}
     */
    trackById(index: number, item: any): number {
        item.test_question_position = index;
        return item.id;
    }
    
    /**
     * Creates new row by adding new Object to question_data. *ngFor does actual creation of row
     */
    createNewRow(type: number): void {
        this.rows[ 'question_data' ].push({
            test_question_data: '',
            test_question_type: type
        });
    }
    
    /**
     * Toggles type of the row. Can be 'fixed' or 'select' (wtf)
     * Explanation.
     * 'Fixed' - word is fixed to the bottom and is already the part of correct answer
     * 'Select' - word can be selected by user in social part and placed in order to finish the test
     * @param index {number} *ngFor index of row. Matches index in array
     * @param type {number} number of type of row. 1 - 'select', 2 - 'fixed'
     */
    toggleType(index: number, type: number): void {
        if (type == 2) {
            this.rows[ 'question_data' ][ index ].test_question_type = 1;
        } else if (type == 1) {
            this.rows[ 'question_data' ][ index ].test_question_type = 2;
        }
    }
    
    /**
     * Deletes row from array. *ngFor does the rest
     * @param index {number} *ngFor index. Matches index in array
     */
    deleteRow(index: number): void {
        this.rows[ 'question_data' ].splice(index, 1);
    }
}
