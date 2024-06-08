import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly _loading$ = new BehaviorSubject<boolean>(false);

  setLoading(value: boolean): void {
    this._loading$.next(value);
  }

  isLoading(): boolean {
    return this._loading$.getValue();
  }
}
