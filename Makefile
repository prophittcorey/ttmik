.PHONY: clean copy v2 v3

# Clean up the build directory.
clean:
	rm -rf build

# Copy's the main extension content to the build directory.
copy:
	@mkdir -p build
	@cp -r assets/ build/assets
	@cp -r js/ build/js

# This is a build for manifest version 2.
v2: clean copy
	cp manifest.v2.json build/manifest.json
	cd build; zip -r ttmik-v2.zip .; cd ..

# This is a build for manifest version 3.
v3: clean copy
	cp manifest.json build/
	cd build; zip -r ttmik-v3.zip .; cd ..
