<template>
  <div class="container">
    <div class="markEntry">
      <h1>Enter Mark here</h1>
      <div class="m-input">
        <label for="initial">Initial Submission</label>
        <input type="text" name="initial" placeholder="Not more than 5"
        v-model="marks.initialSubmission"
        @keypress="clrstatus"
        @focus="clrstatus">
        <label for="final">Final Report</label> 
        <input type="text" name="final" placeholder="Not more than 10"
        v-model="marks.finalReport"
        @keypress="clrstatus"
        @focus="clrstatus">
        <p v-if="invalidmark" style="color:red">Mark Entered shouldnt be null or it shouldnt be greater than the criteria</p>
        <button type="submit" id="m-submit" @click="validateChange">Submit</button>
      </div>
    </div>
    <div class="reviewer-details">
      <h1>Reviewer Mark details</h1>
      <div class="r-labels">
        <div class="check" v-if="!editing">
        <label for="review-mark">Review Mark: {{ reviewerMark }}</label>
        <br>
        <br>
        <label for="team-mark">Team Communication: {{ teamCommunication }}</label>
      </div>
      <div class="check" v-else>
        <label for="review-mark">Review Mark: </label>
        <br>
        <input type="number" v-model="reviewerMark" class="inp"  />
        <br>
        <label for="team-mark">Team Communication: </label>
        <br>
        <input type="number" v-model="teamCommunication" class="inp" />
      </div>
        <div class="r-button" v-if="!editing">
        <button type="submit" id="r-submit" @click="updateR">Submit</button>
        <button type="submit" id="r-edit" @click="isEditing">Edit</button>
      </div>
      <div class="r-button" v-else>
        <button type="submit" id="r-save" @click="updateR">Save</button>
        <button type="submit" id="r-cancel" @click="cancelEdit">Cancel</button>
      </div>
      </div>
    </div>
    <div class="view-rp-button">
      <router-link :to="'/ResultPage'" class="view-rp-btn" v-on:click="sendId">
        View RP
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AdminEntry',
  data() {
    return {
      marks: {
        initialSubmission: '',
        finalReport: '',
      },
      reviewerMark: 0, 
      teamCommunication: 0, 
      invalidmark: false,
      editing: false,
      cached: '',
      cached1: '',
      projectId: '',
    };
  },
  methods: {
    async validateChange() {
      this.invalidmark = this.marks.initialSubmission === '' || this.marks.finalReport === '' ||
                         this.marks.initialSubmission > 5 || this.marks.finalReport > 10;   
      try {
        await axios.put(`http://localhost:8080/p/initial/${this.projectId}`, { initialSubmission: this.marks.initialSubmission });
        alert('Initial Submission marks submitted successfully');
      } catch (error) {
        alert('Error submitting review marks');
      }      

      try {
        await axios.put(`http://localhost:8080/p/final/${this.projectId}`, { finalReport: this.marks.finalReport });
        alert('Final Report marks submitted successfully');
      } catch (error) {
        alert('Error submitting review marks');
      }
    },
    clrstatus() {
      this.invalidmark = false;
    },
    isEditing() {
      this.cached = JSON.parse(JSON.stringify(this.reviewerMark));
      this.cached1 = JSON.parse(JSON.stringify(this.teamCommunication));
      this.editing = true;
    },
    cancelEdit() {
      this.reviewerMark = this.cached; 
      this.teamCommunication = this.cached1;
      this.cached = null;
      this.cached1 = null;
      this.editing = false;
    },
    async updateR() {
      this.editing = false;
      try {
        await axios.put(`http://localhost:8080/project/updateReviewMarks/${this.projectId}`, { reviewMarks: this.reviewerMark });
        alert('Review marks submitted successfully');
      } catch (error) {
        alert('Error submitting review marks');
      }

      try {
        await axios.put(`http://localhost:8080/project/updateTeamCommunication/${this.projectId}`, { teamMarks: this.teamCommunication });
        alert('Team communication marks submitted successfully');
      } catch (error) {
        alert('Error submitting team communication marks');
      }
    },
    sendId() {
      this.$router.push({ name: 'ResultPage', query: { projectId: this.projectId } });
    }
  },
  created() {
    this.projectId = this.$route.query.projectId; 
  }
};
</script>

<style>
/* Container */
.container {
  width: 80%; /* Minimum width of 70% */
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

/* Mark Entry Section */
.markEntry {
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 50%;
  margin-bottom: 80px;
  border-radius: 15px;
}

.markEntry h1 {
  text-align: center; /* Center the heading */
  margin-bottom: 10px;
  color: rgb(103, 119, 206); /* Blue color */
}

.m-input {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center labels and inputs horizontally */
  gap: 10px;
}

.m-input label {
  font-size: 0.8em;
  color: #666;
}

.m-input input[type="text"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

#m-submit {
  background-color: rgb(103, 119, 206); /* Blue color */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

#m-submit:hover {
  background-color: #583e94;
}

/* Reviewer Details Section */
.reviewer-details {
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 50%;
  border-radius: 15px;
}

.reviewer-details h1 {
  text-align: center; /* Center the heading */
  margin-bottom: 10px;
  color: rgb(103, 119, 206); /* Blue color */
}

/* Button Styling */
.r-labels button {
  background-color: rgb(103, 119, 206); /* Blue color */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
  margin-right: 15px;
}

.r-labels button:hover {
  background-color: #583e94;
}

/* Button Positioning */
.r-labels button#r-submit {
  float: left; /* Left-align the Submit button */
}

.r-labels button#r-edit {
  float: right; /* Right-align the Edit button */
}

.r-labels {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.r-labels label {
  margin-bottom: 30px;
  margin-left: 36%;
}

.r-button {
  display: flex;
  justify-content: center;
}

.inp {
  margin-left: 36%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.check {
  margin-bottom: 15px;
}

/* View RP Button */
.view-rp-button {
  margin-top: 20px; /* Add some space above the button */
  text-align: center; /* Center the button horizontally */
}

.view-rp-btn {
  background-color: rgb(103, 119, 206); /* Blue color */
  color: white; /* Text color */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none; /* Remove underline */
  transition: 0.3s;
}

.view-rp-btn:hover {
  background-color: #583e94; /* Darker blue on hover */
}
</style>
