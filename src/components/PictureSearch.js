import React from 'react';

import AppBar from '@material-ui/core/AppBar';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Search from './search/Search';
import ImageResults from './image-results/ImageResults';
import SavedImages from './SavedImages';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

function PictureSearch(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [images, setImages] = React.useState([]);

	let saved = localStorage.getItem('savedImages');
	if (saved) {
		saved = JSON.parse(saved);
	}

	const [savedImages, setSavedImages] = React.useState(saved || []);

	React.useEffect(() => {
		localStorage.setItem('savedImages', JSON.stringify(savedImages));
	}, [savedImages.length]);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const searchResults = res => {
		setImages(res);
	};

	const saveImage = img => {
		setSavedImages(prevState => [img, ...prevState]);
	};

	const unSave = imgToDelete => {
		setSavedImages(
			savedImages.filter(img => {
				return imgToDelete.id !== img.id;
			})
		);
	};
	const drawer = (
		<div>
			<h3 style={{ textAlign: 'center' }}>Saved Images</h3>
			<Divider></Divider>

			<SavedImages images={savedImages} unSave={unSave} />
		</div>
	);

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Image Search
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="saved images">
				<Hidden smUp implementation="css">
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Search searchResults={searchResults} />
				{images.length > 0 ? <ImageResults images={images} saveImage={saveImage} /> : null}
			</main>
		</div>
	);
}

export default PictureSearch;
