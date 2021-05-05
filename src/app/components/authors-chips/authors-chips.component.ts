import { Component, forwardRef } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Author } from '../../shared/models/course.model';

@Component({
  selector: 'app-authors-chips',
  templateUrl: './authors-chips.component.html',
  styleUrls: ['./authors-chips.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsChipsComponent),
      multi: true,
    }
  ],
})
export class AuthorsChipsComponent implements ControlValueAccessor {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  authors: Author[] = [];

  private _touched = false;

  onChange = (authors: Author[]) => {};
  onTouched = () => {};

  writeValue(authors: Author[]): void {
    this.authors = authors;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  addAuthor(event: MatChipInputEvent): void {
    this.markAsTouched();

    const { input, value } = event;

    if ((value || '').trim()) {
      this.authors.push({ name: value.trim() });
      this.onChange(this.authors);
    }

    if (input) {
      input.value = '';
    }
  }

  removeAuthor(authorToRemove: string): void {
    this.markAsTouched();

    this.authors = this.authors.filter((author) => author.name !== authorToRemove);
    this.onChange(this.authors);
  }

  private markAsTouched(): void {
    if (!this._touched) {
      this.onTouched();
      this._touched = true;
    }
  }
}
