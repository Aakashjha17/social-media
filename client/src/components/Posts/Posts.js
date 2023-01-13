import React from 'react'
import { useSelector } from 'react-redux' //use to fetch data from global redux store
import { Grid, CircularProgress } from '@material-ui/core'

import Post from './Post/Post'
import useStyles from './styles'

const Posts = ({setCurrentId}) => {
    const posts= useSelector((state)=> state.posts)
    const classes= useStyles();

    return (
      //circular progress is just a loading spinner
      !posts.length ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )
    )
}

export default Posts;