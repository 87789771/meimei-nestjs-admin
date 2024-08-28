<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'RuoYiDoc',
  data() {
    return {
      url: 'https://87789771.github.io/#/'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>