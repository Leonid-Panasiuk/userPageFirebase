import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ChatMessage } from '../chat-message.model';
import { AngularFireDatabase, FirebaseListObservable } from '@angular/fire/database-deprecated';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: firebase.User;
  chatMessage: ChatMessage;
  chatMessages: FirebaseListObservable<ChatMessage[]>;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFirestore,
    public dbChat: AngularFireDatabase,
    public auth: AuthService
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });
  }
  getAll(): Observable<any> {
    return this.db.collection('users').valueChanges()
      .pipe(map((users) => users));
  }
  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      displayName: this.user.displayName,
      email: email
    });
    console.log(msg,this.user.displayName)
  }
  getMessages(): FirebaseListObservable<ChatMessage[]> {
    return this.dbChat.list('messages', {
      query: {
        limitToLast: 25,
        orderByKey: true
      }
    });
  }
  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDate();
    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();

    return (date + ' ' + time);
  }
}
// return this.db.doc(`chat/${user.uid}`)
