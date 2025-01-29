<template>
  <div class="data-container">
    <h1>Project Details</h1>
    <ul class="details-list">
      <li><strong>Project ID:</strong> {{ projectId }}</li>
      <li><strong>Reviewer Mark:</strong> {{ reviewerMark }}</li>
      <li><strong>Team Communication:</strong> {{ teamCommunication }}</li>
      <li><strong>Initial Submission:</strong> {{ initialSubmission }}</li>
      <li><strong>Final Report:</strong> {{ finalReport }}</li>
      <li><strong>Plagiarism:</strong> {{ plagiarism }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'; 

export default {
  data() {
    return {
      projectId: null,
      initialSubmission: '',
      finalReport: '',
      reviewerMark: '',
      teamCommunication: '',
      plagiarism: '',
      error: null,
    };
  },
  async created() {
    this.projectId = this.$route.query.projectId;
    console.log(this.projectId); 
    try {
      const response = await axios.get(`http://127.0.0.1:8080/p/result/${this.projectId}`);
      console.log(response.data);
      this.initialSubmission = response.data.initialSubmission;
      this.finalReport = response.data.finalReport;
      this.reviewerMark = response.data.reviewerMark;
      this.teamCommunication = response.data.teamCommunication;
      this.plagiarism = response.data.plagiarism;
      console.log(this.initialSubmission, this.finalReport, this.plagiarism, this.teamCommunication, this.reviewerMark);

    } catch (error) {
      console.error('Error fetching project data:', error);
      this.error = 'Failed to load project details.'; // Set error message
    }
  },
};
</script>

<style scoped>
.data-container {
  background-color: #ffffff; /* White background */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Enhanced shadow effect */
  max-width: 600px;
  margin: 2rem auto;
}

h1 {
  color: rgb(103, 119, 206); /* Blue color */
  font-size: 1.8rem;
  margin-bottom: 1rem;
  text-align: center;
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.details-list li {
  background: #ffffff; /* White background */
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  padding: 1rem;
  font-size: 1rem;
  color: rgb(44, 46, 59); 
}

.details-list li strong {
  display: block;
  font-weight: bold;
  color: rgb(44, 46, 59); 
}
</style>
