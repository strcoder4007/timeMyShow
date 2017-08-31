import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
    @Input() show;
    @Input() myShows;
    @Input() subsList;
    @Input() myIds;
    resultIds = [];
    @Output() emitUnsubSearch = new EventEmitter();
    @Output() emitSubSearch = new EventEmitter();

    getshows() {
        return this.http.get(this.baseUrl+'/search/shows?q='+this.show).map(res => res.json());
    }

    getseasons(junk: number) {
        return this.http.get(this.baseUrl+'/shows/'+junk+'/seasons').map(res => res.json());
    }

    search(junk:string){
        this.getshows().subscribe((posts) => {
            for(let i = 0; i < posts.length; i++){
                this.resultIds.push(parseInt(posts[i].show.id));
                if(posts[i].show.image == null)
                    posts[i].show.image = 'http://www.downloadclipart.net/large/1197-blue-rectangle-white-up-arrow-design.png';
            }
            this.shows = posts;
            console.log(posts);
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

    constructor(public http: Http) { }

    ngOnInit() {
        this.colors['Running'] = "#1db954";
        this.colors['Ended'] = "#f44336";
        this.search(this.show);
    }
}
