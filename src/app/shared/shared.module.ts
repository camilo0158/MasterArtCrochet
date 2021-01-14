import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadFilesComponent } from './components/load-files/load-files.component';

@NgModule({
  declarations: [LoadFilesComponent, LoadFilesComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  entryComponents: [LoadFilesComponent],
  exports: [LoadFilesComponent, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
