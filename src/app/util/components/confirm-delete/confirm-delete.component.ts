import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent implements OnInit {
  private static confirmSubject = new BehaviorSubject<boolean>(false);
  name!: string;

  constructor(
    public bsModalRef: BsModalRef,
  ) {}

  ngOnInit(): void {}

  onCancel() {
    this.bsModalRef.hide();
  }

  onConfirm() {
    ConfirmDeleteComponent.confirmSubject.next(true);
  }

  static confirmAsObservable(): Observable<boolean> {
    return this.confirmSubject.asObservable();
  }
}
