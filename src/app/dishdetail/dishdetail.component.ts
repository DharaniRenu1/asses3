import { Component, OnInit,Inject} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import {  Comment } from '../shared/comment';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
  import 'rxjs/add/operator/switchMap';
import { DishService } from '../services/dish.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
  
})

export class DishdetailComponent implements OnInit {

dish : Dish;

commentref:Comment;

formComment:FormGroup;
visibility = 'shown';
dishIds: number[];
dishcopy = null;
prev: number;
next: number;
dishes:Dish[];
errMess:string;
CommentError={
"author":'',
"rating":'',
"comment":''
};
validateMessage={
  'author': {
    'required':      'First Name is required.',
    'minlength':     'First Name must be at least 2 characters long.',
    'maxlength':     'FirstName cannot be more than 25 characters long.'
  },
comment:{
  'required':'Comments is required'
}
};
  constructor( private dishservice: DishService,
    private route: ActivatedRoute,
  private location: Location,
private fc:FormBuilder,  @Inject('BaseURL') private BaseURL) { 
    this.createForm();
  }

  ngOnInit() {

   this.dishservice.getDishIds()
   .subscribe(dishIds=>this.dishIds=dishIds);



   this.dishservice.getDishes()
   .subscribe(dishes => this.dishes = dishes,
     errmess => this.errMess = <any>errmess);

this.route.params
      .switchMap((params: Params) => { return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
          errmess => { this.dish = null; this.errMess = <any>errmess; });

  }

  setPrevNext(dishIds: number)
  {
    let index =this.dishIds.indexOf(dishIds);
    this.prev=this.dishIds[(this.dishIds.length + index - 1 ) % this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

   

  onSubmit() {
    this.commentref = this.formComment.value;
    this.commentref.date = new Date().toISOString();
    this.dishcopy.comments.push(this.commentref);
    this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });
  
    this.formComment.reset({
      author: '',
      rating :5,
      comment: ''
    });
  }
  goBack(): void {
    this.location.back();
  }
  createForm()
  {
    this.formComment=this.fc.group
    ({
      author:['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating:[''],
      comment:['',[Validators.required]]
    });
    this.formComment.valueChanges.subscribe(data=>this.onValueChange(data));
    this.onValueChange();
  }
  onValueChange(data?:any)
  {
 if(!this.formComment){return;};
 const form=this.formComment;
 for(const field in this.CommentError)
 {
   this.CommentError[field]='';
   const control=form.get(field);
   if(control && control.dirty && control.invalid)
   {
     const comment=this.validateMessage[field];
     for(const key in control.errors)
     {
       this.CommentError[field]+=comment[key]+' ';
     }
   }
 }
  }
  // send(): void 

  // {
  //   alert("AAArumugam");
    
  // }
}
