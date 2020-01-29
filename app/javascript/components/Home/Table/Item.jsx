import React, { Component } from 'react';

import { withStyles, styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Sunrise from 'images/sunrise.png'

const MyCard = withStyles({
  root: {
    maxWidth: 345,
  },
})(Card);

const MyButton = withStyles({
  label: {
    whiteSpace: 'nowrap',
  }
})(Button);

const MyCardMedia = withStyles({
  root: {
    height: 140,
  }
})(CardMedia);

const Item = (props) => {

  const episode = props.episode;

  return (

        <MyCard>
          <CardActionArea>
            <MyCardMedia 
              image={Sunrise}
              title="Sunrise Pic"
            >
            </MyCardMedia>
            <CardContent>
              <Typography variant="h5">{episode.title.slice(0,15) + (episode.title.length > 15 ? "..." : "")}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
                --
                {episode.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <MyButton size="small" color="primary">
              Share
            </MyButton>
            <MyButton size="small" color="primary">
              Learn More
            </MyButton>
            <MyButton
              color="primary" size="small"
              onClick={(e) => props.addToCart(episode)}
            >
              Add To Cart
            </MyButton>
          </CardActions>
        </MyCard>
  );
}

export default Item;
