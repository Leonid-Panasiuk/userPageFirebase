import { NgModule } from '@angular/core';
import {
   MatToolbarModule,
   MatIconModule,
   MatSidenavModule,
   MatButtonModule,
   MatListModule,
   MatBadgeModule,
   MatGridListModule,
   MatCardModule,
   MatMenuModule,
   MatFormFieldModule
} from '@angular/material';

@NgModule({
   imports: [
       MatToolbarModule,
       MatIconModule,
       MatSidenavModule,
       MatButtonModule,
       MatListModule,
       MatBadgeModule,
       MatGridListModule,
       MatCardModule,
       MatMenuModule,
       MatFormFieldModule
   ],
   exports: [
       MatToolbarModule,
       MatIconModule,
       MatSidenavModule,
       MatButtonModule,
       MatListModule,
       MatBadgeModule,
       MatGridListModule,
       MatCardModule,
       MatMenuModule,
       MatFormFieldModule
   ],
})
export class MaterialModule { }