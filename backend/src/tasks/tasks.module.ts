import { Module } from '@nestjs/common';
import { Task, TaskSchema } from './schema/tasks.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
        collection: 'tasks',
      },
    ]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [MongooseModule],
})
export class TasksModule {}
