import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { HomeComponent } from './home.component';
import { ChatComponent } from '../chat/chat/chat.component';
import { ChatRoomComponent } from '../chat/chat-room/chat-room.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
        
    },
    {
      path: 'register',
      component: RegistrationComponent
    },
    {
      path: 'home',
      component: HomeComponent
      
    },
    {
      path: 'chat',
      component: ChatComponent,
      children: [
        { 
          path: ':id',
          component: ChatRoomComponent
        }
      ]
    },
    {
      path: 'chatroom',
      component: ChatRoomComponent
    },
      
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }