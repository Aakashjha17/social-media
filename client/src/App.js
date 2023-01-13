import React, { useState,useEffect} from 'react'
import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import { useDispatch } from 'react-redux';//allow us to dispatch an action

import { getPosts} from './actions/posts'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'
import useStyles from './styles'
import memories from './images/memories.png'

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes= useStyles();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxwidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        {/* any textual element like h2 ,paragraphs but give nice looking font */}
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
          <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
      {/* grow just provide simple animation */}
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
            {/* it takes full width on extra small device and 7 out of 12 spacing on small medium */}
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId= {currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App