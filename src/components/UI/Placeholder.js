import React from 'react'
import PropTypes from 'prop-types'

const Placeholder = props => {
	const {
		color = '#d8dcdf',
		fill = false, // 100% width and height
		rowHeight = 15, // recommended to set as the font size
		//rows = 1, //TODO
		shape = 'box', // box || circle
		//spacing = 8, //TODO
		unit = 'px', // length unit to use
		//visible = true,
	} = props
	
	return <div className="placeholder" style={{
		backgroundColor: color,
		width: '100%',
		height: fill ? '100%' : rowHeight + unit,
		borderRadius: shape !== 'box' ? (shape === 'circle' && '100%') || shape : null,
		paddingTop: this.props.equalHeight && '100%'
	}} />
}

Placeholder.propTypes = {
	className: PropTypes.string,
	color: PropTypes.string.isRequired,
	equalHeight: PropTypes.bool,
	fill: PropTypes.bool.isRequired,
	rowHeight: PropTypes.number.isRequired,
	rows: PropTypes.number.isRequired,
	shape: PropTypes.string.isRequired,
	spacing: PropTypes.number.isRequired,
	unit: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired
}

export default Placeholder