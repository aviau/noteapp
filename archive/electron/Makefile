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

.PHONY: build-ui
build-ui: node_modules
	npm run build:ui

.PHONY: build-worker
build-worker: node_modules
	npm run build:worker

.PHONY: build
build: build-main build-ui build-worker

.PHONY: test
test: node_modules \
		build \
	npm run test

.PHONY: package
package: node_modules
	npm run package

.PHONY: clean
clean:
	rm -rf node_modules \
			release/build \
			release/app/dist
