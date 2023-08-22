import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;
}

//Aquí, estamos especificando lo que contendrá nuestra tabla de Usuario.
//proporciona @column() decoratorinformación sobre cada columna de la tabla.
//La tabla Usuario tendrá name email passwordy gendercomo columnas.
//Importamos todos los decoradores Sequelize de sequelize-typescript.
