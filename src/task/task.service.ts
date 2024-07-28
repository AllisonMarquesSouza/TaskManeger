import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createTaskFromDtoPost, TaskDtoPost, TaskStatusEnum } from './task.dto.post';
import { createTaskFromDtoPut, TaskDtoPut } from './task.dto.put';
import { Task } from 'src/db/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) { }

    async create(taskDto: TaskDtoPost): Promise<Task> {
        const taskAlreadyRegister = await this.taskRepository.findOne({
            where: { title: taskDto.title }
        })
        if (taskAlreadyRegister) {
            throw new ConflictException(`Task with ${taskDto.title} already registered`);
        }

        const converToTask = createTaskFromDtoPost(taskDto);
        converToTask.status = TaskStatusEnum.TO_DO;
        const saveTask = await this.taskRepository.save(converToTask);
        return saveTask;
    }


    async findAll(): Promise<Task[]> {
        const mapedAll = await this.taskRepository.find();
        return mapedAll;
    }


    async findById(id: number): Promise<Task> {
        const foundTask = await this.taskRepository.findOne({
            where: { id: id }
        })

        if (!foundTask) {
            throw new HttpException(`Task with ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return foundTask;

    }
    async update(taskDtoPut: TaskDtoPut): Promise<void> {
        const foundTask = await this.taskRepository.findOne({
            where: { id: taskDtoPut.id }
        })
        if (!foundTask) {
            throw new HttpException(`Task with ID: ${taskDtoPut.id} not found, not is possible update`, HttpStatus.BAD_REQUEST);
        }
        const convertToTask = createTaskFromDtoPut(taskDtoPut);
        const result = await this.taskRepository.update(taskDtoPut.id, convertToTask);

        if (result.affected === 0) {
            throw new HttpException(`Task with ID: ${taskDtoPut.id} not updated`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    async delete(id: number): Promise<void> {
        const foundTask = await this.findById(id);
        if (!foundTask) {
            throw new HttpException(`Task with ${id} not found , not possible delete`, HttpStatus.BAD_REQUEST);
        }

        const result = await this.taskRepository.delete(foundTask);

        if (result.affected === 0) {
            throw new HttpException(`Task with ID: ${id} not deleted`, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
