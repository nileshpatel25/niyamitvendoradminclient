import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../core/services/app.service';
import { HttpHeaders } from '@angular/common/http';
// import { MatSlideToggleModule} from 'a';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrl: './orderlist.component.css'
})
export class OrderlistComponent {
  p: number = 1;
  searchText = '';
  dataSource: any;
  orderlist:any=[];
  eform!: FormGroup;
  formSubmitted:boolean=false;
  mode:any='insert';
  cform!: FormGroup;
  selectedFile: File | null = null;
  filteredProductList: any[] = []; 
  filterValue = '';
  constructor( private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router) { }

  ngOnInit(): void {
   
    this.appservice.checktoken();
    this.getorderlist();
    this.eform=this.fb.group({
      guid_ProductId:[''],
      userId:[localStorage['userid']]
     
    
          });
  }
 
  getorderlist(){
    this.apiservice.getapi('Order/GetAllOrders?Guid_VendorId=ba6232f2-ad3e-48e4-ad50-1af62ceb17e3').subscribe(resp=>{
      if(resp.status){
          this.orderlist=resp.orderdatas;
          this.filteredProductList = resp.orderdatas
          console.log('P_List',this.orderlist);
      }});
  }
  delete(id:any){
    this.eform.get("guid_ProductId")?.setValue(id);
    this.eform.get("userId")?.setValue(localStorage['userid']);
    this.apiservice.postapi('Product/Deleteproduct',this.eform.value).subscribe(resp=>{
      if(resp.status)
      {
        this.getorderlist();       
       this.toast.success(resp.message);
      }
    })
  }

  toggleChange( event:any, id : any) {
    this.apiservice.postapi('Product/ProductActiveInactive?Guid_Productid='+ id).subscribe(resp=>{
      if(resp.status)
      {
        this.getorderlist();       
       this.toast.success(resp.message);
      }
    })    
  }
    applyFilter(event:any) {   
      const value = event.target.value;      
      if (value == 'Active') {
        this.filterValue = 'true'
      }else if (value == 'InActive') {
        this.filterValue = 'false'
      }else{
        this.filterValue = '';
      }
      this.orderlist = this.filteredProductList.filter((product: any) => {
        return product.isActive.toString().includes(this.filterValue);
      });
      console.log(this.orderlist);
    }

    pickupStatus(id: any){   
      this.apiservice.postapi('Order/UpdatePickupstatus?guidorderid=' + id).subscribe(resp => {
        if (resp.status) {
          this.getorderlist();
          this.toast.success(resp.message);
        }
      })
    }
    returnStatus(id: any){   
      this.apiservice.postapi('Order/Updatereturnstatus?guidorderid=' + id).subscribe(resp => {
        if (resp.status) {
          this.getorderlist();
          this.toast.success(resp.message);
        }
      })
    }
    cancelStatus(id: any){    
      this.apiservice.postapi('Order/Updatecancelstatus?guidorderid=' + id).subscribe(resp => {
        if (resp.status) {
          this.getorderlist();
          this.toast.success(resp.message);
        }
      })
    }
    updateStatus(id: any){   
      this.apiservice.postapi('Order/Updateorderstatus?guidorderid=' + id).subscribe(resp => {
        if (resp.status) {
          this.getorderlist();
          this.toast.success(resp.message);
        }
      })
    }
}