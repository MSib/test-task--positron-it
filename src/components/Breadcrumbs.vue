<script setup>
const { links } = defineProps(['links'])
</script>

<template>
  <div v-if="links?.length" class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li v-for="(link, index) in links" :key="index" class="breadcrumbs__item">
        <a
          :href="link.url"
          :class="{ 'breadcrumbs__link--inactive': !link.url }"
          class="breadcrumbs__link"
          >{{ link.title }}</a
        >
      </li>
    </ul>
  </div>
</template>
<style>
.breadcrumbs {
  padding: 30px 0;
}

.breadcrumbs__list {
  margin: 0;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 5px 25px;
  list-style: none;
}

.breadcrumbs__item {
  position: relative;
}

.breadcrumbs__item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -15px;
  top: 50%;
  width: 0;
  height: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid currentColor;
  transform: translateY(-30%);
}

.breadcrumbs__link {
  font-size: 14px;
  line-height: 150%;
  color: var(--c-dark-text);
  text-decoration: none;
}

.breadcrumbs__link--inactive {
  color: var(--c-middle-text);
  text-decoration: none;
}

.breadcrumbs__link:not(.breadcrumbs__link--inactive):hover {
  text-decoration: underline;
}
</style>
