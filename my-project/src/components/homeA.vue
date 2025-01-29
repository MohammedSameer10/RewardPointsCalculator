<template>
  <div class="outer">
    <h1 class="header">RewardPoints Calculator</h1>
    <div class="image-container">
      <div class="image-wrapper admin">
        <h3 class="image-header">Admin</h3>
        <div class="button1" @click="val1()">
          <RouterLink to="/SignUp">
            <img v-bind:src="image1" alt="Admin Image" />
          </RouterLink>
        </div>    
      </div>

      <div class="image-wrapper reviewer">
        <h3 class="image-header">Reviewer</h3>
        <div class="button2" @click="val2()">
          <RouterLink to="/SignUp">
            <img v-bind:src="image2" alt="Reviewer Image" />
          </RouterLink>
        </div>   
      </div>

      <!-- New Student Button -->
      <div class="image-wrapper student">
        <h3 class="image-header">Student</h3>
        <div class="button3" @click="val3()">
          <RouterLink to="/SignUp">
            <img v-bind:src="image3" alt="Student Image" />
          </RouterLink>
        </div>   
      </div>
    </div>
  </div>
</template>

<script>
// Disable ESLint for the next line
// eslint-disable-next-line no-unused-vars
import { RouterLink } from 'vue-router';
import { eventBus } from '@/eventBus';

export default {
  name: 'HomeA',
  data() {
    return {
      image1: require("../assets/images (1).jpg"), 
      image2: require("../assets/images (3).png"), 
      image3: require("../assets/image4.jpeg"), 
      data1: null,
    };
  },
  methods: {
    async val1() {
      this.data1 = 'Admin';
      await eventBus.emit('send:data', this.data1);
    },
    async val2() {
      this.data1 = 'Reviewer';
      await eventBus.emit('send:data', this.data1);
    },
    async val3() { // Method for Student button
      this.data1 = 'Student';
      await eventBus.emit('send:data', this.data1);
    }
  }
};
</script>

<style scoped>
.header {
  text-align: center;
  margin-top: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
}

.image-wrapper {
  background: #fff;
  padding: 2rem;
  width: 300px;
  height: 300px;
  margin: 1rem;
  text-align: center;
  border-radius: 4%;
  border: 1px solid rgb(193, 193, 235);
}

.image-header {
  margin: 0;
  color: rgb(32, 50, 131);
  font-size: 1.5rem;
}

.image-wrapper img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.outer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 80%;
  height: 80%;
  margin-top: 160px;
  margin-left: 160px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}
</style>
