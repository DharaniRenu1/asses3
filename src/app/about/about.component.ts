import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut , expand } from '../animation/app.animation';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand(),
    ]
})
export class AboutComponent implements OnInit {

 
  lead:Leader[];
    constructor(private leaders: LeaderService) { }
  
    ngOnInit() {
      this.leaders.getLeader().subscribe(lead=> this.lead=lead);
     
    }
  
  }