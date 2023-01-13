import React , { useState , useEffect} from 'react'
import { TextField, Button,Typography,Paper} from '@material-ui/core'
import FileBase from 'react-file-base64';
import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {

  const  [postData, setPostData] = useState({creator: '',title: '', message: '', tags: '', selectedfile: ''});
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const classes= useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if(post) setPostData(post);
  }, [post])

  const handleSubmit = (e) =>{
    e.preventDefault();//not to get refresh in browser

    if(currentId){
      dispatch(updatePost(currentId, postData));
    }
    else{
      dispatch(createPost(postData));
    }
    clear();
  }
  const clear = () =>{
    setCurrentId(null);

    setPostData({creator: '',title: '', message: '', tags: '', selectedfile: ''});
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{ currentId? 'Editing ' : 'Creating'} A Memory</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} 
        /* whole data from our post is gonna save in a postdata 'object' 
        and each object key is going to be a specific textfeild */
         onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
         {/* to change the value of postdata in change we declare a callback function which has event as a parameter
        setPostData as a setter method of that state the we scpecify a target which creator but later on if we add
        a second text firld it will overwrite everything we only have creator since we are not specifying anything
        to fix this we spread the postdata that means that in every text field we do the same thing but only change
        the last property */}
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows ={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
}

export default Form;