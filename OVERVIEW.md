# openings.dev Overview

openings.dev is a global tech jobs aggregator powered by GitHub issues.

Instead of relying on traditional job boards, the platform tracks curated community repositories where job openings are posted as issues. Every issue is ingested, normalized, enriched, and indexed so people can search opportunities from multiple ecosystems in one place.

## What the platform does

- Tracks community job repositories across regions like Brazil, Portugal, Angola, LATAM, and beyond.
- Normalizes issue content into a shared jobs schema.
- Enriches records with metadata such as stack, seniority, remote status, and location.
- Powers both the web experience and API from the same underlying index.

## Why this matters

A lot of high-quality job opportunities never reach mainstream job boards. They stay inside niche communities and move fast. openings.dev makes this market easier to discover without losing the original context from each source repository.

## Data flow summary

1. Ingestion workers monitor configured repositories.
2. New and updated issues are parsed and normalized.
3. Metadata is enriched for better filtering and search quality.
4. Records are indexed and exposed to the app and API.

## Current scope

The project is focused on tech roles published through community GitHub repositories. It does not replace company career sites and should be treated as an indexed discovery layer.
