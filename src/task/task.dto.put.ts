import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { Task } from "src/db/entities/task.entity";
import { TaskStatusEnum } from "./task.dto.post";

export class TaskDtoPut {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(TaskStatusEnum)
    @IsOptional()
    status: string;

    @IsDateString()
    @IsOptional()
    expirationDate: Date;
}
export function createTaskFromDtoPut(taskDtoPut: TaskDtoPut) {
    const task = new Task();
    task.id = taskDtoPut.id
    task.title = taskDtoPut.title;
    task.status = taskDtoPut.status;
    task.description = taskDtoPut.description;
    task.expiration_date = taskDtoPut.expirationDate;
    return task;
}
