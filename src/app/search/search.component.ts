
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
    baseUrl = 'http://api.tvmaze.com';
    showImage = false;
    verdict = [];
    shows = [];
  allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
        if (this.show == '') {
            this.goBack();
        }
        this.search(this.show);
    }


    getShows() {
        return this.http.get(this.baseUrl + '/search/shows?q=' + this.show).pipe(map(res => res.json()));
    }

    getseasons(junk: number) {
        return this.http.get(this.baseUrl + '/shows/' + junk + '/seasons').pipe(map(res => res.json()));
    }

    getEpisodes(id: string) {
      return this.http.get('http://api.tvmaze.com/shows/' + id + '/episodes').pipe(map(res => res.json()));
    }

    search(junk: string) {
        this.getShows().subscribe((posts) => {
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].show.premiered == null) {
                    posts[i].show.premiered = 'unknown';
                }
                if (posts[i].show.genres.length == 0) {
                    posts[i].show.genres.push('unknown');
                }
                if (posts[i].show.summary != null) {
                    if (posts[i].show.summary.length > 340) {
                        posts[i].show.summary = posts[i].show.summary.slice(0, 340) + '.....';
                    }
                }
                this.resultIds.push(parseInt(posts[i].show.id));
                if (posts[i].show.image == null) {
                    posts[i].show.image = 'assets/replacement.png';
                }
            }
            this.shows = posts;

          for (let i = 0; i < this.shows.length; i++) {
            this.getEpisodes(this.shows[i].show.id).subscribe((posts) => {
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
                this.verdict[this.shows[i].show.id] = 'Ended on: ' + airdate[2] + ' ' + this.allMonths[parseInt(airdate[1]) - 1] + ' ' + airdate[0] + '\nLast episode: Season ' + posts[posts.length-1].season + ' Episode ' + posts[posts.length-1].number;
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
                this.verdict[this.shows[i].show.id] = 'Next episode (Season ' + season + ' Episode ' + episode + '): ' + airdate[2] + ' ' + this.allMonths[parseInt(airdate[1]) - 1] + ' ' + airdate[0];
              } else {
                this.verdict.push('Episode releasing today!');
              }
            });
          }


        });








    }

    searchSeasons(id: number) {
        this.getseasons(id).subscribe((posts) => {
            this.seasons.push(posts);
        });
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
        for (let i = 0; i < 1000; i++) {
          this.verdict.push('');
        }
        this.colors['Running'] = '#1db954';
        this.colors['Ended'] = '#f44336';
        this.search(this.show);
    }
}
