import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  @Output() sendMessage = new EventEmitter<string>();
  users;
  message: string;
  constructor(public chat: ChatService) { }

  ngOnInit() {
    this.chat.getAll().subscribe((users) => {
      console.log(users);
      this.users = users;
    });
  }
  send() {
    this.chat.sendMessage(this.message);
    this.message = '';
  }
  onEnter() {
      this.send();
  }
}

