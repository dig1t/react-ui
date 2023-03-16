import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TOOLTIP_OFFSET = 10

const getDOMRoot = () => {
	const res = document.getElementById('tooltip-root')
	
	if (res) return res
	
	const root = document.createElement('div')
	root.setAttribute('id', 'tooltip-root')
	document.body.appendChild(root)
	
	return root
}

const Tooltip = (props, ref) => {
	const root = useRef()
	const tooltipElement = useRef()
	const [nubPosition, setNubPosition] = useState('top')
	const [pos, setPos] = useState({ x: 0, y: 0 })
	
	useEffect(() => {
		root.current = getDOMRoot()
		
		if (!tooltipElement.current || !props.parentRef.current) return
		
		const parentRect = props.parentRef.current.getBoundingClientRect()
		
		const width = tooltipElement.current.offsetWidth
		const height = tooltipElement.current.offsetHeight
		
		let x = parentRect.left + (parentRect.width / 2) - (width / 2)
		let y = parentRect.top - height - TOOLTIP_OFFSET
		let newNubPosition = 'bottom'
		
		if (y < 0) {
			y = parentRect.top + parentRect.height + TOOLTIP_OFFSET
			x = (parentRect.left + (parentRect.width / 2)) - (width / 2)
			newNubPosition = 'top'
		}
		
		if (x > window.innerWidth || tooltipElement.current.offsetWidth + x > window.innerWidth) {
			x = parentRect.left - width - TOOLTIP_OFFSET
			y = parentRect.top - (height / 2) + (parentRect.height / 2)
			newNubPosition = 'right'
		}
		
		if (x < 0 || tooltipElement.current.offsetWidth + x > window.innerWidth) {
			x = parentRect.left + parentRect.width + TOOLTIP_OFFSET
			y = parentRect.top - (height / 2) + (parentRect.height / 2)
			newNubPosition = 'left'
		}
		
		setPos({ x, y })
		setNubPosition(newNubPosition)
	}, [props, tooltipElement, ref])
	
	return root.current !== undefined && props.open ? ReactDOM.createPortal(
		<div
			ref={tooltipElement}
			className={classNames('tooltip', nubPosition)}
			style={{ left: pos.x, top: pos.y }}
		>
			<div className="nub" />
			<span>{props.text}</span>
		</div>,
		root.current
	) : <></>
}

Tooltip.propTypes = {
	open: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	parentRef: PropTypes.object.isRequired,
	position: PropTypes.number
}

const TooltipWrap = props => {
	if (props.inlineTrigger === false && typeof props.open !== Boolean) {
		throw new Error('TooltipWrap - Custom triggers must include an "open" prop')
	}
	
	const [open, setOpen] = useState(false)
	const ref = useRef()
	
	return props.inlineTrigger ? <span
		ref={ref}
		
		onMouseEnter={() => {
			setOpen(true)
		}}
		
		onMouseLeave={() => {
			setOpen(false)
		}}
	>
		<Tooltip
			{...props}
			parentRef={ref}
			open={open}
		/>
		{props.children}
	</span> : props.children
}

TooltipWrap.defaultProps = {
	inlineTrigger: true
}

TooltipWrap.propTypes = {
	component: PropTypes.func,
	text: PropTypes.string.isRequired
}

export default TooltipWrap