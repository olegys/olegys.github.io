import { Component } from '@angular/core';
import { MainLessonService } from './lesson.service';
import { ManageTestService } from './manage-test.service';

@Component( {
    selector: '[ruler-drag-and-drop]',
    template: `
        <span class="bgText" *ngIf="!lessonService.listArray.ruler">Drag here</span>
        <ng-container *ngFor="let element of lessonService.listArray.overall; let i = index;">
            <md-card *ngIf="element.$$ruler"
                     (click)="element.type !== '1' ? manageTestService.editTest(element.id) : false"
                     [routerLink]="element.type === '1' ? ['/lessonManage', {outlets: { 'leftContainer': ['video', element.vimeo]}}] : []"
                     [md-tooltip]="element.name" 
                     [mdTooltipShowDelay]="100"
                     [ngClass]="{'video': element.type === '1' || element.type === '4',
                                'test': element.type === '2' || element.type === '5',
                                'revision': element.type === '3' || element.type === '6'}"
                     [attr.data-index]="i">
            </md-card>
        </ng-container>`
} )

export class RulerComponent {
    constructor( private lessonService: MainLessonService, private manageTestService: ManageTestService ) {
    }
}
