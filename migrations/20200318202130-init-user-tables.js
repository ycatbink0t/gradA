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
  return new Promise(resolve => {
    const promises = [];
    promises.push(db.createTable('user', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true, length: 13},
      username: {type: 'string', notNull: true, length: 60},
      email: {type: 'string', notNull: true, length: 60},
      password: {type: 'string', notNull: true, length: 255},
      profile_id: {type: 'int'}
    }));
    promises.push(db.createTable('profile', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true, length: 13},
      name: {type: 'string', notNull: true, length: 50},
      surname: {type: 'string', notNull: true, length: 100},
      city: {type: 'string', length: 60},
      country: {type: 'string', length: 60},
      info: {type: 'string', length: 255},
      user_id: {type: 'int'}
    }));
    promises.push(db.addForeignKey('user', 'profile', 'user_profile',
      {
      'profile_id': 'id'
      }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
    }));
    promises.push(db.addForeignKey('profile', 'user', 'profile_user',
        {
          'user_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
    }));
    promises.push(db.createTable('group', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true, length: 13},
      name: {type: 'string', notNull: true, length: 50},
      description:  {type: 'string', length: 255},
    }));
    promises.push(db.createTable('permission', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true, length: 13},
      name: {type: 'string', notNull: true, length: 50},
      description:  {type: 'string', length: 255},
    }));
    promises.push(db.createTable('user_group', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true, length: 13},
      user_id: {type: 'int', notNull: true},
      group_id: {type: 'int', notNull: true},
    }));
    promises.push(db.addForeignKey('user_group', 'user', 'user_group_user',
        {
          'user_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
    }));
    promises.push(db.addForeignKey('user_group', 'group', 'user_group_group',
        {
          'group_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
    }));
    promises.push(db.createTable('group_permission', {
      id: {type: 'int', primaryKey: true, autoIncrement: true, notNull: true, unsigned: true, length: 13},
      permission_id: {type: 'int', notNull: true},
      group_id: {type: 'int', notNull: true},
    }));
    promises.push(db.addForeignKey('group_permission', 'group', 'group_permission_group',
        {
          'group_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
    }));
    promises.push(db.addForeignKey('group_permission', 'permission', 'group_permission_permission',
        {
          'permission_id': 'id'
        }, {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
    }));
    resolve(Promise.all(promises));
  });
};

exports.down = function(db) {
  return new Promise(resolve => {
    const promises = [];
    promises.push(db.removeForeignKey('user', 'user_profile'));
    promises.push(db.removeForeignKey('profile', 'profile_user'));
    promises.push(db.removeForeignKey('user_group', 'user_group_user'));
    promises.push(db.removeForeignKey('user_group', 'user_group_group'));
    promises.push(db.removeForeignKey('group_permission', 'group_permission_group'));
    promises.push(db.removeForeignKey('group_permission', 'group_permission_permission'));
    promises.push(db.dropTable('user'));
    promises.push(db.dropTable('profile'));
    promises.push(db.dropTable('group'));
    promises.push(db.dropTable('user_group'));
    promises.push(db.dropTable('permission'));
    promises.push(db.dropTable('group_permission'));
    resolve(Promise.all(promises));
  });
};

exports._meta = {
  "version": 1
};
