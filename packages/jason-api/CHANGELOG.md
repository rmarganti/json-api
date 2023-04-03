# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

-   Correctly pass error body to `useRequest()` error state.

## [1.3.7] - 2022-10-19

### Fixed

-   Cache-checking clashes in `useAutoRequest()` when changing action shape.

## [1.3.6] - 2022-10-11

### Fixed

-   Avoid double-fetch in `useAutoRequest()`.

## [1.3.5] - 2022-07-19

### Changed

-   Bump `ts-json-api` version.

## [1.3.4] - 2022-06-02

### Fixed

-   `cacheOnce` does not cause `useAutoRequest()` to get stuck in loading state.

## [1.3.3] - 2022-01-17

### Fixed

-   Types allow last parameter to be omitted for `addRelationshipOnSuccess` and `setRelationshipOnSuccess`.

## [1.3.2] - 2021-09-14

### Changed

-   Update `ts-json-api` to 1.1.2.

## [1.3.1] - 2021-09-02

### Fixed

-   Addressed build issue.

## [1.3.0] - 2021-09-02

### Added

-   Added `suppressError` option to request config.

### Changed

-   In event of an API error, the middleware throws a JSONAPIError instead of a plain object.

## [1.2.1] - 2021-01-21

### Added

-   Add `queryCache` option to control when `useRequest()`
    and `useAutoRequest()` query the cache.

### Changed

-   Updated axios dependency.

## [1.1.1] - 2020-07-06

### Changed

-   Dependency list is no longer need for hooks, and `propsToWatch`
    is no longer necessary for High Order Components.
-   In-progress requests are handled better when an action change or
    component unmount occurs.

## [1.0.0] - 2020-02-17

### Added

-   Hooks (`useItem()`, `useCollection()`, `useRequest()`, `useAutoRequest`)
-   Code examples for both hooks and higher order components.

### Changed

-   Complete rewrite from ground up.
-   Much stronger & flexible typing.
-   Replaced `JASON_API_REQUEST` actions with `jasonApiRequest()` action creator.
-   Renamed `withQuery()` to `withAutoRequest()` to more closely match `useAutoRequest()`.
-   `withAutoRequest()` uses `actionFactory` that expects the result of a `jasonApiRequest()`
    instead of `queryFactory`, which simply expected a Promise.

### Fixed

-   Typing is compatible with recent versions of React and Typescript.

## [0.9.0] - 2018-04-15

### Added

-   Initial public release.
