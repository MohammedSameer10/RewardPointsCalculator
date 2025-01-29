<template>
  <div class="project-form">
    <h1 class="header">Welcome to the Page! Enter Project ID</h1>
    <form @submit.prevent="handleSubmit">
      <label for="projectId">Project ID:</label>
      <input type="text" id="projectId" v-model="projectId" required />
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <button type="submit" class="submit-btn">Submit </button>
     
    </form>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'EntryA',
  data() {
    return {
      projectId: '',
      rData: null,
      route: false,
      errorMessage: '', 
    };
  },
  methods: {
  async handleSubmit() {
    // Validate projectId
    const projectIdNumber = Number(this.projectId);
    if (isNaN(projectIdNumber) || projectIdNumber < 1 || projectIdNumber > 10) {
      this.errorMessage = 'Invalid Project ID. It must be a number between 1 and 10.';
      return; // Exit the method if validation fails
    }

    // Clear error message if validation passes
    this.errorMessage = '';

    try {
      const response = await axios.post('http://localhost:8080/checkProject', { projectId: this.projectId });
      if (response.data.message === "true") {
        this.route = true;
        this.$emit('valid-project-id', this.projectId);
        
        // Route based on the role
        if (this.rData === 'Admin') {
          this.$router.push({ name: 'AdminEntry', query: { projectId: this.projectId } });
        } else if (this.rData === 'Reviewer') {
          this.$router.push({ name: 'ReviewerEntry', query: { projectId: this.projectId } });
        } else if (this.rData === 'Student') { // For students, redirect to ResultPage
          this.$router.push({ name: 'ResultPage', query: { projectId: this.projectId } });
        }
      } else {
        alert('Project ID does not exist');
      }
    } catch (error) {
      alert('An error occurred while checking the project ID');
    }
  },
},

  created() {
    this.rData = this.$route.query.data;
    console.log("this is "+this.rData);
  },
  components: {
 
  },
};
</script>
<style scoped>
.project-form {
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  padding: 20px;
  border-radius: 10px;
  margin: 210px auto; /* Adjusted margin to move the form slightly down */
  max-width: 400px;
  text-align: center;
  /* Centering the div horizontally */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  margin-bottom: 20px;
  color: #3498db;
  font-size: 1.5em;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

label {
  color: #333;
  font-weight: bold;
}

input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}

.submit-btn {
  background-color: rgb(103, 119, 206); /* Blue color */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1em;
  /* Center the button horizontally */
  display: block;
  margin: 0 auto;
}

.submit-btn:hover {
  background-color: rgb(85, 95, 159); /* Darker blue for hover effect */
}

.submit-btn:active {
  background-color: rgb(70, 82, 133); /* Even darker blue for active state */
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin: 10px 0;
}
</style>
