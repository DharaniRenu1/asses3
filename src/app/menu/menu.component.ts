import { Component, OnInit, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { flyInOut,  expand} from '../animation/app.animation';
import { baseURL} from '../shared/baseurl';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  
    animations: [
      flyInOut(),
      expand(),
    ],
    host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
})


export class MenuComponent implements OnInit {

  dishes:Dish[];
  errMess: string;
  
  // selectedDish:Dish;
  constructor(private dishService : DishService,
    @Inject('BaseURL') private BaseURL) { }
 

  ngOnInit() {
//  this.dishService.getDishes()
//     .subscribe(dishes=>this.dishes=dishes);
this.dishService.getDishes()
.subscribe(dishes => this.dishes = dishes,
  errmess => this.errMess = <any>errmess);
  }
// onSelect(dish:Dish){
//   this.selectedDish=dish;
// }
}


