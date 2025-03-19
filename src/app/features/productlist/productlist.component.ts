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
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent {
  p: number = 1;
  searchText = '';
  dataSource: any;
  productlist:any=[];
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
    this.getproductlist();
    this.eform=this.fb.group({
      guid_ProductId:[''],
      userId:[localStorage['userid']]
     
    
          });
  }
 
  getproductlist(){
    this.apiservice.getapi('Product/GetAllProduct?Guid_VendorId='+localStorage['userid']+'&pageNo=1&pageSize=10').subscribe(resp=>{
      if(resp.status){
          this.productlist=resp.productDatas;
          this.filteredProductList = resp.productDatas
          console.log('P_List',this.productlist);
      }});
  }
  delete(id:any){
    this.eform.get("guid_ProductId")?.setValue(id);
    this.eform.get("userId")?.setValue(localStorage['userid']);
    this.apiservice.postapi('Product/Deleteproduct',this.eform.value).subscribe(resp=>{
      if(resp.status)
      {
        this.getproductlist();       
       this.toast.success(resp.message);
      }
    })
  }

  toggleChange( event:any, id : any) {
    this.apiservice.postapi('Product/ProductActiveInactive?Guid_Productid='+ id).subscribe(resp=>{
      if(resp.status)
      {
        this.getproductlist();       
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
      this.productlist = this.filteredProductList.filter((product: any) => {
        return product.isActive.toString().includes(this.filterValue);
      });
      console.log(this.productlist);
    }
}
