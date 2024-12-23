import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-bonus-card',
  standalone: true,
  imports: [CommonModule,
    DropdownModule,
    FormsModule,
    TableModule,
    CardModule],
  templateUrl: './bonus-card.component.html',
  styleUrl: './bonus-card.component.scss'
})
export class BonusCardComponent {
  @Input() bonus?: number;
  @Input() name?: string;
}
