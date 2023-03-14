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

const ModalPortal = props => {
	const root = useRef(null)
	const [open, setOpen] = useState(false)
	
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
	
	return root.current !== null ? ReactDOM.createPortal(
		<>
			{open && <div className={classNames('modal', `modal-${props.type}`)}>
				<div className="background-close" onClick={this.props.toggleModal} />
				<button className="close fas fa-times" onClick={this.props.toggleModal} />
				<div className="align">
					<div className="container">
						<div className="main">
							{ this.getHeader() }
							<div className="content">{content}</div>
							{ this.getFooter() }
						</div>
					</div>
				</div>
			</div>}
		</>,
		root.current
	) : <></>
}

const Modal = props => {
	const [open, setOpen] = useState(false)
	
	return <div
		className="modal-btn"
		onClick={() => setOpen(!open)}
	>
		<ModalPortal
			{...props} open={open}
		/>
		{props.children}
	</div>
}

Modal.defaultProps = {
	open: false
}

Modal.propTypes = {
	type: PropTypes.string.isRequired,
	component: PropTypes.func
}

export default Modal