import { BlobStorageService } from './../../../utilities/services/blob-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-load-files',
  templateUrl: './load-files.component.html',
  styleUrls: ['./load-files.component.scss'],
})
export class LoadFilesComponent implements OnInit {
  formLoadFile: FormGroup;

  constructor(
    private modalActiveService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private blobStorageService: BlobStorageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(): void {
    console.log('cambios');
  }

  private initializeForm() {
    this.formLoadFile = this.formBuilder.group({
      ImageProduct: [''],
    });
  }

  handleFileInput(files: FileList) {
    console.log(files);
    const formData =  new FormData();
    formData.append('files', files[0], files[0].name)
    this.blobStorageService.loadFile(formData).subscribe((response) => {
      console.log(response);
    });
  }
}
