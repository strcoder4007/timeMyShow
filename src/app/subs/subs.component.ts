import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.css']
})
export class SubsComponent implements OnInit {
    shows = [];
    allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    verdict = [];
    showTip: boolean = true;
    @Input() subsList;
    @Input() myIds;
    @Input() myShows;    
    @Output() emitUnsub = new EventEmitter();

    constructor(public http: Http) { }

    getShows(id: string) {
        return this.http.get('http://api.tvmaze.com/shows/'+id).map(res => res.json());
    }

    getEpisodes(id: string) {
        return this.http.get('http://api.tvmaze.com/shows/'+id+'/episodes').map(res => res.json());
    }

    unsubscribe(junk) {
        this.emitUnsub.emit(junk);
    }
    
    ngOnInit() {
        if(this.myIds != '') {
            for(let i = 0; i < this.myIds.length; i++) {
                this.getShows(this.myIds[i]).subscribe((posts) => {
                    this.shows.push(posts);
                });
            }
            console.log(this.shows);
            for(let i = 0; i < this.myIds.length; i++) {
                this.getEpisodes(this.myIds[i]).subscribe((posts) => {
                    //console.log(posts);
                    let today = new Date();
                    let month = "";
                    month += today.getMonth()+1;
                    if(month.length == 1)
                        month = '0'+month;
                    let day = "";
                    day += today.getDate();
                    if(day.length == 1)
                        day = '0'+day;
                    let myDay = today.getFullYear()+'-'+month+'-'+day;
                    let airdate = posts[posts.length-1].airdate;
                    if(myDay > airdate) {
                        airdate = airdate.split('-');
                        this.verdict.push("Show ended on " + airdate[2] + " " + this.allMonths[parseInt(airdate[1])-1] + " " + airdate[0]);
                    }
                    else if(myDay < airdate) {
                        let season, episode;
                        for(let j = posts.length-1; j+1; j--) {
                            if(myDay > posts[j].airdate)
                                break;
                            else
                                airdate = posts[j].airdate, season = posts[j].season, episode = posts[j].number;
                        }
                        airdate = airdate.split('-');
                        this.verdict.push("Next episode (Season "+season+" Episode "+episode+"): " + airdate[2] +" " + this.allMonths[parseInt(airdate[1])-1] + " " + airdate[0]);
                    }
                    else {
                        alert("say wha-what");
                        this.verdict.push("Episode releasing today");
                    }
                })
            }
        }
    }

}
