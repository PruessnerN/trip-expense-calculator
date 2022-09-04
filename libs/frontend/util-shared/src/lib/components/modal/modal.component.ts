import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'tec-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: HTMLElement;

  constructor(private modalService: ModalService, el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    this.element.style.display = 'none';
    document.body.appendChild(this.element);
    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('tec-modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('tec-modal-open');
  }
}
