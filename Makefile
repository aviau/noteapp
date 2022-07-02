node_modules: package-lock.json
	npm install

.PHONY: lint
lint: node_modules
	npm run lint

.PHONY: run
run: node_modules
	npm run start

.PHONY: test
test: node_modules
	npm run test

.PHONY: package
package: node_modules
	npm run package

.PHONY: clean
clean:
	rm -rf node_modules \
			release/build \
			release/app/dist \
