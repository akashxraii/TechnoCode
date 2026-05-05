const express = require('express')
const router = express.Router()
const pool = require('../db/index')
const auth = require('../middleware/auth')

// Get all problems
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, difficulty, tags FROM problems ORDER BY id ASC'
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get single problem by id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM problems WHERE id = $1', [req.params.id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Problem not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Create a problem (protected - admin only later)
router.post('/', auth, async (req, res) => {
  const { title, description, difficulty, tags, time_limit, memory_limit } = req.body

  if (!title || !description || !difficulty) {
    return res.status(400).json({ error: 'Title, description and difficulty are required' })
  }

  try {
    const result = await pool.query(
      'INSERT INTO problems (title, description, difficulty, tags, time_limit, memory_limit) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, difficulty, tags, time_limit || 1000, memory_limit || 128]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router

// Add test cases to a problem
router.post('/:id/testcases', auth, async (req, res) => {
  const { testcases } = req.body

  if (!testcases || !Array.isArray(testcases)) {
    return res.status(400).json({ error: 'testcases must be an array' })
  }

  try {
    const inserted = []
    for (const tc of testcases) {
      const result = await pool.query(
        'INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES ($1, $2, $3, $4) RETURNING *',
        [req.params.id, tc.input, tc.expected_output, tc.is_sample || false]
      )
      inserted.push(result.rows[0])
    }
    res.status(201).json(inserted)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get test cases for a problem (sample only)
router.get('/:id/testcases', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM test_cases WHERE problem_id = $1 AND is_sample = true',
      [req.params.id]
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})