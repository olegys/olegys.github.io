import { NgModule }                     from '@angular/core';
import { RouterModule, Routes, NavigationExtras }         from '@angular/router';

import { LessonManageComponent }        from './lesson-manage.component';
import { LessonMainMenuComponent }      from './lesson-main-menu.component'
import { LessonTestManageComponent }    from './lesson-test-manage.component';
import { TestFormationComponent }       from './test.component';

import { AddElementsComponent }         from './addElements.component';

import { VideoRightComponent }          from './video/video-right.component';
import { VideoLeftComponent }           from './video/video-left.component';

const routes: Routes = [
    {
        path: '', redirectTo: 'lessonManage', pathMatch: 'full'
    },
    {
        path:     'lessonManage', component: LessonManageComponent,
        children: [
            {
                path: '', component: LessonMainMenuComponent, outlet: 'manage'
            },
            {
                path:     'testManage', component: LessonTestManageComponent, outlet: 'manage',
                children: [
                    {
                        path: ':test', component: AddElementsComponent
                    }
                ]
            },
            {
                path: ':test', component: TestFormationComponent, outlet: 'leftContainer'
            },
            {
                path: 'videoManage', component: VideoRightComponent, outlet: 'manage'
            },
            {
                path: 'video/:videoId', component: VideoLeftComponent, outlet: 'leftContainer'
            },
        ]
    },
    {
        path:      '**',
        component: LessonManageComponent
    }
];

@NgModule( {
    imports: [ RouterModule.forRoot( routes, { useHash: true } ) ],
    exports: [ RouterModule ]
} )

export class AppRoutingModule {
}
