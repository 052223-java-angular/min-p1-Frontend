import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {
  @Input() items: string[] = [];
  @Input() selectedItem: string = '';
  @Output() OnChange: EventEmitter<string> = new EventEmitter<string>();

  Drop: boolean = false;

  toggle() {
    this.Drop = !this.Drop;
  }
  select(item: string) {
    this.selectedItem = item;
    this.OnChange.emit(this.selectedItem);
    this.toggle();
  }
}