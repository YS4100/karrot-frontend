<template>
  <div>
    <h5>
      {{ user.unverifiedEmail }}
    </h5>
    <q-spinner v-if="isPending" />
    <p v-if="success">
      {{ $t('VERIFYMAIL.SUCCESS') }}
    </p>
    <p v-if="hasAnyError">
      <i class="fa fa-exclamation-triangle"/>
      {{ anyFirstError }}
    </p>
    <router-link to="/">
      <q-btn
        v-t="'NOT_FOUND.HOME'"
        icon-right="fa-home"
        color="secondary"
        push
      />
    </router-link>
  </div>
</template>

<script>
import { QSpinner, QBtn } from 'quasar'
import statusMixin from '@/mixins/statusMixin'

export default {
  components: { QSpinner, QBtn },
  mixins: [statusMixin],
  props: {
    success: { required: true, type: Boolean },
    user: { required: true, type: Object },
  },
}
</script>

<style scoped lang="stylus">
</style>
