import React, { useState } from 'react';

import {
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
	Dialog,
	Button
} from '@material-ui/core';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

export default function SavedImages(props) {
	const [open, setOpen] = useState(false);
	const [currentImg, setCurrentImage] = useState({});
	const [deleteDialog, setDeleteDialog] = useState(false);

	const handleOpen = img => {
		setOpen(true);
		setCurrentImage(img);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDeleteDialogOpen = img => {
		setDeleteDialog(true);
		setCurrentImage(img);
	};

	const handleDeleteDialogClose = () => {
		setDeleteDialog(false);
	};

	const handleDelete = () => {
		props.unSave(currentImg);
		handleDeleteDialogClose();
	};

	let imageListContent;
	const { images } = props;
	if (images) {
		imageListContent = (
			<GridList cols={1} spacing={16} style={{ margin: '0 15px' }}>
				{images.map(img => (
					<GridListTile key={img.id}>
						<img src={img.largeImageURL} alt="" onClick={() => handleOpen(img)} />
						<GridListTileBar
							title={img.tags}
							subtitle={
								<span>
									by <strong>{img.user}</strong>
								</span>
							}
							actionIcon={
								<IconButton onClick={() => handleDeleteDialogOpen(img)}>
									<DeleteOutlineIcon style={{ color: 'red' }} />
								</IconButton>
							}
						></GridListTileBar>
					</GridListTile>
				))}
			</GridList>
		);
	} else {
		imageListContent = null;
	}

	return (
		<div>
			{imageListContent}
			<Dialog open={open} onClose={handleClose}>
				<img src={currentImg.largeImageURL} alt="" style={{ width: '100%' }} />
			</Dialog>

			<Dialog open={deleteDialog} onClose={handleDeleteDialogClose}>
				<h2 style={{ margin: '20px' }}>Delete this image?</h2>
				<Button
					style={{ margin: '20px' }}
					label="Delete"
					variant="contained"
					color="secondary"
					onClick={handleDelete}
				>
					Delete
				</Button>
				<Button
					style={{ margin: '20px' }}
					label="Cancel"
					variant="contained"
					color="primary"
					onClick={handleDeleteDialogClose}
				>
					Cancel
				</Button>
			</Dialog>
		</div>
	);
}
