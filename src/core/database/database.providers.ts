import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/user.entity';
import { Post } from 'src/modules/posts/post.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = {
            ...databaseConfig.development,
            dialect: 'postgres', // Dialecto en duro.
          };
          break;
        case TEST:
          config = {
            ...databaseConfig.test,
            dialect: 'postgres', // Dialecto en duro.
          };
        case PRODUCTION:
          config = {
            ...databaseConfig.production,
            dialect: 'postgres', // Dialecto en duro.
          };
        default:
          config = {
            ...databaseConfig.development,
            dialect: 'postgres', // Por defecto.
          };
      }
      console.log('Database configuration:', config);
      const sequelize = new Sequelize(config);
      console.log('Sequelize inicializa en database.provider');
      sequelize.addModels([User, Post]);
      await sequelize.sync();
      console.log('Sequelize initialized successfully');
      return sequelize;
    },
  },
];
//Aquí, la aplicación decide en qué entorno nos estamos ejecutando actualmente y luego elige la configuración del entorno.
