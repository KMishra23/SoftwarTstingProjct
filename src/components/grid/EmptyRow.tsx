import { solution } from '../../lib/words'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const emptyCells = Array.from(Array(solution.length))

  return (
    <div role="emptyRow" className="mb-1 flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
