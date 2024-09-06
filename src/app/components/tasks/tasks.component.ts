import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { TaskComponent } from '../task/task.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, CommonModule, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  searchTitle: string = '';
  showCompleted: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks(this.searchTitle, this.showCompleted)
      .subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleStatus(task: Task) {
    task.completed = !task.completed;
    this.taskService.updateTaskStatus(task).subscribe(() => {
      this.fetchTasks();
    });
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }

  // Method to handle changes in the search input
  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTitle = input.value;  // Update search title with the input value
    this.fetchTasks();  // Fetch tasks with the new search title
  }

  // Method to handle the change in the completed status toggle
  onCompletedToggle(event: Event) {
    const input = event.target as HTMLInputElement;
    this.showCompleted = input.checked;  // Update filter with the toggle value
    this.fetchTasks();  // Fetch tasks with the updated filter
  }
}
