import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from 'src/db/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [TaskController],
    imports: [TypeOrmModule.forFeature([Task])],
    providers: [TaskService]
})
export class TaskModule { }
