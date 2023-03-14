import React, { useRef } from 'react'

const getRoot = () => {
	const res = document.getElementById('modal-root')
	
	if (res) return res
	
	const root = document.createElement('div')
	root.setAttribute('id', 'modal-root')
	document.body.appendChild(root)
	
	return root
}

const Tooltip = props => {
	const root = useRef(getRoot())
	
	const [open, setOpen] = useState(false)
	
	return ReactDOM.createPortal(
		<>
			{open && <div className={classNames('modal', `modal-${props.type}`)}>
				{props.children}
			</div>}
		</>,
		root.current
	)
}

Tooltip.defaultProps = {
	
}

Tooltip.propTypes = {
	
}

export default Tooltip