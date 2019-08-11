module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/food-items.db3'
    },
    useNullAsDefault: true
  }
}
