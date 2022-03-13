<script setup>
// https://v2.jokeapi.dev/joke/Programming
import { ref, watchEffect } from "vue";

const API_URL = `https://v2.jokeapi.dev/joke/Programming`;
const response = ref(0);
const showDelivery = ref(false);

watchEffect(async () => {
  response.value = await (await fetch(API_URL)).json();
});

const refetchJoke = async () => {
  showDelivery.value = false;
  response.value = await (await fetch(API_URL)).json();
}

const toggleDelivery = () => {
  showDelivery.value = !showDelivery.value
}
</script>

<template>
  <div class="page-content">
    <h1>{{ msg }}</h1>
    <div v-if="response.type === 'single'">
      <p>
        {{ response.joke }}
      </p>
    </div>
    <div v-else>
      <p class="box" @click="toggleDelivery">
        {{ response.setup }}
      </p>
      <p class="delivery" v-show="showDelivery">
        {{ response.delivery }}
      </p>
    </div>
    <button type="button" class="fill" @click="refetchJoke">Another joke</button>
  </div>
</template>

<script>
export default {
  name: "ContentComponent",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
button {
  margin: 50px;
  font-family: inherit;
  color: white;
}
.fill {
  font-size: 20px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 13px 50px 13px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
}

.fill::after {
  content: "";
  background-color: #000;
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
}

.fill:hover::after {
  top: 0px;
  left: 0px;
}
.box {
  text-decoration: underline;
  margin: auto;
  inline-size: max-content;
  cursor: pointer;
}
.page-content {
  position: absolute;
  top: 20%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.delivery {
  margin-top: 10px;
}
</style>
