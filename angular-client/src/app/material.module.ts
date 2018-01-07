import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatToolbarModule
    ],
    exports : [
        MatButtonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatToolbarModule
    ]
})
export class AppMaterialModule { }