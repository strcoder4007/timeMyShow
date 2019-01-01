
import {map} from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  selector: 'app-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.css']
})
export class SubsComponent implements OnInit {
    shows = [];
    allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    verdict = [];
    showTip = true;
    myAirDates = [];
    @Input() subsList;
    @Input() myIds;
    @Input() myShows;
    @Output() emitUnsub = new EventEmitter();

    constructor(public http: Http) { }

    getShowInfo(id: string) {
        return this.http.get('http://api.tvmaze.com/shows/' + id).pipe(map(res => res.json()));
    }

    getEpisodes(id: string) {
        return this.http.get('http://api.tvmaze.com/shows/' + id + '/episodes').pipe(map(res => res.json()));
    }

    unsubscribe(junk) {
        this.emitUnsub.emit(junk);
    }

    ngOnInit() {
        for (let i = 0; i < 100; i++) {
            this.verdict.push('');
        }
        if (this.myIds != '') {
            for (let i = 0; i < this.myIds.length; i++) {
                this.getShowInfo(this.myIds[i]).subscribe((posts) => {
                    if (posts.summary.length > 340) {
                        posts.summary = posts.summary.slice(0, 340) + '.....';
                    }
                    if (posts.image == null) {
                        posts.image = 'assets/replacement.png';
                    }
                    this.shows.push(posts);
                });
            }
            console.log(this.shows);
            for (let i = 0; i < this.myIds.length; i++) {
                this.getEpisodes(this.myIds[i]).subscribe((posts) => {
                    const today = new Date();
                    let month = '';
                    month += today.getMonth() + 1;
                    if (month.length == 1) {
                        month = '0' + month;
                    }
                    let day = '';
                    day += today.getDate();
                    if (day.length == 1) {
                        day = '0' + day;
                    }
                    const myDay = today.getFullYear() + '-' + month + '-' + day;
                    let airdate = posts[posts.length - 1].airdate;
                    if (myDay > airdate) {
                        airdate = airdate.split('-');
                        this.verdict[this.myIds[i]] = 'Ended on: ' + airdate[2] + ' ' + this.allMonths[parseInt(airdate[1]) - 1] + ' ' + airdate[0] + '\nLast episode: Season ' + posts[posts.length-1].season + ' Episode ' + posts[posts.length-1].number;
                    } else if (myDay < airdate) {
                        let season, episode;
                        for (let j = posts.length - 1; j + 1; j--) {
                            if (myDay > posts[j].airdate) {
                                break;
                            } else {
                                airdate = posts[j].airdate, season = posts[j].season, episode = posts[j].number;
                            }
                        }
                        airdate = airdate.split('-');
                        this.verdict[this.myIds[i]] = 'Next episode (Season ' + season + ' Episode ' + episode + '): ' + airdate[2] + ' ' + this.allMonths[parseInt(airdate[1]) - 1] + ' ' + airdate[0];
                    } else {
                        this.verdict.push('Episode releasing today!');
                    }
                    const mystr = airdate[0] + airdate[1] + airdate[2];
                    this.myAirDates.push(mystr);
                });
            }

            // sorting such that the most recent release to be the first
            // this.myAirDates.sort();
            let junkShows = [];
            for (let i =  0; i < this.myAirDates.length; i++) {
                alert(this.myAirDates[i]);
            }
            junkShows = this.shows;


        }
    }

}
