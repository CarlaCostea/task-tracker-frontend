import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { faCheck, faUndo, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleStatus: EventEmitter<Task> = new EventEmitter();
  faTrash = faTrash;
  faCheck = faCheck;
  faUndo = faUndo;


  onDelete(task: Task | undefined) {
    if (task) {
      this.onDeleteTask.emit(task);
    }
  }

  onToggle(task: Task | undefined) {
    if (task) {
      this.onToggleStatus.emit(task);
    }
  }
}
