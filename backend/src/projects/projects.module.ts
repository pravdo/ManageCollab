import { Module } from '@nestjs/common';
import { ProjectSchema } from './schema/projects.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Project',
        schema: ProjectSchema,
        collection: 'projects',
      },
    ]),
    TasksModule,
  ],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
