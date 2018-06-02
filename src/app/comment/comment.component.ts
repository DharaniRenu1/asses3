import { Component, OnInit} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import {  Comment } from '../comment';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
  import 'rxjs/add/operator/switchMap';
import { DishService } from '../services/dish.service';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent implements OnInit {

dish : Dish;

commentref:Comment;

formComment:FormGroup;

dishIds: number[];
prev: number;
next: number;



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
  rating:
  {
'required':'Rating is required'
  },
comment:{
  'required':'Comments is required'
}
};
  constructor( private dishservice: DishService,
    private route: ActivatedRoute,
  private location: Location,
private fc:FormBuilder,
) { 
    this.createForm();
  }

  ngOnInit() {
   this.dishservice.getDishIds()
   .subscribe(dishIds=>this.dishIds=dishIds);

 this.route.params
.switchMap((params:Params)=>this.dishservice.getDish(+params['id']))
.subscribe(dish=>{this.dish =dish; this.setPrevNext(dish.id)});

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
    this.dish.comments.push(this.commentref);
  
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
      rating:['',[Validators.required]],
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
}
