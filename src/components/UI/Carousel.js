import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/* CAROUSEL CONFIG
** array data (required, min: 1, accepted types: image url, component)
** boolean auto (default: true) - automatically scroll through slides
** number interval (optional, default: 4000ms | 4s) - interval for slide scrolls
** boolean controls (optional, default: true) - show left/right controls
** TODO: boolean dotScroll (optional, default: true) - show circle buttons */
class Carousel extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			slides: {},
			slideIndex: 0,
			moving: false,
			isMounted: false
		}
		
		this.props.data.map((slideData, i) => {
			this.state.slides[i] = {
				left: false,
				right: false,
				previous: false,
				next: false,
				active: i === 0 ? true : false
			}
		})
	}
	
	componentDidMount() {
		this.setState({isMounted: true})
		
		// Server will keep the interval going on forever
		if (typeof window !== 'undefined' && this.props.auto) this.autoSlide = setInterval(() => {
			this.slide('right')
		}, this.props.interval)
		
		if (!this.props.data) {
			throw new Error('[Carousel] data not found')
		}
	}
	
	componentWillUnmount() {
		this.setState({isMounted: false})
		if (this.autoSlide) clearInterval(this.autoSlide)
	}
	
	toggleClassState(i, key) {
		this.setState(state => (state.slides[i][key] = !state.slides[i][key], state))
	}
	
	move(newIndex, direction) {
		if (this.state.moving || !this.state.isMounted) return
		
		const oldIndex = this.state.slideIndex // save old index before changing state
		
		this.setState({ moving: true, slideIndex: newIndex })
		
		if (direction === 'left') {
			// WHERE SLIDE IS GOING TO CHANGE TO
			
			this.toggleClassState(oldIndex, 'right')
			this.toggleClassState(newIndex, 'previous')
			
			setTimeout(() => {
				this.state.isMounted && this.toggleClassState(newIndex, 'right')
			}, 1)
			
			setTimeout(() => {
				if (this.state.isMounted) {
					this.toggleClassState(oldIndex, 'active')
					this.toggleClassState(oldIndex, 'right')
					this.toggleClassState(newIndex, 'active')
					this.toggleClassState(newIndex, 'previous')
					this.toggleClassState(newIndex, 'right')
					
					this.setState({ moving: false })
				}
			}, 800)
		} else if (direction === 'right') {
			this.toggleClassState(oldIndex, 'left')
			this.toggleClassState(newIndex, 'next')
			
			setTimeout(() => {
				this.state.isMounted && this.toggleClassState(newIndex, 'left')
			}, 1)
			
			setTimeout(() => {
				if (this.state.isMounted) {
					this.toggleClassState(oldIndex, 'active')
					this.toggleClassState(oldIndex, 'left')
					this.toggleClassState(newIndex, 'active')
					this.toggleClassState(newIndex, 'next')
					this.toggleClassState(newIndex, 'left')
					
					this.setState({ moving: false })
				}
			}, 800)
		}
	}
	
	slide(direction) {
		if (this.state.moving || !this.state.isMounted) return
		
		if (typeof direction === 'number') { // custom index move
			if (direction <= this.props.data.length) {
				this.move(direction, direction > this.state.slideIndex ? 'right' : 'left')
			} else {
				this.move(0, 'left') // slide does not exist, move to first slide instead
			}
		} else if (direction === 'left') {
			/* MOVING LEFT, PREV
			** If current slide is on first slide, set slide
			** to last slide, else set slide to previous slide */
			this.move(this.state.slideIndex <= 0 ? this.props.data.length - 1 : this.state.slideIndex - 1, 'left')
		} else {
			/* NEXT
			** If current slide is on last slide, set slide
			** to first slide, else set slide to next slide */
			this.move(this.state.slideIndex + 1 >= this.props.data.length ? 0 : this.state.slideIndex + 1, 'right')
		}
	}
	
	render() {
		const carouselClassName = classNames('carousel', this.props.className)
		
		return <div className={carouselClassName}>
			<ul className="slides">{Object.keys(this.state.slides).map((slide, i) => {
				const className = classNames(this.state.slides[slide])
				let component = this.props.data[slide]
				
				return <li key={i} className={className}>
					{typeof component === 'string' ? <img src={component}/> : component}
				</li>
			})}</ul>
			{this.props.controls ? <div className="controls">
				<button className="previous" onClick={this.slide.bind(this, 'left')}><i className="fas fa-angle-left"></i></button>
				<button className="next" onClick={this.slide.bind(this, 'right')}><i className="fas fa-angle-right"></i></button>
			</div> : null}
		</div>
	}
}

Carousel.defaultProps = {
	interval: 10000, // 10s
	auto: true,
	slideCooldown: 800, // .8s
	controls: true
}

Carousel.propTypes = {
	data: PropTypes.array.isRequired,
	auto: PropTypes.bool,
	interval: PropTypes.number,
	controls: PropTypes.bool
}

export default Carousel