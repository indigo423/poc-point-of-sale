.PHONY: install dev build lint clean help

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-10s %s\n", $$1, $$2}'

install: ## Install dependencies
	pnpm install

dev: ## Start dev server (localhost:3000)
	pnpm dev

build: ## Production build
	pnpm build

lint: ## Run ESLint
	pnpm lint

clean: ## Remove .next build artifacts
	rm -rf .next
