
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('food-items').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('food-items').insert([
        { food_item: 'Chicken Thigh', serving_size: 1, serving_unit: 'thigh', calories: '152',
        fats_grams: 9.5, protein_grams: 15.4, carbs_grams: 0, }
      ])
    })
}
