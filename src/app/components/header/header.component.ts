import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from 'src/app/shared/service/apiService/crud-service.service';
import { ModalServiceService } from 'src/app/shared/service/modal-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private modalService: ModalServiceService,
    private api: CrudServiceService,
  ) { }

  ngOnInit(): void {
  }

  addCustomer(){
    this.modalService.modal().subscribe((res:any)=>{
      console.log(res)
      if(res && res.data) {
        this.api.refresh.next(true);
      }
    })
  }

}
