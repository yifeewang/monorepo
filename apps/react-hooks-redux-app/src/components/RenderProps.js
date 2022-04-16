import React from 'react'
import PropTypes from 'prop-types'

const Container = props => {
    console.log('Container', props)
    const params = {
        name: 'wyf',
        age: '18'
    }
  return (
    props.children(params)
  )
}

const Children = props => {
    console.log('Children', props)
    return (
      <div>
          <div>name: {props.name}</div>
          <div>age: {props.age}</div>
          <div>book: {props.book}</div>
      </div>
    )
  }

export {
    Children,
    Container
}