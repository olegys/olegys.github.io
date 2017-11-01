import { Component, OnInit } from '@angular/core';
import { ManageTestService } from '../manage-test.service';
import { ActivatedRoute } from '@angular/router';
import { RESTRICTIONS } from '../collections/restrictions'

@Component({
    selector: 'odd-one-out-right',
    template: `
        <div class="rowWrapper" *ngFor="let row of rows['question_data']; let i = index; trackBy: trackById"
             [ngClass]="{'right': row.test_question_type == 2, 'wrong': row.test_question_type == 1}">
            <md-input-container>
                <input mdInput #length type="text" [(ngModel)]="row.test_question_data" [tabindex]="i">
                <md-hint align="end" [ngClass]="{'fail': length.value.length > restriction}"
                         [innerHTML]="length.value.length + ' / ' + restriction">
                </md-hint>
            </md-input-container>
            <button md-raised-button class="type" (click)="toggleType(i, row.test_question_type)" tabindex="-1">
                <span [innerHTML]="row.test_question_type == 2 ? 'Right' : 'Wrong'"></span>
            </button>
            <button md-button class="delete" (click)="deleteRow(i)" tabindex="-1">
                <md-icon>delete</md-icon>
            </button>
        </div>
        <div class="addNewItems">
            <button md-raised-button class="right addButton green" (click)="createNewRow(2)" tabindex="-1">
                <md-icon>add</md-icon>
                <span class="noSelect">Right</span>
            </button>
            <button md-raised-button class="wrong addButton gray" (click)="createNewRow(1)" tabindex="-1">
                <md-icon>remove</md-icon>
                <span class="noSelect">Wrong</span>
            </button>
        </div>`
})

export class OddOneOutRightComponent implements OnInit {
    constructor(private manageTestService: ManageTestService,
                private route: ActivatedRoute) {
    }

    private restriction: number = RESTRICTIONS[ RESTRICTIONS[ 'programType' ] ][ 'odd-one-out' ];

    rows = this.manageTestService.testObject;

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
     * @param typeRow {number}
     */
    createNewRow(typeRow: number): void {
        this.rows[ 'question_data' ].push({
            test_question_position: '',
            test_question_data: '',
            test_question_type: typeRow
        });
    }

    /**
     * Delete selected row
     * @param index {number} index of row
     */
    deleteRow(index: number): void {
        this.rows[ 'question_data' ].splice(index, 1);
    }

    /**
     * Toggle type of row
     * @param index {number} index of row
     * @param type {number} type of row
     */
    toggleType(index: number, type: number): void {
        if (type == 2) {
            this.rows[ 'question_data' ][ index ].test_question_type = 1;
        } else if (type == 1) {
            this.rows[ 'question_data' ][ index ].test_question_type = 2;
        }
    }
}
