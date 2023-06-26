import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
  ],
})
export class AutoCompleteComponent implements OnInit {
  myControl = new FormControl('');
  @Input() options: string[] = [];
  @Input() selected?: string;
  @Input() nameMap: any;
  @Output() optionSelected = new EventEmitter();// emits the option selected
  filteredOptions?: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.nameMap) {
      return this.options.filter(option => this.nameMap[option].toLowerCase().includes(filterValue));
    }
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSelect(event: any) {
    this.optionSelected.emit(event);
  }

}
