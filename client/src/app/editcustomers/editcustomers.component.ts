import { Component, OnInit } from "@angular/core";
import { CustomerServiceService } from "../customer-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "../customer.model";

@Component({
  selector: "app-editcustomers",
  templateUrl: "./editcustomers.component.html",
  styleUrls: ["./editcustomers.component.css"],
})
export class EditcustomersComponent implements OnInit {
  li: Array<Customer>;
  currentCustomer = null;
  message = " ";
  didcustomer = false;
  origid: string;
  constructor(
    private customerService: CustomerServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let givenid = this.route.snapshot.paramMap.get("id");
    this.origid=givenid;
    this.getCustomers(givenid);
  }

  getCustomers(id): void {
    this.customerService.read(id).subscribe(
      (members) => {
        this.li = members;
        console.log("Customers:", members);
        this.didcustomer = true;
        this.currentCustomer = members;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateCustomers(): void {
    console.log("Updated", this.currentCustomer.customerid);
    this.customerService
      .update(this.currentCustomer.customerid, this.currentCustomer)
      .subscribe(
        (response) => {
          this.router.navigate(["/view-customers"]);
          this.message = "The product was updated!";
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
