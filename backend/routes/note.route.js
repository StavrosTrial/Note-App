const express = require('express');
const router = express.Router();
const { getNotes, getNote, createNote, updateNote, deleteNote } = require('../controllers/note.controller.js');

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;