import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{        


    constructor(public http: Http) {   
    }

    getposts() {
        return this.http.get('').map(res => res.json());
    }

    ngOnInit() {
        this.getposts().subscribe((posts) => {
        })
    }        

}
