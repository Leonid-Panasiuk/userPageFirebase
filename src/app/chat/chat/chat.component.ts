import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  users;
  
  constructor(
    private auth: AuthService,
    private router: Router, db: AngularFirestore,
    private chat: ChatService, private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.chat.getAll().subscribe( (users) => {
      console.log(users);
      this.users = users;
    });
  }
}
