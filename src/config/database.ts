import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgresql://teerenzo:J1I4sXiAhDmC@ep-solitary-firefly-a5vzcfgm.us-east-2.aws.neon.tech/neondb?sslmode=require', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  })

export default sequelize;
