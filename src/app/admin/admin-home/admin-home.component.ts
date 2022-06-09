import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';
import { ITransaction } from 'src/app/ITransaction';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  
  transactions:ITransaction[] = Array<ITransaction>();
  constructor(private dataService:DataService ) { 
    

    dataService.GetAllTransactions()
            .subscribe(l => {
              l.forEach(i=>{
                this.transactions.push(i);
              }) 
            });
  }

  ngOnInit(): void {
  }

  
}
