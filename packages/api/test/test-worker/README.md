# Miniflare test worker

This directory contains test helper code that's bundled into a separate worker and mounted using Miniflare. This lets us avoid putting a bunch of platform conditionals in the test codebase for things that differ between the CF Worker environment and standard nodejs. For example, we can write code that assumes `fetch`, `Response`, etc are in scope without needing to polyfill, and we can use the CF Worker `NODE-Ed25519` algorithm for signing instead of falling back to a JS implementation.
