import '@testing-library/jest-dom/extend-expect'
import { cleanup, render, screen } from '@testing-library/react'
import { te } from 'date-fns/locale'
import React from 'react'

import App from './App'
import { Cell, CellProps } from './components/grid/Cell'
import { Grid, GridProps } from './components/grid/Grid'
import { GAME_TITLE } from './constants/strings'
import { getGuessStatuses } from './lib/statuses'

afterEach(cleanup)

const emptyGridProps: GridProps = {
  solution: 'ABCDE',
  guesses: [],
  currentGuess: '',
  isRevealing: false,
  currentRowClassName: '',
}

const fullGridProps: GridProps = {
  solution: 'ABCDE',
  guesses: [],
  currentGuess: 'SXCVS',
  isRevealing: false,
  currentRowClassName: '',
}

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

test('grid renders all inputted letters correctly ', () => {
  const { container } = render(<Grid {...fullGridProps} />)
  const completedRow = container.querySelector('CompletedRow')
  const text1 = screen.getAllByText('S')
  const text2 = screen.getAllByText('X')
  const text3 = screen.getAllByText('C')
  const text4 = screen.getAllByText('V')
  // console.log(text1)
  // const text5 = screen.getAllByText('S')
  for (let i = 0; i < text1.length; i++) {
    expect(text1[i]).toBeInTheDocument()
  }
  // expect(text1).toBeInTheDocument()
  expect(text2).toBeInTheDocument()
  expect(text3).toBeInTheDocument()
  expect(text4).toBeInTheDocument()
  // expect(text5).toBeInTheDocument()
})

test('registers existing inputs appropriately and generates letters on screen', () => {
  const { container } = render(<Grid {...fullGridProps} currentGuess="Z" />)
  const completedRow = container.querySelector('CompletedRow')
  const text = screen.getByText('Z')
  expect(text).toBeInTheDocument()
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

  //checks if div has attribute absent
  const mainDiv = container.querySelector('div')
  expect(mainDiv).toHaveClass('absent')
})

test('renders Cell component correctly with correct status', () => {
  const { container } = render(<Cell {...cellProps} status="correct" />)

  const mainDiv = container.querySelector('div')
  expect(mainDiv).toHaveClass('correct')
})

// test('renders Cell component with correct status', () => {
//   const { container } = render(
//     <Cell {...cellProps} value="" status="correct" />
//   )

//   const mainDiv = container.querySelector('div')
//   expect(mainDiv).not.toHaveClass('correct')
// })

const mockSolutionGetter = jest.fn()

beforeEach(() => {
  jest.mock('./lib/words', () => ({
    ...jest.requireActual('./lib/words'),
    get solution() {
      return mockSolutionGetter()
    },
  }))
})

// describe('getGuessStatuses', () => {
//   test('guess statuses', () => {
//     expect(getGuessStatuses('ABCDE', 'EDCBA')).toEqual([
//       'present',
//       'present',
//       'correct',
//       'present',
//       'present',
//     ])
//     expect(getGuessStatuses('ABCDE', 'VWXYZ')).toEqual([
//       'absent',
//       'absent',
//       'absent',
//       'absent',
//       'absent',
//     ])
//     expect(getGuessStatuses('ABCDE', 'ABCDE')).toEqual([
//       'correct',
//       'correct',
//       'correct',
//       'correct',
//       'correct',
//     ])

//     expect(getGuessStatuses('BOSSY', 'SASSY')).toEqual([
//       'absent',
//       'absent',
//       'correct',
//       'correct',
//       'correct',
//     ])
//   })
// })
