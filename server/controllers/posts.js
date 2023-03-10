import express from 'express';
import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req,res) => {
    try{
        //since find take time it is a asynchronous function we need to add await to make synchronous 
        const postMessages = await PostMessage.find();
        
        res.status(200).json(postMessages);
    } catch(error){
        res.status(404).json({message:error.message});
    }
}

export const createPost = async (req,res) =>{
    const post = req.body;
    
    const newPost = new PostMessage(post);

    try{
        await newPost.save();

        res.status(201).json(newPost);
    } catch(error){
        res.status(409).json({ message:error.message});
    }
}

export const updatePost = async (req,res) => {
    const { id: _id } = req.params;

    const post= req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post from this id')

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true} );

    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post from this id')

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post Deleted Successfully'})
}

export const likePost = async (req,res) => {
    
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post from this id')
    
    const post = await PostMessage.findById(id);//it will return a post
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, {new:true} );

    res.json(updatedPost);
}