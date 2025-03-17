import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import {ApiService} from '../../core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../core/services/app.service';
import { HttpHeaders } from '@angular/common/http';

import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { NgxSpinnerService } from "ngx-spinner";
import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-productsetup',
  templateUrl: './productsetup.component.html',
  styleUrl: './productsetup.component.css'
})
export class ProductsetupComponent {
  p: number = 1;
  searchText = '';
  dataSource: any;
  categorylist:any=[];
  categorylst:any=[];
  subcategorylist:any=[];
  allunitfactornamelist:any=[];
  brandlist:any=[];
  unitlist:any=[];
  guid:any;
  formSubmitted:boolean=false;
  mode:any='insert';
  pform!: FormGroup;
  selectedFile: File | null = null;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  constructor( private apiservice:ApiService,private toast:ToastrService,  private fb:FormBuilder,private appservice: AppService,
    private router:Router
    ,private activrouter: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.appservice.checktoken();
    this.getcategorybind();
    this.getallunitfactorname();
   this.getunitlist();
    this.getbrandlist();
    this.pform=this.fb.group({
      guid_ProductId:['0'],
      guid_CategoryId:['',Validators.required],
      userid:[localStorage['userid']],
      guid_VendorId: [localStorage['userid']],
      guid_SubCategoryId:['',Validators.required],
      guid_SubSubCategoryId:[''],
      guid_UnitFactorId:['',Validators.required],
      guid_UnitId:['',Validators.required],
      is_Organic:[false],
      discountType:['',Validators.required],
      productName:['',Validators.required],
      code:['',Validators.required],
      orderno:['',Validators.required],
      short_Description:['',Validators.required],
      full_Description:['',Validators.required],
      guid_BrandId:['',Validators.required],
      thumbnail_Image_Url:[''],
      available_Stock:['',Validators.required],
      maxPurchaseQty:['',Validators.required],
      price:['',Validators.required],
      tag:['',Validators.required],
      is_InSale:[false],
      discount:['']
          });
          this.guid = this.activrouter.snapshot.queryParamMap.get('guid');
          if(this.guid != null)
               this.getproductdata(this.guid); 
  }

  getproductdata(guid:any){
    this.apiservice.postapi('Product/GetProductbyId?Guid_Productid='+guid).subscribe(resp=>{
      if(resp.status){
        this.getsubcategory(resp.productDatas[0].guidCategoryId);
        this.pform.patchValue({
          guid_ProductId:resp.productDatas[0].guidProductId,
          guid_CategoryId:resp.productDatas[0].guidCategoryId,
      userId:localStorage['userid'],
      guid_SubCategoryId:resp.productDatas[0].guidSubCategoryId,
      guid_SubSubCategoryId:resp.productDatas[0].guidSubSubCategoryId,
      guid_UnitFactorId:resp.productDatas[0].guidUnitFactorId,
      productName: resp.productDatas[0].productName,
      code:resp.productDatas[0].code,
      orderno: resp.productDatas[0].orderNo,
      short_Description:resp.productDatas[0].shortDescription,
      full_Description:resp.productDatas[0].fullDescription,
      guid_BrandId:resp.productDatas[0].guidBrandId,
      thumbnail_Image_Url:resp.productDatas[0].thumbnailImageUrl,
      available_Stock:resp.productDatas[0].availableStock,
      price:resp.productDatas[0].price,
      is_InSale:resp.productDatas[0].isInSale,
      discount:resp.productDatas[0].discount,
      discountType:resp.productDatas[0].discountType,
      guid_UnitId:resp.productDatas[0].guidUnitId,
      is_Organic:resp.productDatas[0].isOrganic,
      tag:resp.productDatas[0].tag,
      maxPurchaseQty:resp.productDatas[0].maxPurchaseQty
        })

      //  this.getsubcategorylist(resp.productDatas[0].guid_CategoryId);
      }});
     
      this.mode='edit';

  }

  fileProgress(fileInput: any){

    this.selectedFile=fileInput.target.files[0];
   
    }
    //unit Factor
getallunitfactorname(){
  
  this.apiservice.getapi('UnitFactorName/allunitquantityfactorwithnamelist').subscribe(resp=>{
    debugger;
//this.allunitfactornamelist=resp.lstItems;
this.allunitfactornamelist=resp.unitfactornamedatas;
//this.fields={ dataSource: this.data, value: 'guid_UnitFactorId', text: 'unitfactorname', child: 'unitQuantityFactorsDatas' };
  

//   const pages = Array.from(Array((this.lastPage + 1) - this.pageNo).keys()).map(i => this.pageNo + i);
  //  this.pagelist=pages;
    });

}   
  getcategorybind(){
    this.apiservice.getapi('Category/categorylist?Guid_VendorId='+localStorage['userid']).subscribe(resp=>{
      this.categorylst=resp.categoryDatas;
    
             
    });
  
  }

  getsubcategory(id:any){
    this.apiservice.postapi('Category/Getsubcategorylist?guidcategoryid='+id).subscribe(resp=>{
      this.subcategorylist=resp.categoryDatas;
    
             
    });
  }

  getsubcategorylist(id:any){
    this.apiservice.postapi('Category/Getsubcategorylist?guidcategoryid='+id.target.value).subscribe(resp=>{
      this.subcategorylist=resp.categoryDatas;
    
             
    });
  
  }
  getbrandlist(){
    this.apiservice.getapi('Brand/GetAllBrands?Guid_VendorId='+localStorage['userid']).subscribe(resp=>{
      this.brandlist=resp.brands;
    
             
    });
  
  }

  getunitlist(){
    this.apiservice.getapi('Unit/GetAllUnits').subscribe(resp=>{
      this.unitlist=resp.unitdata;
    
             
    });
  
  }
  uploadImage(id : any){
   
    if(this.selectedFile!=null){
      const formData = new FormData();
      formData.append('file', this.selectedFile);

     
    

      this.apiservice.postapi('Product/UploadproductImage?guidproductid='+id, formData).subscribe((resp) => {
            
      });
    }
  }
  addproduct(){

    this.formSubmitted=true;
    if(this.pform.valid && this.formSubmitted){
   
    if(this.mode=='insert')
    {
      this.apiservice.postapi('Product/Addnewproduct',this.pform.value).subscribe(resp=>{
        if(resp.status){

          this.uploadImage(resp.guid);
          this.toast.success(resp.message);
          this.router.navigate(['/product/productlist']);
      this.pform.reset();
      this.formSubmitted=false;
        
           this.selectedFile=null;
        }
        else{
          this.toast.error(resp.message);
        }
      });

    }
    else{
      this.apiservice.postapi('Product/Updateproduct',this.pform.value).subscribe(resp=>{
        if(resp.status){
          this.uploadImage(resp.guid);
          this.toast.success(resp.message);
          this.router.navigate(['/product/productlist']);
      this.pform.reset();
      this.formSubmitted=false;
          
           this.mode='insert';
          
           this.selectedFile=null;
        }
        else{
          this.toast.error(resp.message);
        }
      });
    }

   }
  }
}