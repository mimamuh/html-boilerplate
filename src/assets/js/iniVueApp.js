import Vue from 'vue';
import VueTouch from 'vue-touch';

// components
import VueExample from './../../404/VueExample.vue';

// register directives
Vue.use(VueTouch);

// register components
Vue.component('vue-example', VueExample);

/*
  –– iniVueApp()

  call this function to ini your vue-app on your html-page
  This function reads the global window.vueAppData var
  and uses it as default data values. This way you can pass
  down data to your components by setting vueAppData

  for example with a simple script tag withing your html file
  like so:

  <script type="text/javascript">
    var myData = { example: 'text' };

    // merge data to global vueAppData scope which our iniVueApp() uses later ...
    window.vueAppData = Object.assign({}, window.vueAppData || {}, {
      myData: myData,
    });
  </script>

  And in our html file we can pass down this data to a
  component like so:

  <my-component
    :data="myData"
  ></my-component>
*/
function iniVueApp({ element }: { element: string | HTMLElement }) {
	const app = new Vue({
		el: element,
		data: window.vueAppData ? window.vueAppData : {},
	});
	console.log(app);
	return app;
}

export default iniVueApp;
