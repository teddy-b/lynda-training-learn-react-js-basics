import React from 'react'
import ReactDOM from 'react-dom'
import Board from './Board'
import { notesCount } from './constants'

ReactDOM.render(
  <Board count={notesCount} />,
  document.getElementById('react-container')
)
