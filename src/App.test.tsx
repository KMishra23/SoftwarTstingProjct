import '@testing-library/jest-dom'
import { cleanup, render, screen } from '@testing-library/react'
import { te } from 'date-fns/locale'
import React from 'react'

import App from './App'
import { Cell, CellProps } from './components/grid/Cell'
import { GAME_TITLE } from './constants/strings'

afterEach(cleanup)

const cellProps: CellProps = {
  value: 'A',
  status: 'present',
  isRevealing: false,
  isCompleted: false,
  position: 0,
}

const cellFalseProps: CellProps = {
  // value: 'A',
  status: 'absent',
  isRevealing: false,
  isCompleted: false,
  position: 0,
}

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
})

test('renders App component', () => {
  render(<App />)
  const linkElement = screen.getByText(GAME_TITLE)
  expect(linkElement).toBeInTheDocument()
})

test('renders Cell component without crashing', () => {
  render(<Cell {...cellProps} />)
})

test('renders Cell component correctly with default attributes', () => {
  const { container } = render(<Cell {...cellProps} />)

  const text = screen.getByText('A')
  expect(text).toBeInTheDocument()

  //checks if div has attribute present present
  const mainDiv = container.querySelector('div')
  expect(mainDiv).toHaveClass('present')
})

test('renders Cell component correctly with absent status', () => {
  const { container } = render(<Cell {...cellFalseProps} />)

  // const text = screen.getByText('A')
  // expect(text).toBeInTheDocument()

  //checks if div has attribute absent
  const mainDiv = container.querySelector('div')
  expect(mainDiv).toHaveClass('absent')
})

test('renders Cell component correctly with correct status', () => {
  const { container } = render(<Cell {...cellProps} status="correct" />)

  const mainDiv = container.querySelector('div')
  expect(mainDiv).toHaveClass('correct')
})

// test('renders Cell component to not render correct status without value present', () => {
//   const { container } = render(
//     <Cell {...cellProps} value="" status="correct" />
//   )

//   const mainDiv = container.querySelector('div')
//   expect(mainDiv).not.toHaveClass('correct')
// })
