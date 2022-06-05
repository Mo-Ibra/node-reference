const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define('tutorial', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Tutorial',
            unique: true,
            validate: {
                len: [6, 200],
                notNull: {
                    msg: 'Title Cannot be Empty'
                },
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 6,
                notNull: {
                    msg: 'Description Cannot be Empty'
                },
            }
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            comment: 'Check if tutorial is publish or not',
            validate: {
                notNull: {
                    msg: 'Published Cannot be Empty'
                },
            }
        }
    });

    return Tutorial;
}