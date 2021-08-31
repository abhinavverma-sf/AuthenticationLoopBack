import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { ActivatedRoute,Router } from "@angular/router";
import { Customer } from '../customer.model';

@Component({
  selector: 'app-showcustomers',
  templateUrl: './showcustomers.component.html',
  styleUrls: ['./showcustomers.component.css']
})
export class ShowcustomersComponent implements OnInit {

  li: Array<Customer>
  constructor(private customerService: CustomerServiceService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    let givenid=this.route.snapshot.paramMap.get('id');
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.readAll().subscribe(
      (members) => {
        this.li = members;
        console.log("Customers:", members);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteMember(id): void {
    
    {
     
     this.customerService.delete(id).subscribe(
       (response) => {
         console.log(response);
         this.router.navigate(["/view-customers"]);
       },
       (error) => {
         console.log(error);
       }
     );
   }
 }

}
