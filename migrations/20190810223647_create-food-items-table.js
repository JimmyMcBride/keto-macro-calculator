
exports.up = function(knex) {
  // the change we want to make to our schema 🚀
  return knex.schema.createTable('food-items', table => {
    table.increments()
    table.text('food_item')
      .notNullable()
      .unique()
    table.integer('serving_size')
      .notNullable()
    table.text('serving_unit')
      .notNullable()
    table.integer('calories')
      .notNullable()
    table.integer('fats_grams')
      .notNullable()
    table.integer('protein_grams')
      .notNullable()
    table.integer('carbs_grams')
      .notNullable()
  })
}

exports.down = function(knex) {
  // undoing the change ✂️
  return knex.schema.dropTableIfExists('food-items')

}
