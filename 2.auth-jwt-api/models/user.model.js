const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name',
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name',
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Email is Required'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password is Required'
                }
            }
        },
        token: {
            type: DataTypes.STRING,
        }
    });

    return User;
}