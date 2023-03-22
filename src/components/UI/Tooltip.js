import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Portal from './Portal.js'

const Tooltip = (props, ref) => {
	const tooltipElement = useRef()
	const [nubPosition, setNubPosition] = useState(props.position)
	const [pos, setPos] = useState({ x: 0, y: 0 })
	
	useEffect(() => {
		if (!tooltipElement.current || !props.parentRef.current) return
		
		const parentRect = props.parentRef.current.getBoundingClientRect()
		
		const width = tooltipElement.current.offsetWidth
		const height = tooltipElement.current.offsetHeight
		
		let x = parentRect.left + (parentRect.width / 2) - (width / 2)
		let y = parentRect.top - height - props.offset
		setNubPosition('bottom')
		
		if (props.position === 'bottom' || (!props.position && y < 0)) {
			y = parentRect.top + parentRect.height + props.offset
			x = (parentRect.left + (parentRect.width / 2)) - (width / 2)
			setNubPosition('top')
		}
		
		if (props.position === 'left' || (!props.position && (
			x > window.innerWidth || tooltipElement.current.offsetWidth + x > window.innerWidth
		))) {
			x = parentRect.left - width - props.offset
			y = parentRect.top - (height / 2) + (parentRect.height / 2)
			setNubPosition('right')
		}
		
		if (props.position === 'right' || (!props.position && (
			x < 0 || tooltipElement.current.offsetWidth + x > window.innerWidth
		))) {
			x = parentRect.left + parentRect.width + props.offset
			y = parentRect.top - (height / 2) + (parentRect.height / 2)
			setNubPosition('left')
		}
		
		setPos({ x, y })
	}, [props, tooltipElement, ref])
	
	return <Portal>
		{props.open && <div
			ref={tooltipElement}
			className={classNames('tooltip', nubPosition)}
			style={{ left: pos.x, top: pos.y }}
		>
			<div className="nub" />
			<span>{props.text}</span>
		</div>}
	</Portal>
}

Tooltip.defaultProps = {
	offset: 10
}

Tooltip.propTypes = {
	open: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	parentRef: PropTypes.object.isRequired,
	position: PropTypes.string,
	offset: PropTypes.number
}

const TooltipWrap = props => {
	if (props.inlineTrigger === false && typeof props.open !== Boolean) {
		throw new Error('TooltipWrap - Custom triggers must include an "open" prop')
	}
	
	const [open, setOpen] = useState(false)
	const ref = useRef()
	
	return props.inlineTrigger ? <span
		ref={ref}
		onMouseEnter={() => setOpen(true)}
		onMouseLeave={() => setOpen(false)}
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