import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';// * means we import everything from the actions as api 

//Action Creators are the function that reaturn action since we will be dealing with async logic with redux thunk we can use a 
//function that call another function hence we add asynce dispatch and instead of returning the action we dispatch
export const getPosts = () => async (dispatch) => {
    try{
        const {data} = await api.fetchPosts();

        dispatch({ type: FETCH_ALL ,payload: data})//payload is a data where we store all of are post
    }catch (error){
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try{
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data});
    }catch (error){
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);

        dispatch({ type: UPDATE , payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);

        dispatch({ type: DELETE,  payload: id});
    } catch(error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try{
        const { data } = await api.likePost(id);

        dispatch({ type: UPDATE, payload: data});
    }catch (error){
        console.log(error);
    }
}