# Define variables for paths and commands
CAM_DIR = /var/www/cam
APP_DIR = $(CAM_DIR)/apps/online-registration
BUILD_CMD = npx nx build online-registration --prod
RESET_CMD = npx nx reset
PM2_CMD = pm2 start ecosystem.config.cjs

# Default target that will be executed when you run 'make'
.PHONY: all
all: clean reset build start

# Clean up the .output directory in the online-registration app
.PHONY: clean
clean:
	@echo "Cleaning .output directory in $(APP_DIR)..."
	@rm -rf $(APP_DIR)/.output

# Reset the NX workspace
.PHONY: reset
reset:
	@echo "Running NX reset..."
	@cd $(CAM_DIR) && $(RESET_CMD)

# Build the online-registration app
.PHONY: build
build:
	@echo "Building online-registration app..."
	@cd $(CAM_DIR) && $(BUILD_CMD)

# Start the app with PM2
.PHONY: start
start:
	@echo "Starting online-registration app with PM2..."
	@cd $(APP_DIR) && $(PM2_CMD)

# If you want to reset, build, and start individually
.PHONY: clean-reset
clean-reset: clean reset

.PHONY: build-start
build-start: build start

