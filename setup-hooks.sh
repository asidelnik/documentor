#!/bin/sh

# Configure Git to use the custom hooks directory
git config core.hooksPath .githooks

echo "Git hooks path configured to use .githooks directory"