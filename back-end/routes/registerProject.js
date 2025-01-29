const mongoose = require('mongoose');
const express=require('express');
const Project = require('../model/pId');
const projectRouter = express.Router();
const createProjects =async ()=> {
  try {
    for (let i = 1; i <= 10; i++) {
      const newProject = new Project({
        projectId: i.toString(),  
        reviewerMark: 0,        
        teamCommunication: 0,     
        initialSubmission: 0,     
        finalReport: 0,          
        plagiarism: 0,            
      });
      console.log(i);
      await newProject.save();
    }
    res.status(201);
    res.json({"message":"succesfully created the projects"});
  } catch (err) {
    console.error('Error creating projects:', err);
    mongoose.connection.close();  
  }
}

 const checkId = async (req, res) => {
    try {
      const {projectId} = req.body;
      const project = await Project.findOne({ projectId});
      if (project) {
         res.status(200).json({ "message":"true"});
      } else {
         res.status(404).json({ "message":"false"});
      }
    } catch (error) {
    res.status(500).json({ message: 'Server error', error });
    }
  };

projectRouter.post('/',checkId);
projectRouter.post('/',createProjects);
module.exports={createProjects,checkId};
