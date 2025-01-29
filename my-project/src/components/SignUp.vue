<template>
  <div class="container" rewardpoints="calculator">
    <div class="signup-form-container">
      <div v-if="recievedData === 'Admin'" class="image-container">
        <img :src="image" alt="Admin Image" />
      </div>
      <div v-else-if="recievedData === 'Student'" class="image-container">
        <img :src="image3" alt="Student Image" />
      </div>
      <div v-else class="image-container">
        <img :src="image1" alt="Reviewer Image" />
      </div>
      <div class="signup-form">
        <h1>{{ recievedData }} Login Page</h1>
        <form @submit.prevent="login">
          <input v-model="username" type="text" name="username" placeholder="Username" required />
          <input v-model="password" type="password" name="password" placeholder="Password" required />
          <input type="submit" value="Submit" v-on:click="login"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '@/eventBus';

export default {
  data() {
    return {
      image: require("../assets/images (1).jpg"),
      image1: require("../assets/images (3).png"),
      image3: require("../assets/image4.jpeg"), // Student image
      recievedData: null,
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:8080/login', {
          username: this.username,
          password: this.password,
        });
        if (response.data.message === 'Login successful') {
          // Redirect based on role
          this.$router.push({ name: 'EntryA', query: { data: this.recievedData } });
        } else {
          alert('Login failed: ' + response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert('Server is not Responding.: ' + error.response.data.message);
        } else {
          alert('Cant connect to server');
        }
      }
    },
  },
  mounted() {
    eventBus.on('send:data', (data) => {
      this.recievedData = data;
    });
  },
};
</script>


<style>
/* Your existing styles */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.signup-form-container {
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row; /* Ensure items are in a row */
  align-items: center;
  width: 700px;
  height: 350px;
}

.signup-form {
  width: 50%;
}

.image-container {
  width: 50%; /* Make it occupy the right half */
  text-align: center; /* Center the image horizontally */
}

.signup-form form {
  width: 100%;
}

.signup-form input[type="text"],
.signup-form input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.signup-form input[type="text"]:focus,
.signup-form input[type="password"]:focus {
  border-color: #160d63; /* Highlight on focus */
}

.signup-form input[type="submit"] {
  background-color: #5765e6;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.signup-form input[type="submit"]:hover {
  background-color: #2ac9d4; /* Hover effect */
}

h1 {
  text-align: center;
  color: #5765e6;
}
</style>
