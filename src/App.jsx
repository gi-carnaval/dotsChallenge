import { useState } from 'react'
import './App.scss'

function App() {
  const [list, setList]  = useState([])
  const [undid, setUndid] = useState([])

  const handleClick = (x) => {
    const newDot = {
      clientX: x.pageX,
      clientY: x.pageY
    }
    console.log(newDot)
    setList(prev => [...prev, newDot])
  }

  const handleUndo = (x) => {
    x.stopPropagation()

    if(list.length === 0) {
      return
    }

    const lastItem = list[list.length - 1]
    setUndid(prev => [...prev, lastItem])

    setList((prev) => {
      const newList = [...prev].slice(0, -1)
      return newList;
    })
    console.log("list", list.slice(0, 1))
    
  }

  const handleRedo = (x) => {
    x.stopPropagation()
    
    if(undid.length === 0) {
      return
    }
    const recoveredItem = undid[undid.length - 1];
    setUndid((prev) => {
      const newList = [...prev].slice(0, -1)
      return newList;
    })
    setList((prev) => [...prev, recoveredItem])
  }
  const handleReset = (x) => {
    x.stopPropagation()
    setList([]);
    setUndid([]);
  }
  return (
    <div id="screen" onClick={handleClick}>
      <button onClick={handleUndo} className="undo" disabled={list.length === 0 ? true : false}>Desfazer</button>
      <button onClick={handleReset} className="reset">Recomeçar</button>
      <button onClick={handleRedo} className="redo" disabled={undid.length === 0 ? true : false}>Refazer</button>
      {list.map((item, index) => {
        return <span key={index} className="dot" style={{top: item.clientY, left: item.clientX}}></span>
      })}
    </div>
  )
}

export default App