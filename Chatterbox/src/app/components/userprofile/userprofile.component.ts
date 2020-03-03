import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponentComponent } from '../dialog-component/dialog-component.component'
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  @Input() userProfile: any

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    let dialogRef = this.dialog.open(DialogComponentComponent, {
      panelClass: "mat-dialog"
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog Result:${result}`)
    })
  }
  OnlogOut = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('userId');
    this.router.navigate(['/signin'])
  }
}
