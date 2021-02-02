/**
 * DO OT CHANGE THIS FILE!
 * For better understanding of this architecture, look at './strapi.js'
 * this file just act like a router!
 * @type {{head: {}, data: {}, getCommonMounted(), getMethods: {}, getCommonComputed: {}}}
 */
import common from './common.js'

let customListPageHelper = require(`./strapi`).default || {};
try {
  customListPageHelper = {};
} catch (e) {
  console.error({e})
}

export default {
  mixins: [common, customListPageHelper],
  // alernative
  mounted() {
    let name = _.get(this, 'api', undefined);
    this.loadData();
  }
}
