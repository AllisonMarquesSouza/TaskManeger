import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { Task } from "src/db/entities/task.entity";


export enum TaskStatusEnum {
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}
export class TaskDtoPost {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(TaskStatusEnum)
    @IsOptional()
    status: string;

    @IsDateString()
    expirationDate: Date;
}

export function createTaskFromDtoPost(taskDtoPost: TaskDtoPost) {
    const task = new Task();
    task.title = taskDtoPost.title;
    task.status = taskDtoPost.status;
    task.description = taskDtoPost.description;
    task.expiration_date = taskDtoPost.expirationDate;
    return task;
}

