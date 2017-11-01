import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'video-left',
    template: `
        <iframe [src]="url"
                frameborder="0"
                allowfullscreen=""
                webkitallowfullscreen=""
                mozallowfullscreen=""
                style="width: 100%; height: 100%;"></iframe>
    `
})

export class VideoLeftComponent {
    constructor(private activatedRoute: ActivatedRoute,
                private sanitizer: DomSanitizer) {

        this.activatedRoute.params.subscribe((params: any) => {
            this.url = sanitizer.bypassSecurityTrustResourceUrl(`http://player.vimeo.com/video/${params['videoId']}`);
        });
    }

    private url: SafeResourceUrl;
}
