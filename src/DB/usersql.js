var UserSQL = {  
    insert:'INSERT INTO db_user(id,email,pwd) VALUES(?,?,?)',
    queryAll:'SELECT * FROM db_user',
    updateById:'UPDATE db_user SET email=?, pwd=? WHERE id=?',
    updateByEmail:'UPDATE db_user SET id=?, pwd=? WHERE email=?',
    getUserById:'SELECT * FROM db_user WHERE id = ?',
    delete: 'DELETE FROM db_user WHERE id=?',
  };
module.exports = UserSQL;