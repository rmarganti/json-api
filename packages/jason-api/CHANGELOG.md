# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Dependency list is no longer need for hooks, and `propsToWatch`
  is no longer necessary for High Order Components.
- In-progress requests are handled better when an action change or
  component unmount occurs.

## [1.0.0] - 2020-02-17
### Added
- Hooks (`useItem()`, `useCollection()`, `useRequest()`, `useAutoRequest`)
- Code examples for both hooks and higher order components.

### Changed
- Complete rewrite from ground up.
- Much stronger & flexible typing.
- Replaced `JASON_API_REQUEST` actions with `jasonApiRequest()` action creator.
- Renamed `withQuery()` to `withAutoRequest()` to more closely match `useAutoRequest()`.
- `withAutoRequest()` uses `actionFactory` that expects the result of a `jasonApiRequest()`
  instead of `queryFactory`, which simply expected a Promise.

### Fixed
- Typing is compatible with recent versions of React and Typescript.

## [0.9.0] - 2018-04-15
### Added
- Initial public release.
