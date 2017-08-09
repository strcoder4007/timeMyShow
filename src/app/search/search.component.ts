import { Component, OnInit } from '@angular/core';
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
    myShow: any;
    show: string = '';
    shows = [];
    myShows = [];
    statusColor: string;
    colors = [];
    seasons = [];
    currentId: number;


    getshows(junk: string) {
        return this.http.get(this.baseUrl+'/search/shows?q='+junk).map(res => res.json());
    }
    getseasons(junk: number) {
        return this.http.get(this.baseUrl+'/shows/'+junk+'/seasons').map(res => res.json());
    }

    search(junk: string){
        this.getshows(junk).subscribe((posts) => {
            for(let i = 0; i < posts.length; i++){
                if(posts[i].show.image == null)
                    posts[i].show.image = 'http://www.downloadclipart.net/large/1197-blue-rectangle-white-up-arrow-design.png';
            }
            this.shows = posts;
            console.log(this.shows);
            for(let i  = 0; i < this.shows.length; i++){
                let id = this.shows[i].show.id;
                this.searchSeasons(id);
            }
        })
    }

    subscribe(id: number) {
        this.myShows.push(id);
    }

    searchSeasons(id: number) {
        this.getseasons(id).subscribe((posts) => {
            this.seasons.push(posts);
        })
    }

    constructor(public http: Http) { }

    ngOnInit() {
        document.getElementById('focusThis').focus();
        this.colors['Running'] = "#1db954";
        this.colors['Ended'] = "#f44336";
    }


}
