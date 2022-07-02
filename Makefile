node_modules: package-lock.json
	npm install

.PHONY: run
run: node_modules
	npm run start

.PHONY: clean
clean:
	rm -rf node_modules
