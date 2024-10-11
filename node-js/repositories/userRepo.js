const mysqlDb = require("./mysqlDb");

const { DB_USER_ROOT_ROLE } = process.env;
module.exports = {
  /**
   * @param {string} username
   * @returns {Promise<User>}
   * */
  findOneByUserName: async (username) => {
    const query = "select * from Users where username = ?;";
    const params = [username];

    // TODO: need authorize later on
    // TODO: decouple execution
    try {
      const [rows, fields] = await mysqlDb
        .getPool(DB_USER_ROOT_ROLE)
        .execute(query, params);

      if (rows.length == 0) throw new Error("User not found!");
      return rows[0];
    } catch (err) {
      throw err;
    }
  },
};
