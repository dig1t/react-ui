import Tooltip from '../components/UI/Tooltip.js'
import Modal from '../components/UI/Modal.js'

import DropMenu, { ItemMenu, Item, ItemDivider } from '../components/UI/ItemMenu.js'

const Menu = <ItemMenu>
  <Item link="#asd">asd</Item>
  <ItemDivider />
  <Item link="#logout">Logout</Item>
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
            <button>modal</button>
          </Modal>
        </div>
        
        <div className="grid p-y-2">
          <Tooltip text="hello world">
            <button>tooltip</button>
          </Tooltip>
          <Tooltip text="hello world" position="top">
            <button>tooltip top</button>
          </Tooltip>
          <Tooltip text="hello world" position="bottom">
            <button>tooltip bottom</button>
          </Tooltip>
          <Tooltip text="hello world" position="left">
            <button>tooltip left</button>
          </Tooltip>
          <Tooltip text="hello world" position="right">
            <button>tooltip right</button>
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