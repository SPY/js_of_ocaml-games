concat_js:
	cat js/lib.js > all.js
	cat js/js_scenario.js >> all.js

concat_ml: ml_scenario
	cat js/lib.js > all.ml.js
	cat ml/ml_scenario.js >> all.ml.js

node: concat_js concat_ml
	node all.js > js.log
	node all.ml.js > ml.log

ml_lib:
	ocamlfind ocamlc -package js_of_ocaml -syntax camlp4o -package js_of_ocaml.syntax -c ml/lib.ml

ml_scenario: ml_lib
	cd ml && \
	ocamlfind ocamlc -package js_of_ocaml -syntax camlp4o -package js_of_ocaml.syntax -linkpkg -o ml_scenario.byte lib.cmo ml_scenario.ml && \
	js_of_ocaml ml_scenario.byte
