import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
	Dialog,
	Button
} from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
class ImageResults extends Component {
	state = {
		open: false,
		currentImg: ''
	};

	getGridListCols = width => {
		if (isWidthDown('md', width)) {
			return 1;
		}
		return 3;
	};

	handleOpen = img => {
		this.setState({ open: true, currentImg: img });
	};

	saveImage = img => {
		this.props.saveImage(img);
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	render() {
		let imageListContent;
		const { images, width } = this.props;
		if (images) {
			imageListContent = (
				<GridList cols={this.getGridListCols(width)} spacing={16}>
					{images.map(img => (
						<GridListTile key={img.id}>
							<img
								src={img.largeImageURL}
								alt=""
								onClick={() => this.handleOpen(img.largeImageURL)}
							/>
							<GridListTileBar
								title={img.tags}
								subtitle={
									<span>
										by <strong>{img.user}</strong>
									</span>
								}
								actionIcon={
									<Fragment>
										<IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
											<ZoomInIcon style={{ color: 'white' }} />
										</IconButton>
										<IconButton onClick={() => this.saveImage(img)}>
											<StarBorderIcon style={{ color: 'white' }} />
										</IconButton>
									</Fragment>
								}
							></GridListTileBar>
						</GridListTile>
					))}
				</GridList>
			);
		} else {
			imageListContent = null;
		}

		const actions = [<Button label="Close" primary={true} onClick={this.handleClose} />];
		return (
			<div>
				{imageListContent}
				<Dialog actions={actions} open={this.state.open} onClose={this.handleClose}>
					<img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
				</Dialog>
			</div>
		);
	}
}

ImageResults.propTypes = {
	images: PropTypes.array.isRequired
};

export default withWidth()(ImageResults);
