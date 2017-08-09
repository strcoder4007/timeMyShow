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

    getposts(junk: string) {
        return this.http.get(this.baseUrl+'/search/shows?q='+junk).map(res => res.json());
    }

    search(junk: string){
        this.getposts(junk).subscribe((posts) => {
            this.shows = posts;
            console.log(this.shows);
        })
    }

    subscribe(id: number) {
        this.myShows.push(id);
        console.log(this.myShows);
    }

    constructor(public http: Http) { }

    ngOnInit() {
        document.getElementById('focusThis').focus();
    }

}
