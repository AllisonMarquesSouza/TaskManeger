import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable() //diz que a classe pode ser injetada as dependencias...
export class TaskService {
    private tasks: TaskDto[] = [];

    create(task: TaskDto) {
        this.tasks.push(task)
    }
    findAll(params: FindAllParameters): TaskDto[] {
        return this.tasks.filter(t => {
            let match = true;

            if (params.title != undefined && !t.title.includes(params.title)) {
                match = false
            }

            if (params.status != undefined && t.title.includes(params.title)) {
                match = false
            }
            return match
        })
    }

    findById(id: string): TaskDto {
        const foundTask = this.tasks.find((task) => task.id === id);

        if (foundTask) {
            return foundTask;
        }
        //formas de usar execao no next , ele ja vem com umas personalizadas que ja lanca o 404 automatico, mas posso personalizar...
        // throw new NotFoundException(`Task with ${id} not found`)

        //personalizada: (message, httpStatus ou o codigo diretamente)
        //Boas praticas usar o HttpStatus-> porque especifica pelo nome e deixa mais legivel 
        throw new HttpException(`Task with ${id} not found`, HttpStatus.NOT_FOUND);

    }
    update(task: TaskDto): HttpStatus {
        const foundTask = this.tasks.findIndex((t) => t.id === task.id)
        if (foundTask >= 0) {
            this.tasks[foundTask] = task;
            return HttpStatus.NO_CONTENT;
        }
        throw new HttpException(`Task with ${task.id} not found, not is possible update`, HttpStatus.BAD_REQUEST);
    }
    delete(id: string): void {
        const foundIndex = this.tasks.findIndex((t) => t.id === id)
        if (foundIndex >= 0) {
            this.tasks.splice(foundIndex, 1)
            return;
        }
        throw new HttpException(`Task with ${id} not found`, HttpStatus.NOT_FOUND);
    }
}
