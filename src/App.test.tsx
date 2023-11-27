import '@testing-library/jest-dom'
import {
  cleanup,
  getByPlaceholderText,
  render,
  screen,
} from '@testing-library/react'
import { sub } from 'date-fns'
import { te } from 'date-fns/locale'
import React from 'react'
import { Simulate } from 'react-dom/test-utils'

import App from './App'
import { Cell, CellProps } from './components/grid/Cell'
import { Grid, GridProps } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { GAME_TITLE } from './constants/strings'
import { getGuessStatuses } from './lib/statuses'

afterEach(cleanup)

const onCharMock = jest.fn()
const onDeleteMock = jest.fn()
const onEnterMock = jest.fn()

const keyboardProps = {
  onChar: onCharMock,
  onDelete: onDeleteMock,
  onEnter: onEnterMock,
  solution: 'ABCDE',
  guesses: [],
}

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

test('Integration: Clicking a key on the onscreen keyboard', () => {
  const { getByText, getByLabelText, getByTestId, container } = render(<App />)
  // console.log(container)
  const GridDiv = container.querySelector('div')
  Simulate.click(getByText('Z'))
  const t = screen.getAllByText('Z')
  for (let i = 0; i < t.length; i++) {
    expect(t[i]).toBeInTheDocument()
  }
})

test('Integration: Clicking all 5 keys on the onscreen keyboard', () => {
  const { getByText, getByLabelText, getByTestId, container } = render(<App />)
  const GridDiv = container.querySelector('div')
  const it1 = screen.getAllByText('Z')
  const it2 = screen.getAllByText('X')
  const it3 = screen.getAllByText('C')
  const it4 = screen.getAllByText('V')
  const it5 = screen.getAllByText('S')
  Simulate.click(getByText('Z'))
  Simulate.click(getByText('X'))
  Simulate.click(getByText('C'))
  Simulate.click(getByText('V'))
  Simulate.click(getByText('S'))
  const t1 = screen.getAllByText('Z')
  const t2 = screen.getAllByText('X')
  const t3 = screen.getAllByText('C')
  const t4 = screen.getAllByText('V')
  const t5 = screen.getAllByText('S')
  for (let i = 0; i < t1.length; i++) {
    expect(t1[i]).toBeInTheDocument()
  }
  for (let i = 0; i < t2.length; i++) {
    expect(t2[i]).toBeInTheDocument()
  }
  for (let i = 0; i < t3.length; i++) {
    expect(t3[i]).toBeInTheDocument()
  }
  for (let i = 0; i < t4.length; i++) {
    expect(t4[i]).toBeInTheDocument()
  }
  for (let i = 0; i < t5.length; i++) {
    expect(t5[i]).toBeInTheDocument()
  }
  expect(t1.length - it1.length).toBe(1)
  expect(t2.length - it2.length).toBe(1)
  expect(t3.length - it3.length).toBe(1)
  expect(t4.length - it4.length).toBe(1)
  expect(t5.length - it5.length).toBe(1)
})

test('Integration: Clicking all 5 keys on the onscreen keyboard and validating response', () => {
  const { getByText, getByLabelText, getByTestId, container } = render(<App />)
  // console.log(container.querySelector(''))
})

test('CIM: grid renders all inputted letters correctly ', () => {
  const { container } = render(<Grid {...fullGridProps} />)
  // const completedRow = container.querySelector('CompletedRow')
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
  for (let i = 0; i < text2.length; i++) {
    expect(text2[i]).toBeInTheDocument()
  }
  for (let i = 0; i < text3.length; i++) {
    expect(text3[i]).toBeInTheDocument()
  }
  for (let i = 0; i < text4.length; i++) {
    expect(text4[i]).toBeInTheDocument()
  }
})

test('CIM: registers existing inputs appropriately and generates letters on screen', () => {
  const { container } = render(<Grid {...fullGridProps} currentGuess="Z" />)
  const completedRow = container.querySelector('CompletedRow')
  const text = screen.getByText('Z')
  expect(text).toBeInTheDocument()
})

test('Integration: renders App component', () => {
  render(<App />)
  const linkElement = screen.getByText(GAME_TITLE)
  expect(linkElement).toBeInTheDocument()
})

test('CIM: renders Cell component without crashing', () => {
  render(<Cell {...cellProps} />)
})

test('CIM: renders Cell component correctly with default attributes', () => {
  const { container } = render(<Cell {...cellProps} />)

  const text = screen.getByText('A')
  expect(text).toBeInTheDocument()

  //checks if div has attribute present present
  const mainDiv = container.querySelector('div')
  expect(mainDiv).toHaveClass('present')
})

test('CIM: renders Cell component correctly with absent status', () => {
  const { container } = render(<Cell {...cellFalseProps} />)

  //checks if div has attribute absent
  const mainDiv = container.querySelector('div')
  expect(mainDiv).toHaveClass('absent')
})

test('CIM: renders Cell component correctly with correct status', () => {
  const { container } = render(<Cell {...cellProps} status="correct" />)

  const mainDiv = container.querySelector('div')
  expect(mainDiv).toHaveClass('correct')
})

const mockSolutionGetter = jest.fn()

beforeEach(() => {
  jest.mock('./lib/words', () => ({
    ...jest.requireActual('./lib/words'),
    get solution() {
      return mockSolutionGetter()
    },
  }))
})

describe('getGuessStatuses', () => {
  test('CIM: guess statuses', () => {
    expect(getGuessStatuses('ABCDE', 'EDCBA')).toEqual([
      'present',
      'present',
      'correct',
      'present',
      'present',
    ])
    expect(getGuessStatuses('ABCDE', 'VWXYZ')).toEqual([
      'absent',
      'absent',
      'absent',
      'absent',
      'absent',
    ])
    expect(getGuessStatuses('ABCDE', 'ABCDE')).toEqual([
      'correct',
      'correct',
      'correct',
      'correct',
      'correct',
    ])

    expect(getGuessStatuses('BOSSY', 'SASSY')).toEqual([
      'absent',
      'absent',
      'correct',
      'correct',
      'correct',
    ])
  })
})
