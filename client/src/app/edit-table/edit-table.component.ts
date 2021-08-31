import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Role } from '../user.model';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {
  currentMember = null;
  didmember=false;
  message=' ';
  roles=[0,1,2];
  roleName: string;
  roleIndex: number=0;
  allRole=Role;
  keys() : Array<string> {
    var keys = Object.keys(this.allRole);
   
    return keys;
  
}

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    let id=(this.route.snapshot.paramMap.get('id'));
 
    this.getMember(id);
    
    
  }
  getMember(id): void {
    
    this.dataService.read(id)
      .subscribe(
        member => {
          this.currentMember = member;
          
          this.didmember=true;
        },
        error => {
          console.log(error);
        });
  }
  updateMember(): void {
    
    
    
    console.log('Updated: ', this.currentMember);
    this.currentMember.customerId=parseInt(this.currentMember.customerId);

    this.dataService.update(this.currentMember.id, this.currentMember)
      .subscribe(
        response => {
        
          this.router.navigate(["/view-members"]);
          this.message = 'The product was updated!';
        },
        error => {
          console.log(error);
        });
  }
  getRole(index: number): string{
    this.roleName=Role[index];
    return Role[index];
  }
  getCurrentIndex(el): number{
   
    for (let index = 0; index < this.keys().length; index++) {
      const element = this.keys()[index];
      
      if(element==el.target.value){
        
        this.roleIndex=index-3;
        this.currentMember.role=this.roleIndex;
        
        return index-3;
      }
      
    }
  }
  

}
