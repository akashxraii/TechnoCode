const express = require('express')
const router = express.Router()
const pool = require('../db/index')
const auth = require('../middleware/auth')
const { Queue } = require('bullmq')

const submissionQueue = new Queue('submissions', {
  connection: {
    host: '127.0.0.1',
    port: 6379,
  },
})

// Submit code
router.post('/', auth, async (req, res) => {
  const { problem_id, language, code } = req.body

  if (!problem_id || !language || !code) {
    return res.status(400).json({ error: 'problem_id, language and code are required' })
  }

  const supportedLanguages = ['python', 'javascript', 'java']
  if (!supportedLanguages.includes(language)) {
    return res.status(400).json({ error: 'Supported languages: python, javascript, java' })
  }

  try {
    // Fetch all test cases for this problem
    const testCases = await pool.query(
      'SELECT input, expected_output FROM test_cases WHERE problem_id = $1',
      [problem_id]
    )

    if (testCases.rows.length === 0) {
      return res.status(400).json({ error: 'No test cases found for this problem' })
    }

    // Save submission to DB with pending status
    const result = await pool.query(
      'INSERT INTO submissions (user_id, problem_id, language, code, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, problem_id, language, code, 'pending']
    )

    const submission = result.rows[0]

    // Push job to Redis queue
    await submissionQueue.add('judge', {
      submissionId: submission.id,
      language,
      code,
      testCases: testCases.rows,
    })

    res.status(201).json(submission)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Get all submissions for logged in user
router.get('/my', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT s.id, s.problem_id, p.title, s.language, s.status, s.runtime, s.created_at
       FROM submissions s
       JOIN problems p ON s.problem_id = p.id
       WHERE s.user_id = $1
       ORDER BY s.created_at DESC`,
      [req.user.id]
    )
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get single submission by id
router.get('/:id', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM submissions WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Submission not found' })
    }
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router