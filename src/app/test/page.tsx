'use client'

import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(1);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    console.log('1-------------')
    setCalculation(() => count * 2);
    console.log('2-------------')
  }, [count]); // <- add the count variable here

  return (
    <>
      {console.log('3-------------')}
      <p>Count: {count}</p>
      <button style={{backgroundColor: 'red'}} onClick={
        () => {
          setCount((sum) => {
            console.log(`------ sum : ${sum} ------`)
            return sum + 1
          })}}>+</button>
      <p>Calculation: {calculation}</p>
      {console.log('4-------------')}
    </>
  );
}
