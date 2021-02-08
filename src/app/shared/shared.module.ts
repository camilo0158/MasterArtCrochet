import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadFilesComponent } from './components/load-files/load-files.component';
import { ViewImageComponent } from './components/view-image/view-image.component';

@NgModule({
  declarations: [ViewImageComponent, LoadFilesComponent, ViewImageComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  entryComponents: [LoadFilesComponent, ViewImageComponent],
  exports: [LoadFilesComponent, ReactiveFormsModule, FormsModule, ViewImageComponent],
})
export class SharedModule {}
