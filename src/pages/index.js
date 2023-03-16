import Tooltip from '@/components/UI/Tooltip.js'
import Modal from '../components/UI/Modal.js'

export default function Home() {
  
  return (
    <div className="center-wrap">
      <div
        className="grid"
        style={{
          width: '40vw'
        }}
      >
        <div className="grid p-y-2">
          <button onClick={() => {
            console.log('show tooltip')
          }}>tooltip</button>
          
          <button
            onMouseEnter={() => {
              console.log('show tooltip on hover')
            }}
            onMouseLeave={() => {
              console.log('hide tooltip on leave')
            }}
          >hover tooltip</button>
        </div>
        
        <div className="grid p-y-2">
          <Modal
            type="image"
            image="https://i.imgur.com/bgqfx8U.png"
          >
            <button onClick={() => {
              console.log('show modal')
            }}>modal</button>
          </Modal>
        </div>
        
        <Tooltip text="hello world">
          <button>tooltip</button>
        </Tooltip>
        <Tooltip text="hello world">
          <button>tooltip</button>
        </Tooltip>
      </div>
    </div>
  )
}