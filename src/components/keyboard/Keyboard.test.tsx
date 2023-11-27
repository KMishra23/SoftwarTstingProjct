import '@testing-library/jest-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { te } from 'date-fns/locale'
import { useEffect } from 'react'
import React from 'react'

import { getStatuses } from '../../lib/statuses'
import { localeAwareUpperCase } from '../../lib/words'
import { Key } from './Key'
import { Keyboard } from './Keyboard'

describe('Keyboard component', () => {
  const onCharMock = jest.fn()
  const onDeleteMock = jest.fn()
  const onEnterMock = jest.fn()

  const defaultProps = {
    onChar: onCharMock,
    onDelete: onDeleteMock,
    onEnter: onEnterMock,
    solution: 'SOLUTION_STRING',
    guesses: [],
  }

  it('CIM: renders the Keyboard component correctly', () => {
    const { container } = render(<Keyboard {...defaultProps} />)
    const text = screen.getByText('Q')
    expect(text).toBeInTheDocument()
    const text1 = screen.getByText('Enter')
    expect(text1).toBeInTheDocument()
    // Add more assertions as needed
  })

  it('CIM: fires onClick event for a key', () => {
    const { getByText } = render(<Keyboard {...defaultProps} />)
    const keyElement = getByText('A') // Replace 'A' with any key you want to test
    fireEvent.click(keyElement)
    expect(onCharMock).toHaveBeenCalledWith('A')
  })

  it('CIM: fires onDelete and onEnter events on keyboard events', () => {
    const { container } = render(<Keyboard {...defaultProps} />)
    fireEvent.keyUp(container, { key: 'Enter', code: 'Enter' })
    expect(onEnterMock).toHaveBeenCalledTimes(1)

    fireEvent.keyUp(container, { key: 'Backspace', code: 'Backspace' })
    expect(onDeleteMock).toHaveBeenCalledTimes(1)

    // Add more keyboard event simulations and assertions as needed
  })

  // Add more test cases to cover different scenarios and edge cases
})
