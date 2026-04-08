.PHONY: install dev build lint clean

install:
	pnpm install

dev:
	pnpm dev

build:
	pnpm build

lint:
	pnpm lint

clean:
	rm -rf .next
