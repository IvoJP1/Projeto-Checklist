import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChecklistComponent } from './checklist/checklist.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChecklistComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'chcklist-app';
}
