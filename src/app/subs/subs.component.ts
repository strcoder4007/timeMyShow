import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.css']
})
export class SubsComponent implements OnInit {
    myShows = [];
    myIds: any;

    constructor(public http: Http) { }

    getposts(id: string) {
        return this.http.get('http://api.tvmaze.com/shows/'+id).map(res => res.json());
    }

    ngOnInit() {
        this.myIds = localStorage.getItem('myShows').split(',');
        for(let i = 0; i < this.myIds.length; i++) {
            this.getposts(this.myIds[i]).subscribe((posts) => {
                this.myShows.push(posts);
            })
        }
        console.log(this.myShows);
    }

}
