'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return (async () => {
    await db.createTable('user', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true },
      username: {type: 'string', notNull: true, length: 60},
      email: {type: 'string', notNull: true, length: 60},
      password: {type: 'string', notNull: true, length: 255},
      profile_id: {type: 'int'}
    });
    await db.createTable('profile', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true },
      name: {type: 'string', notNull: true, length: 50},
      surname: {type: 'string', notNull: true, length: 100},
      city: {type: 'string', length: 60},
      country: {type: 'string', length: 60},
      info: {type: 'string', length: 255},
      user_id: {type: 'int'}
    });
    await db.addForeignKey('user', 'profile', 'user_profile',
        {
          'profile_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        });
    await db.addForeignKey('profile', 'user', 'profile_user',
        {
          'user_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        });
    await db.createTable('group', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true },
      name: {type: 'string', notNull: true, length: 50},
      description: {type: 'string', length: 255},
    });
    await db.createTable('permission', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true },
      name: {type: 'string', notNull: true, length: 50},
      description: {type: 'string', length: 255},
    });
    await db.createTable('user_group', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true },
      user_id: {type: 'int', notNull: true},
      group_id: {type: 'int', notNull: true},
    });
    await db.addForeignKey('user_group', 'user', 'user_group_user',
        {
          'user_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        });
    await db.addForeignKey('user_group', 'group', 'user_group_group',
        {
          'group_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        });
    await db.createTable('group_permission', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true },
      permission_id: {type: 'int', notNull: true},
      group_id: {type: 'int', notNull: true},
    });
    await db.addForeignKey('group_permission', 'group', 'group_permission_group',
        {
          'group_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        });
    await db.addForeignKey('group_permission', 'permission', 'group_permission_permission',
        {
          'permission_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        });
  })();
};

exports.down = function(db) {
  return (async () => {
    await db.removeForeignKey('user', 'user_profile');
    await db.removeForeignKey('profile', 'profile_user');
    await db.removeForeignKey('user_group', 'user_group_user');
    await db.removeForeignKey('user_group', 'user_group_group');
    await db.removeForeignKey('group_permission', 'group_permission_group');
    await db.removeForeignKey('group_permission', 'group_permission_permission');
    await db.dropTable('user');
    await db.dropTable('profile');
    await db.dropTable('group');
    await db.dropTable('user_group');
    await db.dropTable('permission');
    await db.dropTable('group_permission');
  })();
};

exports._meta = {
  "version": 1
};
