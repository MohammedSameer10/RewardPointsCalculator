const express = require('express');
const Project = require('../model/pId');
const routera = express.Router();
const initial = async (req, res) => {
  try {
    const { initialSubmission } = req.body;
    const { projectId } = req.params;
    
    console.log("projectId:", projectId); // Log the projectId
    
    const project = await Project.findOne({ projectId });
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    console.log(project.id);
    
    const updatedProject = await Project.findByIdAndUpdate(
      project.id,
      { $set: { initialSubmission: initialSubmission} },
      { new: true }
    );
    
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating initial marks:", error);
    res.status(500).json({ message: 'Error updating initial marks', error });
  }
};

    const final = async (req, res) => {
      try {
        const { finalReport } = req.body;
        const { projectId } = req.params;
        
        console.log("projectId:", projectId); // Log the projectId
        
        const project = await Project.findOne({ projectId });
        
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
        
        console.log(project.id);
        
        const updatedProject = await Project.findByIdAndUpdate(
          project.id,
          { $set: { finalReport: finalReport } },
          { new: true }
        );
        
        res.status(200).json(updatedProject);
      } catch (error) {
        console.error("Error updating Final report:", error);
        res.status(500).json({ message: "Error updating Final report", error });
      }
    };

    const dataM = async (req, res) => {
      try {
        const { projectId } = req.params;  
        const project = await Project.findOne({ projectId });
        res.json(project); 
      } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).send('Error retrieving projects');
      }
    }
routera.get('/result/:projectId',dataM);
routera.put('/initial/:projectId', initial);
routera.put('/final/:projectId', final);

module.exports = routera;

