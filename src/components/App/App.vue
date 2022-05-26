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
import FormAdd from '@/components/FormAdd/FormAdd.vue'
import AppTitle from '@/components/AppTitle/AppTitle.vue'
import AppFilter from '@/components/AppFilter/AppFilter.vue'
import AppList from '@/components/AppList/AppList.vue'
import PopupFilter from '@/components/PopupFilter/PopupFilter.vue'

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
@import './App'
</style>
