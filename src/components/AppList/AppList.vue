<template>
<ol class="todo-list">
  <li class="todo-list__item process">
    <p class="todo-list__item-num">1. </p>
    <p class="todo-list__item-text">Сходить в магазин</p>
    <button class="todo-list__item-handle todo-list__item-handle_more"></button>
    <div class="todo-list__item-context context-item">
      <button class="context-item__button context-item__button_important"></button>
      <button class="context-item__button context-item__button_done"></button>
      <button class="context-item__button context-item__button_delete"></button>
    </div>
  </li>

  <li class="todo-list__item important">
    <p class="todo-list__item-num">2. </p>
    <p class="todo-list__item-text">Сходить в магазин</p>
    <button class="todo-list__item-handle todo-list__item-handle_more"></button>
    <div class="todo-list__item-context context-item context-item_mini">
      <button class="context-item__button context-item__button_important"></button>
      <button class="context-item__button context-item__button_done"></button>
      <button class="context-item__button context-item__button_delete"></button>
    </div>
  </li>

  <li class="todo-list__item done">
    <p class="todo-list__item-num">3. </p>
    <p class="todo-list__item-text">Сходить в магазин</p>
    <button class="todo-list__item-handle todo-list__item-handle_more"></button>
    <div class="todo-list__item-context context-item">
      <button class="context-item__button context-item__button_important"></button>
      <button class="context-item__button context-item__button_done"></button>
      <button class="context-item__button context-item__button_delete"></button>
    </div>
  </li>

    <li class="todo-list__item done">
    <p class="todo-list__item-num">4. </p>
    <p class="todo-list__item-text">Сходить в магазин</p>
    <button class="todo-list__item-handle todo-list__item-handle_close"></button>
    <div class="todo-list__item-context context-item context-item_mini">
      <button class="context-item__button context-item__button_important"></button>
      <button class="context-item__button context-item__button_done"></button>
      <button class="context-item__button context-item__button_delete"></button>
    </div>
  </li>

    <li class="todo-list__item done">
    <p class="todo-list__item-num">5. </p>
    <p class="todo-list__item-text">Сходить в магазин</p>
    <button class="todo-list__item-handle todo-list__item-handle_close"></button>
    <div class="todo-list__item-context context-item context-item_mini">
      <button class="context-item__button context-item__button_important"></button>
      <button class="context-item__button context-item__button_done"></button>
      <button class="context-item__button context-item__button_delete"></button>
    </div>
  </li>

    <li class="todo-list__item done">
    <p class="todo-list__item-num">6. </p>
    <p class="todo-list__item-text">Сходить в магазин</p>
    <button class="todo-list__item-handle todo-list__item-handle_more"></button>
    <div class="todo-list__item-context context-item context-item_mini">
      <button class="context-item__button context-item__button_important"></button>
      <button class="context-item__button context-item__button_done"></button>
      <button class="context-item__button context-item__button_delete"></button>
    </div>
  </li>


</ol>
  
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import './AppList'
</style> 