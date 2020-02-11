# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   Hooks (`useItem()`, `useCollection()`, `useRequest()`, `useAutoRequest`)
-   Code examples for both hooks and higher order components.

### Changed

-   Complete rewrite from ground up.
-   Much stronger & flexible typing.
-   Replaced `JASON_API_REQUEST` actions with `jasonApiRequest()` action creator.
-   `withQuery()` uses `actionFactory` that expects the result of a `jasonApiRequest()`
    instead of `queryFactory`, which simply expected a Promise.

### Fixed

-   Typing is compatible with recent versions of React and Typescript.

## [0.9.0] - 2018-04-15

### Added

-   Initial public release.
