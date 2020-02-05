import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Dialog,
  Button
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";

class ImageResults extends Component {
  state = {
    open: false,
    currentImg: ""
  };

  handleOpen = img => {
    this.setState({open: true, currentImg: img});
  };

  saveImage = img => {};

  handleClose = () => {
    this.setState({open: false});
  };
  render() {
    let imageListContent;
    const {images} = this.props;
    if (images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map(img => (
            <GridListTile key={img.id}>
              <img src={img.largeImageURL} alt="" />
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
                      <StarBorderIcon style={{color: "white"}} />
                    </IconButton>
                    <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                      <StarBorderIcon />
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
          <img src={this.state.currentImg} alt="" style={{width: "100%"}} />
        </Dialog>
      </div>
    );
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageResults;
