import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { ActionModalComponent } from '../shared/action-modal/action-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    exports: [
        EmployeeDashboardComponent,
        HeaderComponent,
        TableComponent,
        ActionModalComponent
    ],
    declarations: [
        EmployeeDashboardComponent,
        HeaderComponent,
        TableComponent,
        ActionModalComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        HttpClientModule

    ],
    providers: [],
})
export class ComponentsModule { }