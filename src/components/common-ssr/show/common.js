import _ from 'lodash'

export default {
  data() {
    return {
      loader: false,
      showBack: true,
      headerIcon: undefined,
      editItem: undefined,
      formData: {},
      title: "",
      resource: "",
      name: "",
      fields: [],
      ...this.value
    }
  },
  mounted() {
    this.loadData();
  },
  watch: {
    value: {
      handler(val) {
        _.assign(this, val);
      },
      deep: true
    }
  },
  computed: {
    getHeaders() {
      let headers = [];
      console.log('fields:', this.fields);
      for (let item of this.fields) {
        if (item.show === undefined || item.show === true) headers.push(item)
      }
      return headers;
    },
    item() {
      return _.get(this, 'value', {});
    }
  },
  created() {
    this._ = _;
  },
  methods: {
    hasPermission(field) {
      try {
        if (_.has(field, 'permission')) return this.can(_.get(field, 'permission', null))
        return true;
      } catch (e) {
        return true;
      }
    },
    canShow(field) {
      try {
        return _.get(field, 'show', undefined) !== false;
      } catch (e) {
        return true;
      }
    }
  }
}
