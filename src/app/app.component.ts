import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crud-application';

  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price','comment','date','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog : MatDialog,private api:ApiService){

  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val=='save'){
        this.getAllProduct();
      }
    })
  }

  getAllProduct(){
    this.api.getProduct().subscribe({
      next:(res)=>{
        this.dataSource=new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        
        
      },
      error:()=>{
        alert('Error While Saving the product !!')
      }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val=='update'){
        this.getAllProduct();
      }
    })
  }
  deleteProduct(id:number){
    this.api.deleteData(id).subscribe({
      next:(res)=>{
        alert("Product Deleted Succesfully");
        this.getAllProduct();
      },
      error:()=>{
        this.getAllProduct();
        alert("Error while Deleting");

       }
       //,
      // complete:()=>{
      //   alert("Product Deleted Succesfully");
      //   this.getAllProduct();
      // }
    })
    // this.api.deleteData(id).subscribe((res:any) => {
    //   if(res){
    //     console.log(res);
    //     this.getAllProduct();
    //   }
    // })
    // this.api.deleteData(id).subscribe({
    //   next:(res)=>{
    //     alert("Product Deleted Succesfully");
    //     this.getAllProduct();
    //   },
    //   error:()=>{
    //     this.getAllProduct();
    //     alert("Error while Deleting");

    //   },
    //   complete:()=>{
    //     alert("Product Deleted Succesfully");
    //     this.getAllProduct();
    //   }
    // })
  }

}

