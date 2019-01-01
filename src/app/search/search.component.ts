
import {map} from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    baseUrl: string = "http://api.tvmaze.com";
    showImage = false;
    shows = [];
    statusColor: string;
    colors = [];
    seasons = [];
    currentId: number;
    resultIds = [];
    @Input() show;
    @Input() myShows;
    @Input() subsList;
    @Input() myIds;
    @Output() emitSearchToggle = new EventEmitter();
    @Output() emitUnsubSearch = new EventEmitter();
    @Output() emitSubSearch = new EventEmitter();

    constructor(public http: Http, public router: Router) { }

    ngOnChanges() {
        if(this.show == "")
            this.goBack();
        this.search(this.show);
    }


    getshows() {
        return this.http.get(this.baseUrl+'/search/shows?q='+this.show).pipe(map(res => res.json()));
    }

    getseasons(junk: number) {
        return this.http.get(this.baseUrl+'/shows/'+junk+'/seasons').pipe(map(res => res.json()));
    }

    search(junk:string){
        this.getshows().subscribe((posts) => {
            //console.log(posts);
            for(let i = 0; i < posts.length; i++){
                if(posts[i].show.premiered == null)
                    posts[i].show.premiered = "unknown";
                if(posts[i].show.genres.length == 0)
                    posts[i].show.genres.push("unknown");
                if(posts[i].show.summary != null)
                    if(posts[i].show.summary.length > 340)
                        posts[i].show.summary = posts[i].show.summary.slice(0, 340)+".....";
                this.resultIds.push(parseInt(posts[i].show.id));
                if(posts[i].show.image == null)
                    posts[i].show.image = 'assets/replacement.png';
            }
            this.shows = posts;
        })
    }

    searchSeasons(id: number) {
        this.getseasons(id).subscribe((posts) => {
            this.seasons.push(posts);
        })
    }

    subscribe(junk: number) {
        this.emitSubSearch.emit(junk);
    }

    unsubscribe(junk: number) {
        this.emitUnsubSearch.emit(junk);
    }

    goBack() {
        this.emitSearchToggle.emit();
    }

    ngOnInit() {
        this.colors['Running'] = "#1db954";
        this.colors['Ended'] = "#f44336";
        this.search(this.show);
    }
}
