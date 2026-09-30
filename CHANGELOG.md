# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

- Initial project setup with OpenAPI specification and CI validation.
- OpenAPI specification with CRUD over `/dmps` and content negotiation.

### Changed

- Aligned the specification with version 1.3 of the RDA DMP Common Standard (API version `0.2.0`):
  - Changed the standard media type to `application/vnd.org.rd-alliance.dmp-common.v1.3+json` and documented optional support for earlier versions (e.g. 1.2) via content negotiation.
  - Added `restricted` as a value of `data_access` and deprecated `shared` ([RDA-DMP-Common-Standard#150](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard/pull/150)).
  - Changed `url` in `Host` to optional ([RDA-DMP-Common-Standard#152](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard/issues/152)).
  - Changed `pid_system` in `Host` to suggested values instead of a fixed list ([RDA-DMP-Common-Standard#146](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard/issues/146)).
  - Recommended ROR for `funder_id` in `Funding` ([RDA-DMP-Common-Standard#145](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard/issues/145)).
  - Clarified `host_id` vs. `url` in `Host` and extended suggested `host_id` types ([RDA-DMP-Common-Standard#144](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard/issues/144)).
  - Clarified `is_reused` together with `related_identifier` in `Dataset` ([RDA-DMP-Common-Standard#143](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard/issues/143)).
  - Fixed descriptions of `backup_type` and `storage_type` in `Host` ([RDA-DMP-Common-Standard#153](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard/issues/153)).
- Expanded `README.md` with implementation guidance, local validation steps, and contribution/changelog references.
- Added a README recommendation for API discovery via the RFC 9727 `/.well-known/api-catalog` Linkset format.
