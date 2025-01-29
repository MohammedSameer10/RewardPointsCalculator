<template>
  <div class="container">
    <div class="review-section">
      <h1>Review Marks</h1>
      <div class="review-marks">
        <div class="review-marks-left">
          <div v-for="n in 5" :key="n" class="input-group">
            <label for="r{{ n }}">R{{ n }}</label>
            <input type="number" id="r{{ n }}" v-model="reviewMarks[n - 1]" min="0" max="10" required />
          </div>
        </div>
        <div class="review-marks-right">
          <div v-for="n in 5" :key="n + 5" class="input-group">
            <label for="r{{ n + 5 }}">R{{ n + 5 }}</label>
            <input type="number" id="r{{ n + 5 }}" v-model="reviewMarks[n + 4]" min="0" max="10" required />
          </div>
        </div>
      </div>
      <button type="button" class="submit-button" :disabled="!areReviewMarksFilled" @click="submitReviewMarks">Submit Review Marks</button>
    </div>
    
    <div class="team-communication-section">
      <h1>Team Communication</h1>
      <div class="team-communication">
        <div v-for="n in 5" :key="n" class="input-group">
          <label for="t{{ n }}">T{{ n }}</label>
          <input type="number" id="t{{ n }}" v-model="teamMarks[n - 1]" min="0" max="6" required />
        </div>
      </div>
      <button type="button" class="submit-button" :disabled="!areTeamMarksFilled" @click="submitTeamMarks">Submit Team Marks</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      reviewMarks: Array(10).fill(null), 
      teamMarks: Array(5).fill(null), 
      projectId: '',
    };
  },
  computed: {
    areReviewMarksFilled() {
      return this.reviewMarks.every((mark) => mark !== null);
    },
    areTeamMarksFilled() {
      return this.teamMarks.every((mark) => mark !== null);
    },
  },
  methods: {
    async submitReviewMarks() {
      const totalReviewMarks = this.reviewMarks.reduce((sum, mark) => sum + mark, 0);
      const scaledReviewMarks = (totalReviewMarks / 100) * 60;
      try {
        await axios.put(`http://localhost:8080/project/updateReviewMarks/${this.projectId}`, { reviewMarks: scaledReviewMarks });
        alert('Review marks submitted successfully');
      } catch (error) {
        alert('Error submitting review marks');
      }
    },
    async submitTeamMarks() {
      const totalTeamMarks = this.teamMarks.reduce((sum, mark) => sum + mark, 0);
      const scaledTeamMarks = (totalTeamMarks / 30) * 10;
      console.log(scaledTeamMarks);
      try {
        await axios.put(`http://localhost:8080/project/updateTeamCommunication/${this.projectId}`, { teamMarks: scaledTeamMarks });
        alert('Team communication marks submitted successfully');
      } catch (error) {
        alert('Error submitting team communication marks');
      }
    },
  },
  created() {
    this.projectId = this.$route.query.projectId; 
    console.log(this.projectId);
  },
};
</script>

  
  <style scoped>
.container {
  background-color: transparent; /* Make the container transparent */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%; /* Adjust width as needed */
  margin: 0 auto; /* Center the component horizontally */
}

.review-section,
.team-communication-section {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 13px rgba(0, 0, 0, 0.1);
  width:100%;
}

.review-marks-heading,
.team-communication-heading {
  margin-bottom: 10px;
}

h1 {
  color: #3498db;
  text-align: center;
}

.review-marks,
.team-communication {
  background-color: transparent;
  padding: 10px;
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap if they don't fit on one line */
}

.review-marks-left,
.review-marks-right,
.team-communication {
  width: 50%; /* Each half takes up 50% of the space */
}

.input-group {
  display: flex;
  align-items: center;
  margin: 10px;
  margin-right: 20px;
}

.input-group label {
  width: 50px;
  color: #3498db; /* Blue */
  margin-right: 10px;
}

input[type="number"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100px;
}

  .submit-button {
    background-color: #3498db; /* Blue */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:disabled {
    background-color: #ccc; 
    cursor: default;
  }
  
  .submit-button:hover {
    background-color: #2980b9; 
  }
  </style>