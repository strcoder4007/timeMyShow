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
    allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    verdict = [];
    showTip: boolean = true;
    showCount: number = 0;

    constructor(public http: Http) { }

    getShows(id: string) {
        return this.http.get('http://api.tvmaze.com/shows/'+id).map(res => res.json());
    }

    getEpisodes(id: string) {
        return this.http.get('http://api.tvmaze.com/shows/'+id+'/episodes').map(res => res.json());
    }
    
    ngOnInit() {
        if(localStorage.myShows != undefined) {
            this.myIds = localStorage.getItem('myShows').split(',');
            this.showCount = this.myIds.length;
            for(let i = 0; i < this.myIds.length; i++) {
                this.getShows(this.myIds[i]).subscribe((posts) => {
                    this.myShows.push(posts);
                });
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
                        airdate = airdate.split('-');
                        this.verdict.push("Show ended on " + airdate[2] + " " + this.allMonths[parseInt(airdate[1])-1] + " " + airdate[0]);
                    }
                    else if(myDay < airdate) {
                        let season = 0, episode = 0;
                        for(let j = posts.length-1; j+1; j--) {
                            if(myDay > posts[j].airdate)
                                break;
                            else
                                airdate = posts[j].airdate, season = posts[j].season, episode = posts[j].number;
                        }
                        airdate = airdate.split('-');
                        this.verdict.push("Season "+season+" Episode "+episode+" to be released on " + airdate[2] +" " + this.allMonths[parseInt(airdate[1])-1] + " " + airdate[0]);
                    }
                    else
                        this.verdict.push("Episode releasing today");
                })
            }
            console.log(this.junk);
            console.log(this.myShows);
        }
    }

}
