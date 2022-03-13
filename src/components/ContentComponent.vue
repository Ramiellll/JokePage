<script setup>
// https://v2.jokeapi.dev/joke/Programming
import { ref, watchEffect } from "vue";

const API_URL = `https://v2.jokeapi.dev/joke/Any`;
const response = ref(0);
const showDelivery = ref(false);
const checkedOptions = ref([]);
const checkedFilters = ref([]);
let API_URL_OPTIONS = "https://v2.jokeapi.dev/joke/";

watchEffect(async () => {
  response.value = await (await fetch(API_URL)).json();
});

watchEffect(async () => {});

const refetchJoke = async () => {
  showDelivery.value = false;
  if (checkedOptions.value.length === 0) {
    applyFilter();
    console.log(API_URL_OPTIONS);
    response.value = await (await fetch(API_URL)).json();
  } else {
    checkedOptions.value.forEach((element, index) => {
      if (index === 0) {
        API_URL_OPTIONS += element;
      } else {
        API_URL_OPTIONS += "," + element;
      }
    });
    applyFilter();
    console.log(API_URL_OPTIONS);
    response.value = await (await fetch(API_URL_OPTIONS)).json();
  }
};

const applyFilter = () => {
  if (checkedFilters.value.length !== 0) {
    checkedFilters.value.forEach((filter, index) => {
      if (index === 0) {
        API_URL_OPTIONS += "?blacklistFlags=" + filter;
      } else {
        API_URL_OPTIONS += "," + filter;
      }
    });
  }
};

const toggleDelivery = () => {
  showDelivery.value = !showDelivery.value;
};
</script>

<template>
  <ul class="options ks-cboxtags">
    <li>
      <input
        type="checkbox"
        id="Programming"
        value="Programming"
        v-model="checkedOptions"
      />
      <label for="Programming">Programming</label>
    </li>
    <li>
      <input type="checkbox" id="Misc" value="Misc" v-model="checkedOptions" />
      <label for="Misc">Misc</label>
    </li>
    <li>
      <input type="checkbox" id="Dark" value="Dark" v-model="checkedOptions" />
      <label for="Dark">Dark</label>
    </li>
    <li>
      <input type="checkbox" id="Pun" value="Pun" v-model="checkedOptions" />
      <label for="Pun">Pun</label>
    </li>
    <li>
      <input
        type="checkbox"
        id="Spooky"
        value="Spooky"
        v-model="checkedOptions"
      />
      <label for="Spooky">Spooky</label>
    </li>
    <li>
      <input
        type="checkbox"
        id="Christmas"
        value="Christmas"
        v-model="checkedOptions"
      />
      <label for="Christmas">Christmas</label>
    </li>
  </ul>
  <div class="page-content">
    <h1>{{ msg }}</h1>
    <div v-if="response.type === 'single'">
      <p>
        {{ response.joke }}
      </p>
    </div>
    <div v-else-if="response.type === 'twopart'">
      <p class="box" @click="toggleDelivery">
        {{ response.setup }}
      </p>
      <p class="delivery" v-show="showDelivery">
        {{ response.delivery }}
      </p>
    </div>
    <div v-else-if="response.error">
      <p>
        {{ response.causedBy[0] }}
      </p>
    </div>
    <button type="button" class="fill" @click="refetchJoke">
      Another joke
    </button>
    <div class="filters-title">
      FILTERS:
      <div class="filters">
        <ul class="ks-cboxtags">
          <li>
            <input
              type="checkbox"
              id="NSFW"
              value="nsfw"
              v-model="checkedFilters"
            />
            <label for="NSFW">NSFW</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Religious"
              value="religious"
              v-model="checkedFilters"
            />
            <label for="Religious">Religious</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Political"
              value="political"
              v-model="checkedFilters"
            />
            <label for="Political">Political</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Racist"
              value="racist"
              v-model="checkedFilters"
            />
            <label for="Racist">Racist</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Sexist"
              value="sexist"
              v-model="checkedFilters"
            />
            <label for="Sexist">Sexist</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="Explicit"
              value="explicit"
              v-model="checkedFilters"
            />
            <label for="Explicit">Explicit</label>
          </li>
        </ul>
      </div>
    </div>
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
.options {
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: space-evenly;
  top: 10%;
}
.filters-title {
  /* display: flex; */
  left: 0;
  bottom: 0;
  right: 0;
  /* justify-content: space-evenly; */
  bottom: 10%;
}
.filters {
  display: flex;
  justify-content: space-evenly;
}
ul.ks-cboxtags {
  list-style: none;
  padding: 20px;
}
ul.ks-cboxtags li {
  display: inline;
}
ul.ks-cboxtags li label {
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(139, 139, 139, 0.3);
  color: #adadad;
  border-radius: 25px;
  white-space: nowrap;
  margin: 3px 0px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s;
}

ul.ks-cboxtags li label {
  padding: 5px 12px;
  cursor: pointer;
}

ul.ks-cboxtags li label::before {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 12px;
  padding: 2px 6px 2px 2px;
  content: "+";
  transition: transform 0.3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked + label::before {
  content: "x";
  transform: rotate(-360deg);
  transition: transform 0.3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked + label {
  border: 2px solid #fff;
  background-color: #000;
  color: #fff;
  transition: all 0.2s;
}

ul.ks-cboxtags li input[type="checkbox"] {
  display: absolute;
}
ul.ks-cboxtags li input[type="checkbox"] {
  position: absolute;
  opacity: 0;
}
ul.ks-cboxtags li input[type="checkbox"]:focus + label {
  border: 2px solid #e9a1ff;
}
</style>