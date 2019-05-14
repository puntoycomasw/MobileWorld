import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public dataApi: DataApiService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @Input() userUid: string;
  ngOnInit() {
  }

  onSaveProduct(productForm: NgForm): void {
    if (productForm.value.id == null) {
      // New 
      productForm.value.userUid = this.userUid;
      this.dataApi.addProduct(productForm.value);
    } else {
      // Update
      this.dataApi.updateProduct(productForm.value);
    }
    productForm.resetForm();
    this.btnClose.nativeElement.click();
  }

}
