import { Component, OnInit, Inject } from '@angular/core';
import { Dish} from '../shared/dish';
import { DishService} from '../services/dish.service';
import { Promotion} from '../shared/promotion';
import { PromotionsService} from '../services/promotions.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut , expand} from '../animation/app.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand(),
    ]
})
export class HomeComponent implements OnInit {
dish: Dish;
promotion: Promotion;
leader: Leader;
dishErrMess :string;
  constructor(private dishservice:DishService,
    private promotionservice:PromotionsService,
  private leaderservice: LeaderService,
  @Inject('BaseURL') private BaseURL)   { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
    .subscribe(dish=>this.dish=dish), errmess => this.dishErrMess = <any>errmess;
   this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion=> this.promotion=promotion);
   this.leaderservice.getFeaturedLeader()
   .subscribe(leader=>this.leader=leader);
  }
  

}
