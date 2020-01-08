import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from '../chat/chat.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: firebase.User;
  updatedPhoto: string;
  updateName: string;
  today: number = Date.now();

  constructor(
    private auth: AuthService,
    private router: Router, db: AngularFirestore,
    private chat: ChatService
  ) { }


  ngOnInit() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });

  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login'])
  }
  register() {
    this.auth.logout();
  }
  info() {
    this.auth.getUserInfo();
    console.log(this.user)
  }
  updatepic() {
    this.auth.updatePicture(this.updatedPhoto);
  }
  updatename() {
    this.auth.updateName(this.updateName)
  } 
}


