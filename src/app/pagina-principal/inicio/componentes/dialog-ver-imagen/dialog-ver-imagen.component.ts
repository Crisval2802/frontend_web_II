import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ver-imagen',
  templateUrl: './dialog-ver-imagen.component.html',
  styleUrls: ['./dialog-ver-imagen.component.css']
})
export class DialogVerImagenComponent {

  url_imagen="";
  
  constructor(
    
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogVerImagenComponent>,

   ) {this.url_imagen= this.data.url}




  onNoClick(): void {
    this.dialogRef.close();
  }


}
