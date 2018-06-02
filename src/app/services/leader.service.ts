import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEAD } from '../shared/leadership';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
 @Injectable()
export class LeaderService {

  constructor() { }
  getLeader():Observable<Leader[]>
  {
    return Observable.of(LEAD).delay(2000);
  }
  getLeaders(id:number):Observable<Leader>{
    return Observable.of(LEAD.filter((leader) => (leader.id == id) )[0]).delay(2000);

}
  getFeaturedLeader(): Observable<Leader>{
    return Observable.of(LEAD.filter((leader) =>(leader.featured))[0]).delay(2000);
 
}

}
