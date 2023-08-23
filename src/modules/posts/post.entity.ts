import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
@Table
export class Post extends Model<Post> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
  @BelongsTo(() => User)
  user: User;
}

//@ForeignKey(() => User) tiene por objetivo especificar que la columna de ID de usuario es la ID de la tabla de usuarios y @BelongsTo(() => User)especificar la relación entre la tabla de publicaciones y la tabla de usuarios.
