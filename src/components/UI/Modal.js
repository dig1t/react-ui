import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Portal from './Portal.js'

const Modal = props => {
	const modalComponent = useMemo(() => {
		switch(props.type) {
			case 'image': {
				// eslint-disable-next-line @next/next/no-img-element
				return <img src={props.image} alt={props.imgAlt} />
			}
		}
	}, [props])
	
	return <Portal>
		{props.open && <div
			className={classNames('modal', `modal-${props.type}`)}
		>
			<div
				className="background-close"
				role="button"
				onClick={input => props.toggleModal(input)}
			/>
			<button
				className="close fas fa-times"
				onClick={input => props.toggleModal(input)}
			/>
			<div className="center-wrap">
				<div className="container">
					<div className="main">
						<div className="content">{modalComponent}</div>
					</div>
				</div>
			</div>
		</div>}
	</Portal>
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
	
	return props.inlineTrigger ? <>
		<Modal
			{...props}
			toggleModal={input => {
				input.preventDefault()
				input.stopPropagation()
				
				setOpen(!open)
			}}
			open={open}
		/>
		<span onClick={() => setOpen(true)} >{props.children}</span>
	</> : props.children
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