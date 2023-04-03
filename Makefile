.PHONY: run
run: node_modules
	npm run tauri dev

.PHONY: build
build: node_modules
	npm run tauri build

node_modules:
	npm ci

.PHONY: lint
lint: node_modules
	cd src-tauri && cargo fmt --check
	npm run lint

.PHONY: format
format: node_modules
	cd src-tauri && cargo fix --allow-staged --allow-dirty
	cd src-tauri && cargo fmt
	npm run lint:fix

.PHONY: test
test: node_modules
	cd src-tauri && cargo test

.PHONY: clean
clean:
	rm -rf node_modules
	rm -rf dist
	rm -rf src-tauri/target
