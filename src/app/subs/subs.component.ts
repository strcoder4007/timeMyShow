
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
    pastAirDates = [];
    futureAirDates = [];
    airdateIdHash = [];
    sortedShows = [];
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
        for (let i = 0; i < 100000; i++) {
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
                        this.verdict[this.myIds[i]] = 'Ended on: ' + airdate[2] + ' ' + this.allMonths[parseInt(airdate[1]) - 1] + ' ' + airdate[0] +
                          '\nLast episode: Season ' + posts[posts.length - 1].season + ' Episode ' + posts[posts.length - 1].number;
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
                        this.verdict[this.myIds[i]] = 'Next episode (Season ' + season + ' Episode ' + episode + '): ' +
                          airdate[2] + ' ' + this.allMonths[parseInt(airdate[1]) - 1] + ' ' + airdate[0];
                    } else {
                        this.verdict[this.myIds[i]] = 'Episode releasing today!';
                    }


                    const mystr = airdate[0] + '-' + airdate[1] + '-' + airdate[2];
                    if (this.airdateIdHash[mystr] === undefined) {
                      this.airdateIdHash[mystr] = [];
                    }
                    this.airdateIdHash[mystr].push(this.myIds[i]);
                    if (myDay <= mystr) {
                        this.futureAirDates.push(mystr);
                    } else {
                       this.pastAirDates.push(mystr);
                    }
                    if (this.futureAirDates.length + this.pastAirDates.length === this.myIds.length) {
                        const junkArray = new Set(Array.from(this.futureAirDates).sort().concat(Array.from(this.pastAirDates).sort().reverse()));
                        this.sortedShows = [];
                        //for (let j =  0; j < junkArray.size; j++) {
                        for (let it = junkArray.values(), val = null; val = it.next().value; ) {
                            for (let ii = 0; ii < this.airdateIdHash[val].length; ii++) {
                                const curId = this.airdateIdHash[val][ii];
                                for (let k = 0; k < this.shows.length; k++) {
                                    if (this.shows[k].id === parseInt(curId)) {
                                        this.sortedShows.push(this.shows[k]);
                                    }
                                }
                            }
                        }
                    }
                }); // getepisode call
            } // for loop
        }
    }

}
