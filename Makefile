concat_js:
	cat js/lib.js > all.js
	cat js/js_scenario.js >> all.js

node: concat_js
	node all.js
