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

    constructor(public http: Http) {   
    }

    getposts() {
        return this.http.get('').map(res => res.json());
    }

    eventHandler(ev) {
        if(ev.keyCode == 13) {
            this.showSearch = true;
            alert("emitted!");
        }
    }

    ngOnInit() {
        this.getposts().subscribe((posts) => {
        })
    }        

}
