import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const getDOMRoot = () => {
	const res = document.getElementById('modal-root')
	
	if (res) return res
	
	const root = document.createElement('div')
	root.setAttribute('id', 'modal-root')
	document.body.appendChild(root)
	
	return root
}

const Modal = props => {
	const root = useRef(null)
	
	useEffect(() => {
		// Mounted
		root.current = getDOMRoot()
	}, [])
	
	const modalComponent = useMemo(() => {
		switch(props.type) {
			case 'image': {
				// eslint-disable-next-line @next/next/no-img-element
				return <img src={props.image} alt={props.imgAlt} />
			}
		}
	}, [props])
	
	
	return root.current !== null && props.open ? ReactDOM.createPortal(
		<div
			className={classNames(
				'modal',
				`modal-${props.type}`
			)}
		>
			<div className="background-close" onClick={input => {
				console.log(input)
				props.toggleModal()
			}} />
			<button className="close fas fa-times" onClick={props.toggleModal} />
			<div className="align">
				<div className="container">
					<div className="main">
						<div className="content">{modalComponent}</div>
					</div>
				</div>
			</div>
		</div>,
		root.current
	) : <></>
}

Modal.propTypes = {
	open: PropTypes.bool.isRequired,
	toggleModal: PropTypes.func.isRequired
}

const ModalWrap = props => {
	if (props.inlineTrigger === false && typeof props.open !== Boolean) {
		throw new Error('ModalWrap - Custom triggers must include an "open" prop')
	}
	
	const [open, setOpen] = useState(false)
	
	return props.inlineTrigger ? <span
		onClick={() => setOpen(prevState => {
			return !prevState
		})}
	>
		<Modal
			toggleModal={() => setOpen(!open)}
			{...props}
			open={open}
		/>
		{props.children}
	</span> : props.children
}

ModalWrap.defaultProps = {
	inlineTrigger: true
}

ModalWrap.propTypes = {
	type: PropTypes.string.isRequired,
	component: PropTypes.func,
	inlineTrigger: PropTypes.bool
}

export { Modal }
export default ModalWrap