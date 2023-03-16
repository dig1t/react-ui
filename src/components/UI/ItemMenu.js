import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TOOLTIP_OFFSET = 10

const ItemMenu = props => {
	return <ul>{props.children}</ul>
}

const Item = props => {
	return <li>{props.children}</li>
}

const getDOMRoot = () => {
	const res = document.getElementById('ui-root')
	
	if (res) return res
	
	const root = document.createElement('div')
	root.setAttribute('id', 'ui-root')
	document.body.appendChild(root)
	
	return root
}

const Menu = (props, ref) => {
	const root = useRef()
	const menuElement = useRef()
	const [position, setPosition] = useState('top')
	const [pos, setPos] = useState({ x: 0, y: 0 })
	
	useEffect(() => {
		root.current = getDOMRoot()
		
		if (!menuElement.current || !props.parentRef.current) return
		
		const parentRect = props.parentRef.current.getBoundingClientRect()
		
		const width = menuElement.current.offsetWidth
		const height = menuElement.current.offsetHeight
		
		let x = parentRect.left + (parentRect.width / 2) - (width / 2)
		let y = parentRect.top - height - TOOLTIP_OFFSET
		let newPosition = 'bottom'
		
		if (y < 0) {
			y = parentRect.top + parentRect.height + TOOLTIP_OFFSET
			x = (parentRect.left + (parentRect.width / 2)) - (width / 2)
			newPosition = 'top'
		}
		
		if (x > window.innerWidth || menuElement.current.offsetWidth + x > window.innerWidth) {
			x = parentRect.left - width - TOOLTIP_OFFSET
			y = parentRect.top - (height / 2) + (parentRect.height / 2)
			newPosition = 'right'
		}
		
		if (x < 0 || menuElement.current.offsetWidth + x > window.innerWidth) {
			x = parentRect.left + parentRect.width + TOOLTIP_OFFSET
			y = parentRect.top - (height / 2) + (parentRect.height / 2)
			newPosition = 'left'
		}
		
		setPos({ x, y })
		setPosition(newPosition)
	}, [props, menuElement, ref])
	
	return root.current !== undefined ? ReactDOM.createPortal(
		<div
			ref={menuElement}
			className={classNames('drop-menu', position)}
			style={{ left: pos.x, top: pos.y }}
		>
			<div className="nub" />
			<span>{props.text}</span>
		</div>,
		root.current
	) : <></>
}

Menu.propTypes = {
	open: PropTypes.bool.isRequired,
	menu: PropTypes.object.isRequired,
	parentRef: PropTypes.object.isRequired,
	position: PropTypes.number
}

const DropMenu = props => {
	if (props.inlineTrigger === false && typeof props.open !== Boolean) {
		throw new Error('TooltipWrap - Custom triggers must include an "open" prop')
	}
	
	const [open, setOpen] = useState(false)
	const ref = useRef()
	
	return <span
		ref={ref}
		
		onClick={() => setOpen(true)}
	>
		<Menu
			{...props}
			parentRef={ref}
			open={open}
		/>
		{props.children}
	</span>
}

DropMenu.defaultProps = {
	inlineTrigger: true
}

DropMenu.propTypes = {
	component: PropTypes.func
}

export { ItemMenu, Item }
export default DropMenu