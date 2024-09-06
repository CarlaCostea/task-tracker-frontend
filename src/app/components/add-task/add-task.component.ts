import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  title: string = '';
  description: string = '';

  onSubmit() {
    if (!this.title) {
      alert('Please add task title!');
      return;
    }

    if (!this.description) {
      alert('Please add task description!');
      return;
    }

    const newTask: Task = {
      title: this.title,
      description: this.description
    };

    this.onAddTask.emit(newTask);

    this.title = '';
    this.description = '';
  }
}
