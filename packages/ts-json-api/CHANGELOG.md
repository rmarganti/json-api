# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2021-09-14
### Fixed
- Support `null` as value in `Attributes`.

## [1.1.1] - 2021-01-08
### Added
- `publication links` interface as part of the JSON:API 1.0 specification

### Changed
- `meta` key in `link` object to be optional to be JSON:API 1.0 compliant

## [1.0.0] - 2020-02-17
### Changed
- Moved to [TSDX](https://https://github.com/palmerhq/tsdx) for development.

### Fixed
- Correctly type `Relationship` types for arrays.
- Requests do not require that a Resource Object has an `id`.
