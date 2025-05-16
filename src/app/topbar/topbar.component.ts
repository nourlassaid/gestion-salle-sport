import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  searchText: string = '';

  @Output() sidebarToggled = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggled.emit();
  }
}
