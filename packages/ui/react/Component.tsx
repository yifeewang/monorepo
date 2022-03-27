import React from 'react'
import { useState } from 'react'
import { map } from 'lodash-es'

const Component: React.FC<{}> = () => {
  const [count, setCount] = useState<number>(0)
  console.log('comming Component')
  return (
    <div>
      <p>count: {count}</p>
      <p>{map([1, 2, 3, 4])}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Addaa</button>
    </div>
  )
}

export default React.memo(Component)
