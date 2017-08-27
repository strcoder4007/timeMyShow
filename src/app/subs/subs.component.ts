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
    junk = [];

    constructor(public http: Http) { }

    getShows(id: string) {
        return this.http.get('http://api.tvmaze.com/shows/'+id).map(res => res.json());
    }

    getEpisodes(id: string) {
        return this.http.get('http://api.tvmaze.com/shows/'+id+'/episodes').map(res => res.json());
    }
    
    ngOnInit() {
        this.myIds = localStorage.getItem('myShows').split(',');
        if(this.myIds.length) {
            for(let i = 0; i < this.myIds.length; i++) {
                this.getShows(this.myIds[i]).subscribe((posts) => {
                    this.myShows.push(posts);
                })
            this.getEpisodes(this.myIds[i]).subscribe((posts) => {
                this.junk.push(posts);
                let today = new Date();
                let month = "";
                month += today.getMonth();
                if(month.length == 1)
                    month = '0'+month;
                let day = "";
                day += today.getDay();
                if(day.length == 1)
                    day = '0'+day;
                let myDay = today.getFullYear()+'-'+month+'-'+day;
                let airdate = posts[posts.length-1].airdate;
                if(myDay > airdate) {
                    console.log("show ended on "+airdate);
                }
                else {
                    console.log("next episode on: "+ airdate);
                }
            })
            }
            console.log(this.junk);
            console.log(this.myShows);
        }
    }

}
