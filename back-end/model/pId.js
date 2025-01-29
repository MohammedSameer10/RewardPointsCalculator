const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
 
      projectId: {
        type: String,
        required: [true, "Please add the project ID"],
        unique: true,
      },
      reviewerMark: {
        type: Number,
        required: [true, "Please add reviewer mark"],
      },
      teamCommunication: {
        type: Number,
        required: [true, "Please add team communication score"],
      },
      initialSubmission: {
        type: Number,
        required: [true, "Please add initial submission score"],
      },
      finalReport: {
        type: Number,
        required: [true, "Please add final report score"],
      },
      plagiarism: {
        type: Number,
        required: [true, "Please add plagiarism score"],
      },

},
 {
  timestamps: true,
}
);

module.exports = mongoose.model("project", projectSchema);
