<template>
  <div class="form">
    <div class="form-wrapper">
      <h2>Form validation with VeeValidate</h2>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            name="name"
            rules="required|min:3|max:15|alpha_spaces"
            :bails="false"
            v-slot="{ classes, errors, valid }"
          >
            <div class="control" :class="classes">
              <label>First Name</label><br />
              <input type="text" v-model="name" />
              <span v-if="valid">The field is valid!</span>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            name="email"
            rules="required|email|isExist"
            :bails="false"
            v-slot="{ classes, errors, valid }"
          >
            <div class="control" :class="classes">
              <label>Email</label><br />
              <input type="text" v-model="email" />
              <span v-if="valid">The field is valid!</span>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationProvider
            name="age"
            rules="required|between:18,21|digits:2"
            :bails="false"
            v-slot="{ classes, errors, valid }"
          >
            <div class="control" :class="classes">
              <label>Age</label><br />
              <input type="number" v-model="age" />
              <span v-if="valid">The field is valid!</span>
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <ValidationObserver>
            <ValidationProvider
              name="password"
              rules="required|min:6"
              vid="confirmation"
              v-slot="{ classes, errors, valid }"
            >
              <div class="control" :class="classes">
                <label>Password</label><br />
                <input v-model="password" type="password" />
                <span v-if="valid">The field is valid!</span>
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>

            <ValidationProvider
              name="confirm password"
              rules="confirmed:confirmation|required"
              v-slot="{ errors, valid, classes }"
            >
              <div class="control" :class="classes">
                <label>Confirm password</label><br />
                <input v-model="confirmation" type="password" />
                <span v-if="valid">The field is valid!</span>
                <span>{{ errors[0] }}</span>
              </div>
            </ValidationProvider>
          </ValidationObserver>
          <button type="submit" class="button button-animation">Submit</button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      age: 0,
      password: "",
      confirmation: "",
    };
  },
  methods: {
    onSubmit() {
      alert("Form has been submitted!");
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

.control {
  width: 100%;

  span {
    display: block;
  }

  input {
    padding: 5px 10px;
    border: 2px grey solid;
    outline: none;
    font-size: 18px;
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    &:focus {
      animation-name: animation;
      animation-duration: 0.5s;
      border: 2px rgba(0, 140, 255, 0.6) solid;
      outline: 0 none;
    }
  }

  &.invalid {
    span {
      color: #eb0600;
      animation-name: animation;
      animation-duration: 0.5s;
    }

    input {
      border: 2px rgba(255, 44, 29, 0.6) solid;
    }
  }

  &.valid {
    span {
      color: #045929;
      animation-name: animation;
      animation-duration: 0.5s;
    }
    input {
      border: 2px rgba(0, 119, 40, 0.6) solid;
    }
  }

  @keyframes animation {
    from {
      color: transparent;
    }
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
</style>
