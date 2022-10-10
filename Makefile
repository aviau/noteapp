.PHONY: run
run: node_modules
	npm run tauri dev

.PHONY: build
build: node_modules
	npm run tauri build

node_modules:
	npm ci

.PHONY: format
format: node_modules
	cd src-tauri && cargo fmt
	npm run lint:fix

.PHONY: clean
clean:
	rm -rf node_modules
	rm -rf dist
