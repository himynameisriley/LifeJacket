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
  users$: Observable<User>;
  user: User;
  stepProgress: number;
  categories$: Observable<Category[]>;
  categories: Category[];
  firstTime: boolean;

  constructor(private store: Store<AppState>, private dataService: DataService, private accountService: AccountService) {
    this.users$ = store.select('user');
    this.categories$ = store.select('categories');
  }

  ngOnInit() {
    this.users$.subscribe(result => {
      this.user = result;
    });
    // this.getUserDetails();
    if (!this.user) {
      console.log('We tried to refresh the user');
      this.accountService.Refresh();
    }
    console.log("We tried to fetch the user categories");
    // this.dataService.getCategories(this.user.EmailAddress);
    this.categories$.subscribe(results => {
      this.categories = results;
    });
  }

  // getUserDetails() {
  //   this.dataService.getUserPendingCategory(this.user.EmailAddress)
  //     .subscribe(
  //       result => {
  //         if (result.status !== 200) return new Error('User not found')
  //         console.log('success', result);
  //         const index = this.categories.findIndex(category => {
  //           category.name === this.user.PendingCategory;
  //         });
  //         index === 0 ? this.firstTime = true : this.firstTime = false;
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }
}
