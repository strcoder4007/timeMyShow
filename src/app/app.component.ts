import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{        
    show: string;
    showSearch: boolean = false;
    myShows: string = "";
    subsList = [];
    myIds = [];

    constructor(public http: Http) {   
    }

    getposts() {
        return this.http.get('').map(res => res.json());
    }

    eventHandler(ev) {
        if(ev.keyCode == 13) {
            this.showSearch = true;
        }
    }

    subscribe(ev) {
        if(localStorage.myShows == undefined)
            localStorage.setItem('myShows', '');
        this.myShows = localStorage.getItem("myShows");
        if(this.subsList[ev] == false) {
            if(this.myShows == undefined || this.myShows == '')
                this.myShows = String(ev);
            else
                this.myShows = this.myShows+','+String(ev);
            this.subsList[ev] = true;
            localStorage.setItem('myShows', this.myShows);
            this.myIds = this.myShows.split(',');
        }
    }

    unsubscribe(ev) {
        this.subsList[ev] = false;
        var index = -1;
        for(let i = 0; i < this.myIds.length; i++)
            if(this.myIds[i] == ev)
                index = i;
        let junk = this.myIds;
        this.myIds = [];
        for(let i = 0; i < junk.length; i++)
            if(i != index)
                this.myIds.push(junk[i]);
        this.myShows = '';
        for(let i = 0; i < this.myIds.length; i++)
            if(this.myShows == '')
                this.myShows = this.myShows+this.myIds[i];
            else
                this.myShows = this.myShows+','+this.myIds[i];
        localStorage.setItem('myShows', this.myShows);
    }

    ngOnInit() {
        for(let i = 0; i <= 100000; i++)
            this.subsList.push(false);
        if(localStorage.myShows != undefined) {
            this.myShows = localStorage.getItem("myShows");
            let junk = this.myShows.split(',');
            for(let i = 0; i < junk.length; i++)
                this.myIds.push(parseInt(junk[i]));
            for(let i = 0; i < this.myIds.length; i++)
                this.subsList[this.myIds[i]] = true;
        }
        this.getposts().subscribe((posts) => {
        })
    }        

}
