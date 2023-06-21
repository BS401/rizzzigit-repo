<script lang="ts">
	import { Client } from "adswebsitewrapper";
	import { onMount } from "svelte";

  onMount(async () => {

  })

  let usernameInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let loginButton: HTMLButtonElement

  const onLogin = async () => {
    const username = usernameInput.value
    const password = passwordInput.value

    try {
      usernameInput.disabled = passwordInput.disabled = loginButton.disabled = true
      await Client.getInstance().resources.authentication.login(username, password)
    } catch (error: any) {
      alert(`Login error: ${error.message}`)
      usernameInput.disabled = passwordInput.disabled = loginButton.disabled = false
    }
  }
</script>

<style>
  div.loginFormContainer {
    max-width: 100%;
    width: 420px;

    margin: auto;
    margin-top: 128px;

    background-color: #ffffff80;

    border-radius: 8px;
  }

  div.loginHeader {
    padding: 32px;
    padding-bottom: 0px;

    text-align: center;
  }

  div.loginForm {
    padding: 32px;
  }

  input[type="text"], input[type="password"] {
    width: 100%;

    padding: 8px;
    font-size: 16px;

    box-sizing: border-box;
    border-radius: 8px;
    border: solid;
    border-width: 1px;
    border-color: #7a589fff;

    margin-top: 16px;
  }

  button.loginButton {
    width: 100%;

    box-sizing: border-box;
    margin: 0px;
    margin-top: 16px;
  }
</style>

<div class="loginFormContainer">
  <div class="loginHeader">
    <h1>Login</h1>
  </div>
  <div class="loginForm">
    <input bind:this={usernameInput} type="text" name="username" placeholder="Username" />
    <input bind:this={passwordInput} type="password" name="username" placeholder="Password" />

    <button bind:this={loginButton} class="loginButton" on:click={onLogin} on:keypress={onLogin}>Login</button>
  </div>
</div>
