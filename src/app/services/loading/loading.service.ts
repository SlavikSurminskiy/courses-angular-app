import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  showLoader$: Subject<boolean> = new Subject();

  private spinnerTopRef = this.overlay.create({
    backdropClass: 'cdk-overlay-dark-backdrop',
    positionStrategy: this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically()
  });

  constructor(private overlay: Overlay) {
    this.showLoader$
      .asObservable()
      .subscribe((show) => {
        show ? this._showLoader() : this._hideLoader();
      });
  }

  private _showLoader(): void {
    this.spinnerTopRef.attach(new ComponentPortal(MatSpinner));
  }

  private _hideLoader(): void {
    this.spinnerTopRef.detach();
  }
}
