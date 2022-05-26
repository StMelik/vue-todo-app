<template>
  <div class="container"></div>
  <FormAdd />
  <AppTitle />
  <AppFilter />
  <AppList />
  <teleport to="body">
    <transition name="popup">
      <PopupFilter v-if="isOpenPopup" />
    </transition>
  </teleport>

  <button class="popup__close-button" @click="setIsOpenPopup(true)"></button>
</template>

<script>
import FormAdd from './components/FormAdd/FormAdd.vue'
import AppTitle from './components/AppTitle/AppTitle.vue'
import AppFilter from './components/AppFilter/AppFilter.vue'
import AppList from './components/AppList/AppList.vue'
import PopupFilter from './components/PopupFilter/PopupFilter.vue'

import { mapMutations, mapState } from 'vuex';

export default {
  name: 'App',
  components: {
    FormAdd,
    AppTitle,
    AppFilter,
    AppList,
    PopupFilter
  },

  computed: {
    ...mapState({
      isOpenPopup: state => state.appStatus.isOpenPopup,
    }),
  },

  methods: {
    ...mapMutations({
      setFilters: 'appStatus/setFilters',
      setIsOpenPopup: 'appStatus/setIsOpenPopup',
      clearList: 'taskData/clearList',
    }),
  }
}
</script>

<style lang="scss">
@import './constants/colors.scss';
@import './constants/templates.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: $bg;
}

#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
}

.popup__close-button {
  @extend %btn;
  @extend %bgi;
  display: none;
  position: fixed;
  z-index: 50;
  background-image: url('@/assets/images/icons/filter-icon.svg');
  border: 2px solid $input;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-size: 40px 40px;
  bottom: 25px;
  right: 25px;
  opacity: .5;

  @media screen and (max-width: 620px) {
    display: block;
  }
}

.popup-enter-active,
.popup-leave-active {
  transition: transform .4s, opacity .3s;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: translateX(0%);
}
</style>
