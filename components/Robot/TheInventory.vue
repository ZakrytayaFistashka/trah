<template>
  <div>
    <div v-if="inventory && inventory.todo && !finish" :class="['robot--inventory', {'robot--inventory-tips': showInventoryTips}]">
      <div v-for="(item, key) in inventory" :key="key" class="robot--inventory-item" @click="getInventoryItem(item)">
        <img :src="require(`~/assets/${item.icon}.svg`)"/>
        <div class="robot--inventory-desc">
          <img :src="require(`~/assets/${item.icon}.svg`)"/>
          <p><the-word :word="item.text"/></p>
        </div>
      </div>
      <div v-if="inventory && inventory.todo" :class="['robot--inventory-todo', {'robot--inventory-todo-active': todo || inventory.todo.fixed}, {'robot--inventory-todo-fixed': inventory.todo.fixed}]">
        <div class="robot--inventory-todo--back" @click="toDoListVIsibility(false)"/>
        <div class="robot--inventory-todo--wrap">
          <h2 class="robot--inventory-todo--title">{{ inventory.todo.text }}</h2>
          <p v-for="(task, key) in inventory.todo.tasks" :key="key" class="robot--inventory-todo--task">
            <span class="robot--inventory-todo--text">
              <span class="robot--inventory-todo--text-label">{{ task.text }}</span>
            </span>
            <span v-if="tasks" class="robot--inventory-todo--status">{{ tasks[task.slug] ? '✅' : '❌' }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TheWord from '~/components/Robot/TheWord.vue';

export default{
  components: {
    TheWord,
  },

  props: {
    showInventoryTips: { type: Boolean, required: true },
    finish: { type: Boolean, required: true },
    tasks: { type: Object, required: true },
    step: { type: Object, required: true },
  },

  data() {
    return {
      todo: false,
    };
  },

  computed: {
    ...mapGetters({
      inventory: 'lesson/inventory',
    }),
  },

  mounted() {
    this.$nextTick(() => {
      if (this.inventory && this.inventory.todo) this.todo = true;
    });
  },

  methods: {
    getInventoryItem(item) {
      if (item.slug === 'todo') this.toDoListVIsibility(true);
      else if (this.step.inventory && this.step.inventory === item.slug) {
        this.$store.commit('user/UPDATE_POINTS', this.step.point);
        this.postActionToTranscipt();
        setTimeout(() => {
          this.nextStep();
        }, 3000);
      }
    },

    toDoListVIsibility(status) {
      this.todo = status;
    },
  },
};
</script>

<style>
.robot{
  &--action{
    transform: translate3d(-50%, 0, 0);
    transition: all .3s ease-in-out;
    pointer-events: none;
    white-space: nowrap;
    border-radius: 25px;
    position: absolute;
    text-align: center;
    padding: 5px 20px;
    background: $dark;
    color: white;
    z-index: 999;
    opacity: 0;
    left: 50%;
    bottom: 0;

    &-active{
      pointer-events: all;
      opacity: 1;
    }

    .robot--action-preview{
      margin: 0 10px;
      height: 40px;
      width: auto;
    }
    .robot--inventory-desc{
      background: #3a3d44;
      border-radius: 10px;
      padding: 4px 8px;
      right: initial;
      width: initial;
      top: -30px;
      left: 0px;

      p{
        padding: 0;
        margin: 0;
      }

      img{
        display: none;
      }

      .word{
        white-space: nowrap;
      }
    }
  }

  &--inventory{
    border-radius: 25px;
    padding: 10px 13px;
    background: $scene;
    position: fixed;
    color: white;
    width: 36px;
    right: 17px;
    top: 100px;

    @media (max-width: $bootstrapMob) {
      display: none;
    }

    &-active{
      pointer-events: all;
      opacity: 1;
    }

    &-tips{
      /*animation: tips 1s linear;
      animation-iteration-count: 2;*/
    }

    &-item{
      display: inline-block;
      position: relative;
      margin: 10px 2px;
      cursor: pointer;

      .word{
        white-space: normal;
      }

      &:hover {
        .robot--inventory-desc{
          pointer-events: all;
          opacity: 1;
        }
      }
    }

    &-todo{
      transition: all .3s ease-in-out;
      pointer-events: none;
      position: fixed;
      height: 100%;
      width: 100%;
      z-index: 99;
      opacity: 0;
      left: 0;
      top: 0;

      &-fixed{
        height: initial;
        font-size: 70%;
        left: initial;
        width: 300px;
        right: 25px;
        top: 60px;

        .robot--inventory-todo--back{
          display: none;
        }
      }

      &-active{
        pointer-events: all;
        opacity: 1;
      }

      &--back{
        background: rgba(0,0,0,.3);
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
      }
      &--wrap{
        padding: 1px 30px 20px;
        border-radius: 20px;
        position: relative;
        background: white;
        margin: 20px auto;
        max-width: 500px;
        color: black;
        width: 80%;
      }
      &--title{
        text-align: center;
      }
      &--text{
        display: inline-block;
        position: relative;

        &-label{
          padding-right: 3px;
          position: relative;
          background: white;
          z-index: 20;
        }

        &:after{
          content: '.................................................................................................';
          position: absolute;
          right: -400px;
          color: #ccc;
          bottom: 0;
        }
      }
      &--task{
        overflow-x: hidden;
      }
      &--status{
        display: inline-block;
        position: relative;
        background: white;
        padding-left: 9px;
        float: right;
      }
    }

    &-desc{
      transition: all .3s ease-in-out;
      border-radius: 25px;
      border-top-right-radius: 0;
      padding: 20px 20px 10px;
      pointer-events: none;
      text-align: center;
      position: absolute;
      background: $scene;
      font-size: 80%;
      width: 200px;
      z-index: 99;
      opacity: 0;
      right: 35px;
      top: 0;
    }

    img{
      cursor: pointer;
      max-width: 100%;
      width: 100%;
    }
  }
}
</style>
