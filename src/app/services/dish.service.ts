import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Dishes } from '../shared/dishes';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import { Comment } from '../shared/comment';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from '../services/process-httpmsg.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RestangularModule, Restangular } from 'ngx-restangular';


@Injectable()
export class DishService {
  constructor(private restangular: Restangular,
    private processHTTPMsg: ProcessHttpmsgService) { }
 
    getDishes(): Observable<Dish[]> {
      return this.restangular.all('dishes').getList();
    }
  
    getDish(id: number): Observable<Dish> {
      return  this.restangular.one('dishes',id).get();
    }
  
    getFeaturedDish(): Observable<Dish> {
      return this.restangular.all('dishes').getList({featured: true})
        .map(dishes => dishes[0]);
    }
  
    getDishIds(): Observable<number[]> {
      return this.getDishes()
        .map(dishes => { return dishes.map(dish => dish.id) });
    }
}

