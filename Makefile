node_modules: package-lock.json
	npm install

.PHONY: lint
lint: node_modules
	npm run lint

.PHONY: lint-fix
lint-fix: node_modules
	npm run lint:fix

.PHONY: run
run: node_modules
	npm run start

.PHONY: build-main
build-main: node_modules
	npm run build:main

.PHONY: build-renderer
build-renderer: node_modules
	npm run build:renderer

.PHONY: build-worker
build-worker: node_modules
	npm run build:worker

.PHONY: test
test: node_modules \
		build-main \
		build-worker \
		build-renderer
	npm run test

.PHONY: package
package: node_modules
	npm run package

.PHONY: clean
clean:
	rm -rf node_modules \
			release/build \
			release/app/dist \
			.erb/dll/*.js \
			.erb/dll/*.json
