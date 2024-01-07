'use client'

function registMouseEvent(showMsg: (value : number) => void) {
  let value = 1;
  console.log('1-------');
  return {
      onClick: (e : React.MouseEvent<Element, MouseEvent>) => {
        console.log('2-------');
          showMsg(value);
      },
  };
}

export default function App() {
  return (
    <div
      {...registMouseEvent((value: number) => alert(`click : ${value}`))}
    >
      Test: function - aaa
      
    </div>
  )
}