export default {
  data() {
    return {
      loader: false,
    }
  },
  mounted() {
    this.loadData();
  },
  watch: {
    value: {
      handler(val) {
        this.formData = val;
      },
      deep: true
    },
    formData: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  methods: {
    loadData() {
      let id = _.get(this.formData, 'id', null);
      if (!id) return;
      this.loader = true;
      this.$axios.$get(this.resource + '/' + id).then(res => {
        //console.log({res})
        this.formData = {id, ...res};
      }).catch(err => {
        this.$notifError(err);
      }).finally(() => {
        this.loader = false;
      })
    },
    update(oldId, property, val) {
      let id = _.get(this.formData, 'id', _.get(this, 'id', oldId));
      //console.log({oldId, formData: this.formData, id, property, val})
      if (!id) return this.$notifError(this.$t('can_not_update'));
      let data = {};
      data[property] = val;
      return this.$axios.$put(this.resource + '/' + id, data).then(res => {
        this.loadData();
        this.$notifSuccess(this.$t('successful'))
      }).catch(err => {
        this.$notifError(this.$t(err))
      })
    },
    save() {
      this.loader = true;
      let formData = this.formData;
      //console.log({formData})
      let id = this.formData.id;
      let response;
      if (id) {
        response = this.$axios.$put(this.resource + '/' + id, formData);
      } else {
        response = this.$axios.$post(this.resource, formData);
      }
      response.then(res => {
        this.$notifSuccess(this.$t('successful'))
        this.formData.id = _.get(res, 'id', id);
      }).catch(e => {
        this.$notifError(e)
      }).finally(() => {
        this.loader = false;
      })
    }
  }
}
