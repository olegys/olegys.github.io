import { Component } from '@angular/core';
import { MainLessonService } from './lesson.service';
import { ManageTestService } from './manage-test.service';
import { DragulaService } from 'ng2-dragula';

Array.prototype[ 'move' ] = function( old_index: number, new_index: number ) {
    if ( new_index >= this.length ) {
        var k = new_index - this.length;
        while ( (k--) + 1 ) {
            this.push( undefined );
        }
    }
    this.splice( new_index, 0, this.splice( old_index, 1 )[ 0 ] );
    return this; // for testing purposes
};

@Component( {
    selector: 'admin-lesson-menu',
    template: `
        <div class="admin-lesson-menu-title">
            <div *ngIf="lessonService.lessonType < 7">
                <md-icon>live_tv</md-icon>
                <span>Video</span>
            </div>
            <div *ngIf="lessonService.lessonType < 7">
                <md-icon>lightbulb_outline</md-icon>
                <span>Test</span>
            </div>

            <div *ngIf="lessonService.lessonType == 7">
                <md-icon>timer</md-icon>
                <span class="name">Revison tests</span>
            </div>
            <div *ngIf="lessonService.lessonType == 7">
                <md-icon>favorite_border</md-icon>
                <span class="name">Check Pulse</span>
            </div>
        </div>
        <div class="left"
             [dragula]="'first-bag'">
            <ng-container *ngFor="let video of lessonService.listArray.overall; let i = index">
                <md-card *ngIf="video.type === '1' || video.type === '4' || video.type === '5'"
                         [ngClass]="{'video': video.type === '1' || video.type === '4', 'disabled': video.$$ruler, 'test': video.type === '2' || video.type === '5'}"
                         [attr.data-index]="i">
                    <md-card-title [innerHTML]="video.name"></md-card-title>

                    <button md-icon-button [mdMenuTriggerFor]="menu" *ngIf="video.type === '4' || video.type === '5'">
                        <md-icon>more_vert</md-icon>
                    </button>
                    <md-menu #menu="mdMenu">
                        <button md-menu-item (click)="lessonService.editTest(video.id)">
                            <md-icon>mode_edit</md-icon>
                            <span>Edit</span>
                        </button>
                        <button md-menu-item (click)="lessonService.deleteTest(video.id, i)">
                            <md-icon>delete_forever</md-icon>
                            <span>Delete</span>
                        </button>
                    </md-menu>
                </md-card>
            </ng-container>

        </div>
        <div class="right"
             [dragula]="'first-bag'">
            <ng-container *ngFor="let test of lessonService.listArray.overall; let i = index;">
                <md-card *ngIf="test.type === '2' || test.type === '3' || test.type === '6'"
                         [ngClass]="{ 'test': test.type === '2', 'revision': test.type === '3', 'disabled': test.$$ruler }"
                         [attr.data-index]="i">
                    <md-card-title [innerHTML]="test.name"></md-card-title>

                    <button md-icon-button [mdMenuTriggerFor]="menu">
                        <md-icon>more_vert</md-icon>
                    </button>
                    <md-menu #menu="mdMenu">
                        <button md-menu-item (click)="manageTestService.editTest(test.id)">
                            <md-icon>mode_edit</md-icon>
                            <span>Edit</span>
                        </button>
                        <button md-menu-item (click)="manageTestService.deleteTest(test.id, i)">
                            <md-icon>delete_forever</md-icon>
                            <span>Delete</span>
                        </button>
                    </md-menu>
                </md-card>
            </ng-container>
        </div>
    `,
    host:     { 'class': 'manageBlock' },
} )

export class LessonMainMenuComponent {
    constructor( private lessonService: MainLessonService,
                 private dragulaService: DragulaService,
                 private manageTestService: ManageTestService ) {
        
    }
    
}