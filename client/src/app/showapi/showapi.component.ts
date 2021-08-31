import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { __core_private_testing_placeholder__ } from "@angular/core/testing";
import { User } from "../../app/user.model";
import { Role } from "../../app/user.model";
import { DataService } from "../data.service";
import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: "app-showapi",
  templateUrl: "./showapi.component.html",
  styleUrls: ["./showapi.component.css"],
})
export class ShowapiComponent implements OnInit {
  li: Array<User>;
  lis = [];
  roles=[0,1,2];
  allRole: Role;
  roleName: string;
  
  keys() : Array<string> {
    var keys = Object.keys(this.allRole);
    return keys;
}
  

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    let givenid=this.route.snapshot.paramMap.get('id');
    this.getMembers();
    
  }
  getMembers(): void {
    this.dataService.readAll().subscribe(
      (members) => {
        this.li = members;
        console.log("Members:", members);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getRole(index: number): string{
    this.roleName=Role[index];
    return Role[index];
  }
  
  deleteMember(id): void {
    
     {
      
      this.dataService.delete(id).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(["/view-members"]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
