import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { CrudServiceService } from '../../shared/service/apiService/crud-service.service'
import { ToastrService } from 'ngx-toastr';
import { ModalServiceService } from 'src/app/shared/service/modal-service.service';




@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  allCustomers!: any
  constructor(
    private api: CrudServiceService,
    private toastr: ToastrService,
    private modalService: ModalServiceService,
  ) { }

  ngOnInit(): void {
    this.getCustomers();
    this.refreshCustomerlist();
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

  refreshCustomerlist() {
    this.api.refresh.pipe(takeWhile(() => true)).subscribe((data:any) =>{
      if(data) {
        this.getCustomers()
      }
    })
  }


  deleteCustomer(id:any){
    this.api.deleteCustomer(id).subscribe( response =>{
      console.log(response)
      this.toastr.success('Success', 'User deleted Successfully');
    }, err =>{
      console.log(err)
      this.toastr.error('error', 'Something went wrong');

    })
    this. getCustomers()
  }

  editCustomer(customer: any){
    console.log(customer);
    this.modalService.modal(customer).subscribe((res:any)=>{
      console.log(res)
      if(res && res.data) {
        this.api.refresh.next(true);
      }
    })
  }

}
