<template>
  <div>
    {{$t('m.needtodev')}}
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    changetabbar () {
      uni.setNavigationBarTitle({
        title: this.$t('m.qmessage')
      });    }
  },
  mounted () {
    this.changetabbar()
  }
}
</script>
