import Vue from 'vue';

var Feedback = Vue.component('feedback', {
template: `
<div class="contacts">
	<form class="contacts__form" @submit.prevent="onSubmit">
		<h1>Contact Us</h1>
		<input class="contacts__name" type="text" v-model="obj.name" placeholder="Enter your Name">

		<input class="contacts__email" type="email" v-model="obj.email" placeholder="Enter your Email">

		<textarea class="contacts__comment" rows="5" v-model="obj.comment" placeholder="Enter your Comment..." ></textarea>

		<button type="submit" class="contacts__submit">Send</button>
	</form>
</div>`
,
  	data() {
	    return {
			obj: {name: "", email: "", comment: ""}
	    }
	},
    methods: {
    	onSubmit() {
	      	this.$http.post('/scripts/feedback.php', this.obj)
	        .then(res => {
	        alert(res.body);
	        }, (err) => {
	        alert('feedback', err);
	       	});
    	}
    }

});

export default Feedback;
