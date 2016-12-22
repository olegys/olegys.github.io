import Vue from 'vue'
import Feedback from '../components/feedback';
import '../components/config';

require('../scss/styles.scss');
 
new Vue({
  	el: '#main',

    components: {
      Feedback
    }
});  