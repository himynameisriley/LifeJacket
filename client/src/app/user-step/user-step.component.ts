import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from './../models/user.model';
import { AppState } from './../app.state';
import { DataService } from '../data.service';
import { Category } from '../models/category.model';
import { AccountService } from '../account.service';
import { Step } from '../models/step.model';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-user-step',
  templateUrl: './user-step.component.html',
  styleUrls: ['./user-step.component.css']
})
export class UserStepComponent implements OnInit {
  users$: Observable<User>;
  user: User;
  stepProgress: number;
  currentStep: Step;
  currentCategory: Category;

  constructor(private store: Store<AppState>, private dataService: DataService, private accountService: AccountService, private activeRoute: ActivatedRoute, private route: Router) {
    this.users$ = store.select('user');
    this.routeEvent(this.route);
  }

  ngOnInit() {
    this.handleLoad();
  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.handleLoad();
      }
    });
  }

  handleLoad() {
    this.users$.subscribe(result => {
      this.user = result;
    });
    if (!this.user) {
      console.log('We tried to refresh the user');
      this.accountService.Refresh();
    }
    this.getCurrentCategory();
  }

  getCurrentCategory() {
    this.dataService.getCategoryDetails(this.user.EmailAddress, this.user.PendingCategoryId)
      .subscribe(result => {
        this.currentCategory = result;
      });
  }

  completeStep(step) {
    this.dataService.userCompleteStep(step, this.user.EmailAddress);
  }

}
