import {Component} from '@angular/core';
import {MainLessonService} from '../lesson.service';
import {Headers, RequestOptions, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'video-right',
    template: `
        <div class="header">
            <button md-button (click)="goToCategories()" [ngClass]="{'isVisible': folders[1]}">
                <md-icon>arrow_back</md-icon>
            </button>
            <span [innerHTML]="categoryName"></span>
        </div>
        <div class="noItems" *ngIf="!show">
            <md-icon>error_outline</md-icon>
            <span>No items</span>
        </div>
        <md-list *ngIf="show">
            <md-list-item *ngFor="let item of videoCategories; let i = index;" (click)="manageFolders(item, i);"
                          [routerLink]="folders[1] ? ['/lessonManage'] : []">
                <md-icon md-list-icon>folder</md-icon>
                <h4 md-line [innerHTML]="item.name"></h4>
            </md-list-item>
        </md-list>
    `
})

export class VideoRightComponent {
    url: string = location.href.match(/^.+\d\//)[0];

    headers: any = new Headers({
        'Content-Type': 'application/json; charset=UTF-8;',
        'X-Requested-With': 'XMLHttpRequest'
    });

    private options = new RequestOptions({headers: this.headers});
    private folders: any = {};
    private categoryName: string = 'Categories';
    private show: boolean = true;

    videoCategories: Array<Object>;

    manageFolders(category: any, i: any): any {
        this.folders[1] ? this.getVideos(this.folders[1][i].id) : this.getVideoCategories(category.id, i);
    }

    constructor(private http: Http,
                private mainLessonService: MainLessonService) {
        this.getCategories().then((response) => {
            this.videoCategories = this.folders[0] = response.json();
        });
    }

    private getCategories(): Promise<any> {
        return this.http.post(this.url, {'function': 'catalogcategory'}, this.options)
            .toPromise()
    }

    private getVideoCategories(id: number, index: number): Promise<any> {
        return this.http.post(this.url, {'function': 'catalogvideoname', id: id}, this.options)
            .toPromise().then((response) => {
                this.videoCategories = this.folders[1] = response.json();
                this.categoryName = this.folders[0][index].name;
                if (!response.json()[0].id) this.show = false;
            })
    }

    private getVideos(id: number): Promise<any> {
        return this.http.post(this.url, {'function': 'getTest', id: id}, this.options)
            .toPromise().then((response) => {
                let listRuler = this.mainLessonService.listArray.overall;

                for (let i = 0, l = listRuler.length; i < l; i++) {
                    if (listRuler[i].type === '1') {
                        listRuler.splice(i, 1, {});
                    }
                }

                for (let item of response.json().video_data) {
                    this.mainLessonService.listArray.overall.push(item);
                }
            })
    }

    private goToCategories(): any {
        this.videoCategories = this.folders[0];
        this.folders[1] = null;
        this.show = true;
        this.categoryName = 'Categories';
    }
}
