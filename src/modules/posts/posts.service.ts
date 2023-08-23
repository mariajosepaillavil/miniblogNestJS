import { Injectable, Inject } from '@nestjs/common';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { User } from '../users/user.entity';
import { POST_REPOSITORY } from '../../core/constants';
@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
  ) {}
  async create(post: PostDto, userId): Promise<Post> {
    return await this.postRepository.create<Post>({ ...post, userId });
  }
  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll<Post>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }
  async findOne(id): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }
  async delete(id, userId) {
    return await this.postRepository.destroy({ where: { id, userId } });
  }
  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.postRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );
    return { numberOfAffectedRows, updatedPost };
  }
}

/*
Aquí, estamos inyectando nuestro repositorio de publicaciones para comunicarnos con nuestra base de datos.

create(post: PostDto, userId):Esto acepta el objeto de publicación y la identificación del usuario que crea la publicación. Agrega la publicación a la base de datos y devuelve la publicación recién creada. El PostDtoes para la validación.
findAll():Esto obtiene todas las publicaciones de la base de datos y también incluye / carga ansioso al usuario que lo creó y excluye la contraseña del usuario.
findOne(id):Esto encuentra y devuelve la publicación con la identificación. También incluye/carga ansiosa al usuario que lo creó mientras excluye la contraseña del usuario.
delete(id, userId):Esto elimina la publicación de la base de datos con el ID y el ID de usuario. Solo el usuario que creó la publicación puede eliminarla. Esto devuelve el número de filas que se vieron afectadas.
update(id, data, userId):Esto actualiza una publicación existente donde idestá la identificación de la publicación, datason los datos para actualizar, userIdes la identificación del creador original. Esto devuelve el número de filas que se actualizaron y el objeto recién actualizado.
*/
