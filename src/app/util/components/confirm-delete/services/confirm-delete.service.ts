import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ConfirmDeleteComponent } from '../confirm-delete.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDeleteService {
  constructor(private modalService: BsModalService) {}

  showConfirmDialog(initialState: any) {
    const bsModalRef: BsModalRef = this.modalService.show(
      ConfirmDeleteComponent,
      initialState
    );
    return bsModalRef;
  }
}
