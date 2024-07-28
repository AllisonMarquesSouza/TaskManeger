import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TaskDtoPost } from './task.dto.post';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Task } from 'src/db/entities/task.entity';
import { TaskDtoPut } from './task.dto.put';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) { };

    @Post()
    async create(@Body() task: TaskDtoPost) {
        return await this.taskService.create(task);
    }

    @Get()
    async findAll(): Promise<Task[]> {
        return await this.taskService.findAll();
    }

    @Get('/:id')
    async findById(@Param('id') id: number): Promise<Task> {
        return await this.taskService.findById(id);
    }

    @Put()
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(@Body() task: TaskDtoPut): Promise<void> {
        return this.taskService.update(task);
    }


    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteById(@Param('id') id: number): Promise<void> {
        return await this.taskService.delete(id);
    }

}
