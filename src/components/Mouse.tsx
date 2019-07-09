import React, { useState } from 'react'

interface MouseState {
    x: number,
    y: number
}

const Lgtm: React.FC<{ mouse: MouseState }> = ({ mouse }) => (
    <img src="https://i.imgur.com/HtkD2Ut.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }}
         alt="lgtm"/>
)

const Mouse: React.FC<{ render: (state: MouseState) => any }> = ({ render }) => {

    const [x, setX] = useState(24)
    const [y, setY] = useState(200)

    return (
        <div style={{ height: '1200px', width: '1200px' }} onMouseMove={(event) => {
            setX(event.clientX)
            setY(event.clientY)
        }}>
            {render({ x, y })}
        </div>
    )
}

const MouseTracker = () => (
    <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
            <Lgtm mouse={mouse}/>
        )}/>
    </div>
)


export default MouseTracker