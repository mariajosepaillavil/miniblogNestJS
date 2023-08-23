import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Get()
  async findAll() {
    // get all posts in the db
    return await this.postService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    // find the post with this id
    const post = await this.postService.findOne(id); // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException("This Post doesn't exist");
    } // if post exist, return the post
    return post;
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
    // create a new post and return the newly created post
    return await this.postService.create(post, req.user.id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: PostDto,
    @Request() req,
  ): Promise<PostEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedPost } = await this.postService.update(
      id,
      post,
      req.user.id,
    ); // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    } // return the updated post
    return updatedPost;
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.postService.delete(id, req.user.id); // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    } // return success message
    return 'Successfully deleted';
  }
}

/*
La mayor parte de la funcionalidad de la operación CRUD se realiza en
nuestroPostService.

findAll():Esto maneja GETla solicitud al api/v1/postspunto final. Devuelve todas las publicaciones en nuestra base de datos.
findOne(@Param(‘id’) id: number):Esto maneja GETla solicitud al api/v1/posts/1punto final para obtener una sola publicación, donde 1 es la identificación de la publicación. Esto arroja un error 404 si no encuentra la publicación y devuelve el objeto de publicación si encuentra la publicación.
create(@Body() post: PostDto, @Request() req):Esto maneja POSTla solicitud al api/v1/postspunto final para crear una nueva publicación.
@UseGuards(AuthGuard(‘jwt’))se utiliza para proteger la ruta (recuerde nuestra estrategia JWT). Solo los usuarios registrados pueden crear una publicación.
update(@Param(‘id’) id: number, @Body() post: PostDto, @Request() req):Esto maneja la PUTsolicitud al api/v1/postspunto final para actualizar una publicación existente. También es una ruta protegida. Si numberOfAffectedRowses cero, significa que no se encontró ninguna publicación con la identificación de parámetros.
remove(@Param(‘id’) id: number, @Request() req):Esto maneja la DELETEsolicitud para eliminar una publicación existente.

*/
