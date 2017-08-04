import 'core-js';
import 'zone.js';
import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LessonComponent } from './lesson.component'
import { RulerComponent } from './ruler.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

import { AppRoutingModule } from './routing.module';
import { AddElementsComponent } from './addElements.component';

import { OddOneOutLeftComponent } from './oddOneOut/odd-one-out.left.component';
import { OddOneOutRightComponent } from './oddOneOut/odd-one-out.right.component';

import { MatchingWordPictureLeftComponent } from './matchingWordPicture/matching-word-picture.left.component';
import { MatchingWordPictureRightComponent } from './matchingWordPicture/matching-word-picture.right.component';

import { BeethovenLeftComponent } from './beethoven/beethoven.left.component';
import { BeethovenRightComponent } from './beethoven/beethoven.right.component';

import { MatchingWordWordLeftComponent } from './matchingWordWord/matching-word-word.left.component';
import { MatchingWordWordRightComponent } from './matchingWordWord/matching-word-word.right.component';

import { BuildTheSentenceLeftComponent } from './buildTheSentence/build-the-sentence.left.component';
import { BuildTheSentenceRightComponent } from './buildTheSentence/build-the-sentence.right.component';

import { BuildTheWordLeftComponent } from './buildTheWord/build-the-word.left.component';
import { BuildTheWordRightComponent } from './buildTheWord/build-the-word.right.component';

import { TapRightWordLeftComponent } from './tapRightWord/tap-right-word.left.component';
import { TapRightWordRightComponent } from './tapRightWord/tap-right-word.right.component';

import { SortingLeftComponent } from './sorting/sorting.left.component';
import { SortingRightComponent } from './sorting/sorting.right.component';

import { TrueFalseLeftComponent } from './trueFalse/true-false.left.component';
import { TrueFalseRightComponent } from './trueFalse/true-false.right.component';

import { TapRightPictureLeftComponent } from "./tapRightPicture/tap-right-picture.left.component";
import { TapRightPictureRightComponent } from "./tapRightPicture/tap-right-picture.right.component";

import { TapStreakLeftComponent } from './tapStreak/tap-streak-left.component';
import { TapStreakRightComponent } from './tapStreak/tap-streak-right.component';

import { LessonManageComponent } from './lesson-manage.component';
import { LessonMainMenuComponent } from './lesson-main-menu.component';
import { LessonTestManageComponent } from './lesson-test-manage.component';
import { TestFormationComponent } from './test.component';

import { MainLessonService } from './lesson.service';
import { MediaService } from './media.service';
import { ManageTestService } from './manage-test.service';

import { VideoRightComponent } from './video/video-right.component';
import { VideoLeftComponent } from './video/video-left.component';

import { TitleTransform, MenuSort } from './lesson-test-manage.component';

@NgModule( {
    imports:      [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        DragulaModule
    ],
    declarations: [
        LessonComponent,
        RulerComponent,
        LessonManageComponent,
        LessonMainMenuComponent,
        LessonTestManageComponent,
        TestFormationComponent,
        AddElementsComponent,
        VideoRightComponent,
        VideoLeftComponent,
        // tests
        TrueFalseLeftComponent,
        TrueFalseRightComponent,
        OddOneOutLeftComponent,
        OddOneOutRightComponent,
        MatchingWordPictureLeftComponent,
        MatchingWordPictureRightComponent,
        BeethovenLeftComponent,
        BeethovenRightComponent,
        TapRightPictureLeftComponent,
        TapRightPictureRightComponent,
        MatchingWordWordLeftComponent,
        MatchingWordWordRightComponent,
        TapStreakLeftComponent,
        TapStreakRightComponent,
        BuildTheSentenceLeftComponent,
        BuildTheSentenceRightComponent,
        TapRightWordLeftComponent,
        TapRightWordRightComponent,
        SortingLeftComponent,
        SortingRightComponent,
        BuildTheWordLeftComponent,
        BuildTheWordRightComponent,
        // pipes
        TitleTransform,
        MenuSort
    ],
    providers:    [
        MainLessonService,
        MediaService,
        ManageTestService
    ],
    bootstrap:    [ LessonComponent ]
} )
export class AppModule {
}
