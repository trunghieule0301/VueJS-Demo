<template>
  <div class="form">
    <div class="form-wrapper">
      <h2>Form validation with Vuelidate</h2>
      <form @submit.prevent="submit">
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
            <span v-if="!$v.firstname.maxLength">
              First name must have at most
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
            <span v-if="!$v.email.required">Email is required</span>
            <span v-if="!$v.email.email">Email is invalid</span>
            <span v-if="!$v.email.isExist">
              A user with that email already exists!
            </span>
          </div>
        </fieldset>
        <fieldset class="float-label-field">
          <label for="age">Age</label>
          <input
            id="age"
            type="number"
            v-model="$v.age.$model"
            :class="{
              'is-invalid': $v.age.$error,
              'is-valid': !$v.age.$invalid,
            }"
          />
          <div class="valid-feedback">Your age is valid</div>
          <div class="invalid-feedback">
            <span v-if="!$v.age.required">Your age is required</span>
            <span v-if="!$v.age.between">
              Must between {{ $v.age.$params.between.min }} and
              {{ $v.age.$params.between.max }}
            </span>
          </div>
        </fieldset>
        <fieldset class="float-label-field">
          <label for="password">Password</label>
          <input
            v-model.trim="$v.password.$model"
            :class="{
              'is-invalid': $v.password.$error,
              'is-valid': !$v.password.$invalid,
            }"
            id="password"
            type="password"
          />
          <div class="valid-feedback">Your password is valid!</div>
          <div class="invalid-feedback">
            <span v-if="!$v.password.required">Password is required!</span>
            <span v-if="!$v.password.minLength">
              {{ $v.password.$params.minLength.min }} characters minimum.
            </span>
            <span v-if="!$v.password.maxLength">
              {{ $v.password.$params.maxLength.max }} characters maximum.
            </span>
          </div>
        </fieldset>
        <div style="margin: 10px">
          <input
            type="checkbox"
            id="showpassword"
            @click="toggleShowPassword"
            v-model="showpassword"
          />
          <label for="showpassword">Show password</label>
        </div>
        <fieldset class="float-label-field">
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model.trim="$v.confirmPassword.$model"
            :class="{
              'is-invalid': $v.confirmPassword.$error,
              'is-valid': password != '' ? !$v.confirmPassword.$invalid : '',
            }"
            id="confirmPassword"
            type="password"
          />
          <div class="valid-feedback">Password is identical!</div>
          <div class="invalid-feedback">
            <span v-if="!$v.confirmPassword.sameAsPassword">
              Password must be identical
            </span>
          </div>
        </fieldset>
        <fieldset class="float-label-field">
          <label for="phone">Phone number</label>
          <input
            id="phone"
            type="number"
            v-model.trim="$v.phone.$model"
            :class="{
              'is-invalid': $v.phone.$error,
              'is-valid': !$v.phone.$invalid,
            }"
          />
          <div class="valid-feedback">Your phone is valid</div>
          <div class="invalid-feedback">
            <span v-if="!$v.phone.required">Phone number is required</span>
            <span v-if="!$v.phone.numeric">
              This phone number is only numeric accepted
            </span>
            <span v-if="!$v.phone.minLength">
              {{ $v.phone.$params.minLength.min }} characters minimum.
            </span>
          </div>
        </fieldset>
        <fieldset class="float-label-field">
          <label for="url">Website</label>
          <input
            id="url"
            type="url"
            v-model.trim="$v.url.$model"
            :class="{
              'is-invalid': $v.url.$error,
              'is-valid': !$v.url.$invalid,
            }"
          />
          <div class="valid-feedback">Your website is valid</div>
          <div class="invalid-feedback">
            <span v-if="!$v.url.required">Website is required</span>
            <span v-if="!$v.url.url">Your website is invalid</span>
          </div>
        </fieldset>
        <button type="submit" class="button button-animation">
          Submit {{ submitstatus }}
        </button>
      </form>
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
  sameAs,
  numeric,
  url,
} from "vuelidate/lib/validators";
import axios from "axios";

export default {
  name: "Vuelidate",
  data() {
    return {
      firstname: "",
      email: "",
      age: 0,
      password: "",
      confirmPassword: "",
      showpassword: false,
      phone: "",
      url: "",
      submitstatus: null,
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
      isExist(value) {
        if (value === "") return true;
        return new Promise(function (resolve) {
          axios.get("http://127.0.0.1:8000/manage/users").then(function (json) {
            var data = json.data.map((val) => {
              if (val.email === value) return value;
              return "";
            });
            resolve(typeof value === "string" && value !== data[0]);
          });
        });
      },
    },
    age: {
      required,
      between: between(10, 20),
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(16),
    },
    confirmPassword: {
      sameAsPassword: sameAs("password"),
    },
    phone: {
      required,
      numeric,
      minLength: minLength(10),
    },
    url: {
      required,
      url,
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitstatus = "FAIL";
      } else {
        this.submitstatus = "SUCCESS";
      }
    },
    toggleShowPassword() {
      var show = document.getElementById("password");
      if (this.showpassword == false) {
        this.showpassword = true;
        show.type = "text";
      } else {
        this.showpassword = false;
        show.type = "password";
      }
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
  background: rgb(65, 184, 131);
  &-wrapper {
    padding: 20px;
    border-radius: 15px;
    background: white;
    margin: 20px;
  }
}

.modern-form {
  width: 500px;
  margin: 30px auto;
  background-color: #fff;
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
    border-bottom: solid 1px #d3d3d3;
    border-radius: 5px;
  }
}

.button {
  background-color: $button-color; /* Green */
  border: none;
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
    background-color: rgb(139, 139, 139);
    color: rgb(255, 255, 255);
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
