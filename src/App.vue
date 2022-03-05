<template>
  <div
    class="login view"
    v-if="state.username === '' || state.username === null"
  >
    <div class="login-form">
      <h1>chatyo | private chat</h1>
      <form @submit.prevent="Login" class="form-inner">
        <label for="username"><b>Username</b></label>
        <input
          type="text"
          v-model="inputUsername"
          placeholder="Write your username..."
          autofocus
        />
        <input type="submit" class="btn-blue" value="Login" />
      </form>
    </div>
  </div>

  <div class="chat view" v-else>
    <header>
      <h1>Hola, {{ state.username }}</h1>
      <h4>log in at {{ state.timestamp }}</h4>
      <button class="logout btn-blue" @click="Logout">Logout</button>
    </header>

    <section class="chat-box">
      <div
        v-for="message in state.messages"
        :key="message.key"
        :class="
          message.username == state.username
            ? 'message current-user'
            : 'message'
        "
        class="message"
      >
        <div class="message-inner">
          <div class="message-username float-left">
            <b>{{ message.username }}</b>
          </div>
          <br />
          <div class="message-message">{{ message.message }}</div>
          <br />
          <div class="message-timestamp float-right">
            {{ message.timestamp }}
          </div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="sendMessage">
        <input
          type="text"
          v-model="inputMessage"
          placeholder="Write a message..."
        />
        <input type="submit" class="btn-blue" value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "vue";
import db from "./db";
import moment from "moment";
export default {
  setup() {
    const inputUsername = ref("");
    const inputMessage = ref("");

    const state = reactive({
      username: "",
      messages: [],
      timestamp: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    });

    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    };

    const Logout = () => {
      state.username = "";
    };

    const sendMessage = () => {
      const messageRef = db.database().ref("messages");
      console.log("Text2");
      if (inputMessage.value !== "" || inputMessage.value !== null) {
        messageRef.push({
          username: state.username,
          message: inputMessage.value,
          timestamp: state.timestamp,
        });
        inputMessage.value = "";
      }
    };

    onMounted(() => {
      const messageRef = db.database().ref("messages");
      messageRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let messages = [];

        for (let key in data) {
          messages.push({
            username: data[key].username,
            message: data[key].message,
            timestamp: data[key].timestamp,
          });
        }

        state.messages = messages;
      });
    });

    return {
      inputUsername,
      Login,
      state,
      inputMessage,
      sendMessage,
      Logout,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222;
}

.login-form {
  width: 500px;
  margin: auto;
  background-color: #222222;
  color: white;
  padding: 10px;
  border-radius: 5px;
  justify-content: center;
  text-align: center;
  position: relative;
}
.form-inner {
  position: relative;
  z-index: 1;
  background: #f2f2f2;
  padding: 20px;
  text-align: center;
  border-radius: 0 0 5px 5px;
  color: #222;
}
input[type="text"] {
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  outline: none;
  height: 40px;
  color: #222;
  font-size: 16px;
  width: 100%;
  margin: 0 0 15px;
  padding: 0;
}
input[type="text"]:focus {
  border-bottom: 2px solid #3498db;
  color: #3498db;
}
.btn-blue {
  width: 100%;
  background: #3498db;
  border: none;
  outline: none;
  height: 40px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.chat header {
  display: block;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f2f2f2;
  border-radius: 5px 5px 0 0;
}
.chat-box {
  height: calc(100vh - 100px);
  overflow-y: scroll;
  padding: 10px;
  background: #f2f2f2;
  border-radius: 0 0 5px 5px;
}
.message-inner {
  position: relative;
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}
.float-right {
  float: right;
}
.float-left {
  float: left;
}
.message-timestamp {
  font-size: 12px;
  color: #aaa;
  background: #3498db;
  padding: 8px;
  border-radius: 3px;
  color: #f2f2f2;
}
</style>
