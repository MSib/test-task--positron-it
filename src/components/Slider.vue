<script setup>
import { ref, onMounted } from 'vue'

const { data } = defineProps(['data'])
const { title, slides } = data

const slideWidth = 305
const slidesGap = 20

const sliderElement = ref(null)

const slideIndex = ref(0)
const slidesTotal = slides.length
const slidesPerPage = ref(null)
const currentPage = ref(1)
const slidesOnPage = ref([])
const pagesTotal = ref(1)

function prevPage() {
  const difference = slideIndex.value - slidesPerPage.value
  const remainder = slidesTotal % slidesPerPage.value
  const subtrahend = remainder > 0 ? remainder : slidesPerPage.value
  slideIndex.value = difference < 0 ? slidesTotal - subtrahend : difference
  restructure()
}

function nextPage() {
  const sum = slideIndex.value + slidesPerPage.value
  slideIndex.value = sum < slidesTotal ? sum : 0
  restructure()
}

function restructure(newSlidesPerPage = slidesPerPage.value) {
  slidesPerPage.value = newSlidesPerPage
  pagesTotal.value = Math.ceil(slidesTotal / newSlidesPerPage)
  const floorSlideIndex =
    slideIndex.value - (slideIndex.value % slidesPerPage.value)
  currentPage.value = Math.ceil(floorSlideIndex / slidesPerPage.value) + 1
  slidesOnPage.value = slides.slice(
    floorSlideIndex,
    floorSlideIndex + slidesPerPage.value
  )
}

function onSliderResize(trackWidth) {
  let newSlidesPerPage = Math.floor(
    (trackWidth + slidesGap) / (slideWidth + slidesGap)
  )
  newSlidesPerPage = newSlidesPerPage > 0 ? newSlidesPerPage : 1
  if (slidesPerPage.value !== newSlidesPerPage) {
    restructure(newSlidesPerPage)
  }
}

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    let width
    if (entry.contentBoxSize) {
      const contentBoxSize = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize
      width = contentBoxSize.inlineSize
    } else {
      width = entry.contentRect.width
    }
    onSliderResize(width)
  }
})

function baseCurrency(item) {
  return (
    item.priceRange.baseCurrency.start.toLocaleString() +
    ' ' +
    item.priceRange.baseCurrency.sign +
    ' – ' +
    item.priceRange.baseCurrency.end.toLocaleString() +
    ' ' +
    item.priceRange.baseCurrency.sign
  )
}

function additionalCurrency(item) {
  return (
    item.priceRange.additionalCurrency.start.toLocaleString() +
    ' ' +
    item.priceRange.additionalCurrency.sign +
    ' – ' +
    item.priceRange.additionalCurrency.end.toLocaleString() +
    ' ' +
    item.priceRange.additionalCurrency.sign
  )
}

onMounted(() => {
  resizeObserver.observe(sliderElement.value)
})
</script>

<template>
  <section class="slider">
    <h2 class="slider__title">{{ title }}</h2>
    <div
      class="slider__navigation navigationSlider"
      aria-label="Навигация по слайдам"
    >
      <button
        class="navigationSlider__perv"
        @click="prevPage()"
        aria-label="Предыдущая страница слайдов"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="20"
          viewBox="0 0 10 20"
          fill="none"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m9 19-8-9 8-9"
          />
        </svg>
      </button>
      <p class="navigationSlider__pages">
        <span class="navigationSlider__current">{{ currentPage }}</span> /
        {{ pagesTotal }}
      </p>
      <button
        class="navigationSlider__next"
        @click="nextPage()"
        aria-label="Следующая страница слайдов"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="20"
          viewBox="0 0 10 20"
          fill="none"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 8 9-8 9"
          />
        </svg>
      </button>
    </div>

    <div class="slider__track" ref="sliderElement">
      <article
        v-for="(item, index) in slidesOnPage"
        :key="index"
        class="slider__slide slide"
        :id="index"
      >
        <figure class="slide__figure">
          <img
            :src="item.image.url"
            :alt="item.image.alt"
            :width="item.image.width"
            :height="item.image.height"
            class="slide__image"
            loading="lazy"
          />
        </figure>
        <h3 class="slide__title">{{ item.title }} {{ item.id }}</h3>
        <p class="slide__description">{{ item.description }}</p>
        <p class="slide__price-base">{{ baseCurrency(item) }}</p>
        <p class="slide__price-additional">{{ additionalCurrency(item) }}</p>
        <a :href="item.url" class="slide__link">Подробнее</a>
      </article>
    </div>
  </section>
</template>

<style>
.slider {
  margin: 95px 0;
  gap: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.slider__title {
  margin: 0;
  font-size: 30;
  line-height: 120%;
  font-weight: 600;
}

/* .slider__navigation {} */

.slider__track {
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 20px;
}

/* .slider__slide {} */

/* Navigation Slider */
.navigationSlider {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.navigationSlider__perv,
.navigationSlider__next {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  line-height: 0;
  border: none;
  color: var(--c-bg);
  background-color: var(--color-blue-paler);
  outline: none;
}

.navigationSlider__perv:hover,
.navigationSlider__perv:focus-visible,
.navigationSlider__next:hover,
.navigationSlider__next:focus-visible {
  box-shadow: 0px 0px 0px 3px var(--c-bg),
    0px 0px 0px 6px var(--color-blue-paler);
}

.navigationSlider__perv:active,
.navigationSlider__next:active {
  color: var(--color-blue-paler);
  background-color: var(--c-bg);
}

.navigationSlider__pages {
  margin: 0 15px 0 20px;
  font-size: 18px;
  line-height: 150%;
  color: var(--c-middle-text);
}

.navigationSlider__current {
  font-size: 24px;
  line-height: 150%;
  font-weight: 500;
  color: var(--color-black-200);
}

/* Slide */
.slide {
  padding: 25px;
  width: 305px;
  min-height: 563px;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  border-radius: 5px;
  background-color: var(--c-medium-bg);
  box-sizing: border-box;
}

.slide__figure {
  margin: 0 auto 5px;
  line-height: 0;
}

/* .slide__image {} */

.slide__title {
  margin: 0;
  margin-bottom: 10px;
  font-size: 22px;
  line-height: 120%;
}

.slide__description {
  margin: 0;
  margin-bottom: 20px;
  font-size: 14px;
  line-height: 145%;
}

.slide__price-base {
  margin: 0;
  margin-top: auto;
  margin-bottom: 3px;
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  line-height: 130%;
  font-weight: 500;
  letter-spacing: 0.1px;
}

.slide__price-additional {
  margin: 0;
  margin-bottom: 20px;
  color: var(--c-middle-text);
  font-size: 16px;
  line-height: 145%;
}

.slide__link {
  padding: 14px;
  font-size: 16px;
  line-height: 145%;
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  color: var(--c-bg);
  background-color: var(--c-accent);
  border-radius: 4px;
  outline: none;
}

.slide__link:hover,
.slide__link:focus-visible {
  box-shadow: 0px 0px 0px 3px var(--c-medium-bg),
    0px 0px 0px 6px var(--c-accent);
}

.slide__link:active {
  color: var(--c-accent);
  background-color: var(--c-bg);
}
</style>
