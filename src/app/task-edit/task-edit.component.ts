import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent {
  task: Task | undefined;
  editForm!: FormGroup; // Garantido que será inicializado

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      const description = params['description'];
      this.initForm(description);
    });
  }

  initForm(description: string) {
    this.editForm = this.fb.group({
      description: [description || '', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.editForm.value.description);
    this.router.navigate(['']);
    alert("Teoricamente, a descrição da tarefa foi modificada para " + this.editForm.value.description + ", mas o único endpoint de mudança de tarefa da API envolve apenas o campo isDone.");
    if (this.task) {
      this.task.description = this.editForm.value.description;
      this.taskService.updateTask(this.task);
      this.router.navigate(['']);
    }
  }
}






// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { TaskService } from '../services/task.service';
// import { Task } from '../models/task.model';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-task-edit',
//   templateUrl: './task-edit.component.html',
//   styleUrl: './task-edit.component.scss'
// })
// export class TaskEditComponent {

//   task: Task | undefined;
//   editForm: FormGroup;

//   constructor(
//     private route: ActivatedRoute,
//     private taskService: TaskService,
//     private router: Router,
//     private fb: FormBuilder
//   ){
//     const taskId = this.route.snapshot.paramMap.get('id');
//     this.task = this.taskService.getTask(taskId!);

//     this.editForm = this.fb.group({
//       description: ['', Validators.required]
//     });

//     if(this.task){
//       this.editForm.patchValue({
//         description: this.task.description
//       })
//     }

//   }

//   onSubmit(){
//     console.log(this.editForm.value.description);
//     this.router.navigate([''])
//     alert("Teoriquement la description de la tâche a été modifiée pour " + this.editForm.value.description + ", mais le seul endPoint de changement de tâche de l'API concerne uniquement le champ isDone.");
//     if(this.task){
//       this.task.description = this.editForm.value.description;
//       this.taskService.updateTask(this.task);
//       this.router.navigate([''])
//     }
//   }
// }
