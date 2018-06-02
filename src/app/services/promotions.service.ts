import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
 @Injectable()
export class PromotionsService {

  constructor() { }
  getPromotion(): Observable<Promotion[]> {
    return Observable.of(PROMOTIONS).delay(2000);
  }

  getPromotions(id:number):Observable<Promotion> {
    return Observable.of(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]).delay(2000);
  
  }
  getFeaturedPromotion():Observable<Promotion> 
  {
    return Observable.of(PROMOTIONS.filter((promo)=>(promo.featured))[0]).delay(2000);

}
}
