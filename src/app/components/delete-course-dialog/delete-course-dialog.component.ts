import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ICourse } from '../../shared/models/course.model';

@Component({
  selector: 'app-delete-course-dialog',
  templateUrl: './delete-course-dialog.component.html',
  styleUrls: ['./delete-course-dialog.component.scss']
})
export class DeleteCourseDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICourse
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
