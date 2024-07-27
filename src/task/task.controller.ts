import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    //atraves do cosntrutor com uma classe que ja tem o @Injectable, so basta criar um construtor com ela, que o nestJs injeta automaticamente...
    constructor(private readonly taskService: TaskService) { };

    @Post() //o @Body , pedir do corpo algo, igual o requestBody do java...
    create(@Body() task: TaskDto) {
        this.taskService.create(task);
    }
    @Get() //o @ query serve pra mapear parametros com ?nomeParametro=valueDoParam... etc use a documentacao se tiver duvida
    findAll(@Query() params: FindAllParameters): TaskDto[] {
        return this.taskService.findAll(params);
    }
    @Get('/:id') //aqui eu coloco todos os param que vao ser passados na rota...
    findById(@Param('id') id: string): TaskDto {//@Param('nameDoParam') nameParam:tipoParam -> aqui especifico o param que vou pedir na funcao e o tipo...
        return this.taskService.findById(id);
    }
    @Put()
    update(@Body() task: TaskDto): void {
        this.taskService.update(task);
    }
    @Delete('/:id')
    deleteById(@Param('id') id: string): void {
        return this.taskService.delete(id);
    }

}
