
build: components todo-component-example.css
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

test:
	./node_modules/.bin/testacular start

.PHONY: clean
