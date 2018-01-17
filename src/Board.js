import React from 'react'
import PropTypes from 'prop-types'
import Note from './Note'
import { maxNotesCount, defaultNoteText, url } from './constants'
import './App.css'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = { notes: [] }
    this.nextId = this.nextId.bind(this)
    this.add = this.add.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
    this.eachNote = this.eachNote.bind(this)
  }

  componentWillMount() {
    if (this.props.count) {
      fetch(url)
        .then(results => results.json())
        .then(array => array[0])
        .then(text => text.split('. '))
        .then(array => array.forEach(sentence => this.add(sentence)))
        .catch(err => console.log('Could not connect to API', err))
    }
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }

  add(text) {
    const notes = [
      ...this.state.notes,
      {
        id: this.nextId(),
        note: text
      }
    ]

    this.setState({ notes })
  }

  update(newText, id) {
    const notes = this.state.notes.map(
      note => (note.id !== id) ?
      note :
      {
        ...note,
        note: newText
      }
    )
    
    this.setState({ notes })
  }

  remove(id) {
    const notes = this.state.notes.filter(note => note.id !== id)
    this.setState({ notes }) 
  }

  eachNote(note) {
    return (
      <Note key={note.id} id={note.id} onChange={this.update} onRemove={this.remove}>
        {note.note}
      </Note>
    )
  }

  render() {
    return (
      <div className='board'>
        {this.state.notes.map(this.eachNote)}
        <button onClick={() => this.add(defaultNoteText)}>+</button>
      </div>
    )
  }
}

Board.propTypes = {
  count: PropTypes.oneOf(Array.from({ length: maxNotesCount + 1 }, (v, i) => i))
}

export default Board
