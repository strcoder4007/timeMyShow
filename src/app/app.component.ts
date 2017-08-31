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

    ngOnInit() {
        if(localStorage.myShows != undefined) {
            this.myShows = localStorage.getItem("myShows");
            for(let i = 0; i <= 100000; i++)
                this.subsList.push(false);
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
