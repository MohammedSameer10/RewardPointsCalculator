const express = require('express');
const Project = require('../model/pId');
const router = express.Router();
const updateReviewMarks = async (req, res) => {
  try {
    const { reviewMarks } = req.body;
    const { projectId } = req.params;
    
    console.log("projectId:", projectId); 
    
    const project = await Project.findOne({ projectId });
    
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    console.log(project.id);
    
    const updatedProject = await Project.findByIdAndUpdate(
      project.id,
      { $set: { reviewerMark: reviewMarks } },
      { new: true }
    );
    
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating review marks:", error);
    res.status(500).json({ message: 'Error updating review marks', error });
  }
};

    const updateTeamMarks = async (req, res) => {
      try {
        const { teamMarks } = req.body;
        const { projectId } = req.params;
        
        console.log("projectId:", projectId); // Log the projectId
        
        const project = await Project.findOne({ projectId });
        
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
        
        console.log(project.id);
        
        const updatedProject = await Project.findByIdAndUpdate(
          project.id,
          { $set: { teamCommunication: teamMarks } },
          { new: true }
        );
        
        res.status(200).json(updatedProject);
      } catch (error) {
        console.error("Error updating team marks:", error);
        res.status(500).json({ message: "Error updating team communication marks", error });
      }
    };
router.put('/updateReviewMarks/:projectId', updateReviewMarks);
router.put('/updateTeamCommunication/:projectId', updateTeamMarks);

module.exports = router;
