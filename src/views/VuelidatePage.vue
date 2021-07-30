<template>
  <div class="form">
    <div class="form-wrapper">
      <h2>Form validation with Vuelidate</h2>
      <fieldset class="float-label-field">
        <label for="firstname">First Name</label>
        <input
          id="firstname"
          type="text"
          v-model.trim="$v.firstname.$model"
          :class="{
            'is-invalid': $v.firstname.$error,
            'is-valid': !$v.firstname.$invalid,
          }"
        />
        <div class="valid-feedback">Your first name is valid</div>
        <div class="invalid-feedback">
          <span v-if="!$v.firstname.required">First name is required</span>
          <span v-if="!$v.firstname.minLength"
            >First name must have at least
            {{ $v.firstname.$params.minLength.min }} characters
          </span>
          <span v-if="!$v.firstname.maxLength"
            >First name must have at most
            {{ $v.firstname.$params.maxLength.max }} characters
          </span>
        </div>
      </fieldset>
      <fieldset class="float-label-field">
        <label for="email">Email</label>
        <input
          id="email"
          type="text"
          v-model.trim="$v.email.$model"
          :class="{
            'is-invalid': $v.email.$error,
            'is-valid': !$v.email.$invalid,
          }"
        />
        <div class="valid-feedback">Your email is valid</div>
        <div class="invalid-feedback">
          <span v-if="!$v.email.required">First name is required</span>
          <span v-if="!$v.email.email">Your email is invalid</span>
        </div>
      </fieldset>
      <fieldset class="float-label-field">
        <label for="password">Password</label>
        <input id="password" type="password" />
      </fieldset>
      <fieldset class="float-label-field">
        <label for="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" />
      </fieldset>
      <button class="button button-animation" @click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  required,
  minLength,
  maxLength,
  between,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "Vuelidate",
  data() {
    return {
      firstname: "",
      email: "",
      age: 0,
    };
  },
  validations: {
    firstname: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(10),
    },
    email: {
      required,
      email,
    },
    age: {
      between: between(10, 20),
    },
  },
  methods: {
    submit() {
      alert("Form submitted");
    },
  },
};
</script>

<style lang="scss" scoped>
$button-color: #4b4b4b;
.form {
  display: flex;
  justify-content: center;
  align-items: center;
  &-wrapper {
    padding: 20px;
    background: rgb(65, 184, 131);
    border-radius: 15px;
    & h2 {
      color: white;
    }
  }
}

.modern-form {
  width: 500px;
  margin: 30px auto;
  background-color: #fff;
  border: solid 1px #ccc;
  padding: 20px 10px;
  & h3 {
    text-align: center;
  }
}

.float-label-field {
  border: none;
  outline: none;
  position: relative;
  margin: 0 0 20px 0;
  padding: 0;
  box-sizing: border-box;
  & input {
    border: none;
    outline: none;
    padding: 5px 5px 8px 10px;
    width: 100%;
    font-size: 18px;
    border-bottom: solid 1px #efefef;
    border-radius: 5px;
  }
  & label {
    color: white;
  }
}

.button {
  background-color: $button-color; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 10px;
  &-animation {
    background-color: white;
    color: black;
    &:hover {
      background-color: $button-color;
      color: white;
    }
  }
}

.valid-feedback {
  animation-name: animation;
  animation-duration: 0.4s;
}

.invalid-feedback {
  animation-name: animation;
  animation-duration: 0.4s;
}

@keyframes animation {
  from {
    color: transparent;
  }
}
</style>
