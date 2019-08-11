const express = require('express')

const db = require('../data/dbConfig')

const router = express.Router()

// GET all food items 🚀
router.get('/', validateFood, async (req, res) => {
  try {
    const food = await db.select('*').from('food-items')
    res.status(200).json(food)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Error getting food items 💩', error: err
    })
  }
})

// GET a specific food items by name 🍒
router.get('/:id', validateFoodItem, async (req, res) => {
  const { id } = req.params
  try {
    const [foodItem] = await db.select('*').from('food-items').where({ id })
    if (foodItem) {
      res.status(200).json(foodItem)
    } else {
      res.status(404).json({
        message: 'Could not find the specified food item in database 🤷‍'
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Error retrieving the requested info from database 💩', error: err
    })
  }
})

// POST a new food item 🚼
router.post('/', validateFoodItemContent, async (req, res) => {
  const foodData = req.body
  try {
    const foodItem = await db('food-items').insert(foodData)
    if (foodItem) {
      res.status(201).json(foodItem)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Could not add the food item to the database 💩',
      error: err
    })
  }
})

// DELETE specific food item ☠️
router.delete('/:id', validateFoodItem, async (req, res) => {
  const { id } = req.params
  const food = req.body
  try {
    const count = await db('food-items').where('id', '=', id).del(food)
    if (count > 0) {
      res.status(200).json({
        message: 'The food item has been erased from database ☠️'
      })
    } else {
      res.status(404).json({
        message: 'The food item you are trying to delete could not be found 🤷‍'
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Could not erase food item from database 💩'
    })
  }
})

// PUT to update an existing action in your chosen project 👨‍💻
router.put('/:id', validateFoodItemContent, async (req, res) => {
  const { id } = req.params
  const changes = req.body
  try {
    const count = await db('food-items').where('id', '=', id).update(changes)
    if (count) {
      res.status(200).json(count)
    } else {
      res.status(400).json({
        message: 'Could not update the food item 🤷‍'
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Could not reach the database 💩',
      error: err
    })
  }
})

/* 🔥 Custom middleware 🔥 */

// Validates the food items of your /GET request 🍅
function validateFood(req, res, next) {
  try {
    const food = req.body
    if (food) {
      console.log('Food validation success')
      next()
    } else {
      res.status(400).json({
        message: 'Validation failure 🤷‍'
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Could not /GET request 💩',
      error: err
    })
  }
}

// Validates the ID of your /GET request 🆔
async function validateFoodItem(req, res, next) {
  try {
    const { id } = req.params
    const foodItem = await db.select('*').from('food-items').where({ id })
    if (foodItem) {
      console.log('Food Item validation success')
      req.foodItem = foodItem
      next()
    } else {
      res.status(404).json({
        message: 'The food item you are looking for could not be found 🤷‍'
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Could not /GET your ID request 💩',
      error: err
    })
  }
}

/* Validates you have entered correct inputs for your
/PUT and /POST requests 👓 */
function validateFoodItemContent(req, res, next) {
  try {
    const foodItem = req.body
    if (foodItem.food_id || foodItem.food_item || foodItem.serving_size
      || foodItem.serving_unit || foodItem.calories || foodItem.fats_grams
      || foodItem.protein_grams || foodItem.carbs_grams) {
      console.log('Content validation success')
      next()
    } else {
      res.status(400).json({
        message: 'You are missing a field. Food name, serving size, serving unit, calories, fats (grams), protein (grams), and carbs (grams) fields are required 🤷‍'
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Your request was not processed 💩',
      error: err
    })
  }
}

module.exports = router