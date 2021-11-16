import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerModel } from '../model/customer.model';
import { CrudServiceService } from '../service/apiService/crud-service.service'
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {

  info: any
  formValue!: FormGroup;
  allCustomers: any
  customerModelObj: CustomerModel = new CustomerModel();
  constructor(
    private formbuilder: FormBuilder,
    private api : CrudServiceService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ActionModalComponent>,
  ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      gender: [''],
      age: [''],
      address: [''],
      number_of_orders: ['']
    })
    console.log(this.info);
    if(this.info) {
      this.info.number_of_orders = this.info.order;
      this.formValue.patchValue(this.info);
    }
  }

  addClient(){
    this.customerModelObj.name = this.formValue.value.name
    this.customerModelObj.gender = this.formValue.value.gender
    this.customerModelObj.age = this.formValue.value.age
    this.customerModelObj.address = this.formValue.value.address
    this.customerModelObj.order = this.formValue.value.number_of_orders
    if(this.info){
      this.api.updateCustomer(this.customerModelObj, this.info.id).subscribe(res =>{
        this.toastr.success('Success', 'Customer Updated Successfully');
        this.getCustomers()
        this.closeModal(true)
      })
    }else{
      this.api.postCustomer(this.customerModelObj)
      .subscribe(res  =>{
        this.toastr.success('Success', 'Customer Added Successfully');
        this.closeModal(true)
      }, err =>{
        console.log(err)
      })
    }
 
  }

  getCustomers(){
    this.api.getCustomer().subscribe((data:any) =>{
      this.allCustomers = data
      console.log(data)
    }, err =>{
      console.log(err)
      this.toastr.error('error', 'Something went wrong');
    })
  }

  closeModal(val?:boolean) {
    this.dialogRef.close({ data: val });
  }


}
