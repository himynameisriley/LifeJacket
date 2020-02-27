import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './../models/user.model';
import { AppState } from './../app.state';
import { DataService } from '../data.service';
import { Category } from '../models/category.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users$: Observable<User[]>;
  user: User;
  stepProgress: number;
  categories$: Observable<Category[]>;
  categories: Category[];

  constructor(private store: Store<AppState>, private dataService: DataService, private accountService: AccountService) {
    this.users$ = store.select('user');
    this.categories$ = store.select('categories');
  }

  ngOnInit() {
    this.users$.subscribe(result => {
      this.user = result[0];
    });
    if (!this.user) {
      this.accountService.refresh();
    }

    this.categories$.subscribe(results => {
      let stepsArray = [];
      const steps = results.map(category => category.steps.map(step => stepsArray.push(step)));
      this.categories = results;
      this.stepProgress = Math.floor((stepsArray.filter(step => step.complete === true).length / stepsArray.length) * 100);
    });
  }
}
