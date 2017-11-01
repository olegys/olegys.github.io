import { Component } from '@angular/core';
import { ManageTestService } from '../manage-test.service';
import { MediaService } from '../media.service';
import { ActivatedRoute } from '@angular/router';
import { RESTRICTIONS } from '../collections/restrictions';

@Component( {
    selector: 'tap-right-picture-right',
    template: `
        <div class="rowWrapper" *ngFor="let item of rows['question_data']; index as i; trackBy: trackById">
            <label (change)="mediaService.imageReader($event, i);">
                <div class="uploadImg" [ngStyle]="{'background-image': 'url(' + item.test_question_image + ')'}">
                    <md-icon *ngIf="!item.test_question_image">filter_hdr</md-icon>
                    <input type="file" hidden [accept]="manageTestService.imageType">
                </div>
            </label>
            <div>
                <md-input-container>
                    <input mdInput #length (input)="onInput(i, $event)" (focus)="onFocus(i)"
                           [tabindex]="i"
                           [value]="item.test_question_data">
                    <md-hint align="end"
                             [ngClass]="{'fail': length.value.length > restrictionInput}"
                             [innerHTML]="length.value.length + '/' + restrictionInput">
                    </md-hint>
                </md-input-container>
                <div class="buttonWrapper">
                    <label (change)="mediaService.audioReader($event, i)" class="addAudioButton">
                        <md-icon *ngIf="!item.test_question_audio_name">audiotrack</md-icon>
                        <input type="file" hidden [accept]="manageTestService.audioType" tabindex="-1">
                        <span class="name" [innerHtml]="item.test_question_audio_name"></span>
                    </label>
                    <button md-mini-fab class="playButton" *ngIf="item.test_question_audio" tabindex="-1">
                        <md-icon (click)="$event.target.parentNode.querySelector('audio').play();">play_arrow</md-icon>
                        <audio hidden [src]="item.test_question_audio"></audio>
                    </button>
                </div>
            </div>
            <button md-button class="delete" (click)="deleteRow(i)" tabindex="-1">
                <md-icon>delete</md-icon>
            </button>
        </div>
        <div class="addNewItems" [ngClass]="{'hidden': rows['question_data'].length === restrictionRows}">
            <button md-raised-button class="addButton true green" (click)="createNewRow()" tabindex="-1">
                <md-icon>add</md-icon>
                <span>New</span>
            </button>
        </div>
    `
} )

export class TapRightPictureRightComponent {
    constructor( private manageTestService: ManageTestService,
                 private mediaService: MediaService,
                 private route: ActivatedRoute ) {
    }
    
    rows = this.manageTestService.testObject;
    private restrictionInput: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'tap-right-picture' ].input;
    private restrictionRows: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'tap-right-picture' ].rows;
    private restrictionImageWidth: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'tap-right-picture' ].imageWidth;
    private restrictionImageHeight: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'tap-right-picture' ].imageHeight;
    
    ngOnInit() {
        this.route.params.subscribe( ( params: { test: any } ) => {
            this.manageTestService.testObject[ 'test_data' ].id_test_type = this.manageTestService.testTypeObject[ this.manageTestService.typeLesson ][ params.test ].id_test_type;
            this.manageTestService.testObject[ 'test_data' ].test_model = this.manageTestService.testTypeObject[ this.manageTestService.typeLesson ][ params.test ].test_model;
        } );
    }
    
    createNewRow(): void {
        this.rows[ 'question_data' ].push( {
            test_question_audio:    null,
            test_question_data:     '',
            test_question_image:    `http://via.placeholder.com/${this.restrictionImageWidth}x${this.restrictionImageHeight}`,
            test_question_position: ''
        } );
    }
    
    trackById( index: number, item: any ): number {
        item.test_question_position = index;
        return item.id;
    }
    
    onInput( index: number, value: any ): void {
        this.rows[ 'question_data' ][ index ].test_question_data = this.rows[ 'word' ] = value.target.value;
    }
    
    onFocus( index: number ): void {
        this.rows[ 'index' ] = index;
    }
    
    deleteRow( index: number ): void {
        this.rows[ 'question_data' ].splice( index, 1 );
    }
}
