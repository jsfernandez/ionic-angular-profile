import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  user: User;

  constructor() {
    this.user = User.getUserState();
  }

  ngOnInit() {
    console.log({user:this.user})
  }
}
