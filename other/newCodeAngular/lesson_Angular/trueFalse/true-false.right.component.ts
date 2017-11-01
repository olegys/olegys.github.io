import { Component, OnInit } from '@angular/core';
import { ManageTestService } from '../manage-test.service';
import { MediaService } from '../media.service';
import { ActivatedRoute } from '@angular/router';
import { RESTRICTIONS } from '../collections/restrictions'

@Component({
    selector: 'true-false-right',
    template: `
        <div class="rowWrapper" *ngFor="let row of rows['question_data']; let i = index; trackBy: trackById;"
             [ngClass]="{'true': row.test_question_type == 2, 'false': row.test_question_type == 1}">
            <md-input-container>
                <input mdInput #length (input)="onInput(i, $event)" (focus)="onFocus(i)"
                       [value]="rows['question_data'][i].test_question_data">
                <md-hint
                        align="end"
                        [ngClass]="{'fail': length.value.length > restriction}"
                        [innerHTML]="length.value.length + '/' + restriction">
                </md-hint>
            </md-input-container>
            <button md-raised-button class="type" (click)="toggleType(i, row.test_question_type)">
                <span [innerHtml]="row.test_question_type == 2 ? 'True' : 'False'"></span>
            </button>
            <button md-button class="delete" (click)="deleteRow(i)">
                <md-icon>delete</md-icon>
            </button>
        </div>
        <div class="addNewItems">
            <button md-raised-button class="addButton green" (click)="createNewRow(2)">
                <md-icon>add</md-icon>
                <span>True</span>
            </button>
            <button md-raised-button class="addButton gray" (click)="createNewRow(1)">
                <md-icon>remove</md-icon>
                <span>False</span>
            </button>
        </div>`
})

export class TrueFalseRightComponent implements OnInit {
    constructor(private manageTestService: ManageTestService,
                private mediaService: MediaService,
                private route: ActivatedRoute) {
    }

    private restriction: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'true-or-false' ];

    trackById(index: number, item: any): number {
        item.test_question_position = index;
        return item.id;
    }

    ngOnInit() {
        this.route.params.subscribe((params: { test: any }) => {
            this.manageTestService.testObject[ 'test_data' ].id_test_type = this.manageTestService.testTypeObject[ this.manageTestService.typeLesson ][ params.test ].id_test_type;
            this.manageTestService.testObject[ 'test_data' ].test_model = this.manageTestService.testTypeObject[ this.manageTestService.typeLesson ][ params.test ].test_model;
        });
    }

    rows = this.manageTestService.testObject;

    index: number = 0;

    onInput(index: number, value: any): void {
        this.rows[ 'question_data' ][ index ].test_question_data = this.rows[ 'word' ] = value.target.value;
    }

    onFocus(index: number): void {
        this.rows[ 'index' ] = index;
    }

    // 1 - False
    // 2 - True
    createNewRow(typeRow: number): void {
        let type: string = typeRow === 2 ? 'True' : 'False';

        this.rows[ 'question_data' ].push({
            test_type: type,
            test_question_data: null,
            test_question_type: typeRow
        });
    }

    deleteRow(index: number): void {
        this.rows[ 'question_data' ].splice(index, 1);
    }

    toggleType(index: number, type: number): void {
        type == 2 ? this.rows[ 'question_data' ][ index ].test_question_type = 1 : this.rows[ 'question_data' ][ index ].test_question_type = 2;
    }
}
