import Tooltip from '../components/UI/Tooltip.js'
import Modal from '../components/UI/Modal.js'

import DropMenu, { ItemMenu, Item } from '../components/UI/ItemMenu.js'

const Menu = <ItemMenu text="hello world">
  <Item redirect="#asd">asd</Item>
</ItemMenu>

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
          <Modal
            type="image"
            image="https://i.imgur.com/bgqfx8U.png"
          >
            <button onClick={() => {
              console.log('show modal')
            }}>modal</button>
          </Modal>
        </div>
        
        <div className="grid p-y-2">
          <Tooltip text="hello world">
            <button>tooltip</button>
          </Tooltip>
          <Tooltip text="hello world">
            <button>tooltip</button>
          </Tooltip>
        </div>
        
        <div className="grid p-y-2">
          <DropMenu menu={Menu}>
            <button>itemmenu</button>
          </DropMenu>
        </div>
      </div>
    </div>
  )
}