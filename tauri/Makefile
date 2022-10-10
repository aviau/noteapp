.PHONY: run
run:
	npm run tauri dev

node_modules:
	npm ci

.PHONY: format
format: node_modules
	cd src-tauri && cargo fmt
	npm run lint:fix

.PHONY: clean
clean:
	rm -rf node_modules
