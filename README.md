# yuni-chanz-react-firebase
Firebase integration plugin for yuni-chanz-react.

## Versions
### 0.4.1
#### Changes
- Updated base package.

### 0.4.0
#### Changes
- Changed dependent package `bindable-bloc` to `bindable-data`.

### 0.3.0
#### Changes
- Removed the importing of firebase modules in `FirebaseApi`.

### 0.2.0
#### Changes
- Re-implemented default logics for `FirebaseStreamableDataApi.request` and `FirebaseStreamableQueryApi.request`.
#### Fixes
- Fixed integration with the core package again regarding change in `IStreamableDataApi`.

### 0.1.0
#### Changes
- Fixed return type of `request()` in `FirebaseApi`.
- Removed default implementation of `request()` in streamable api classes.

### 0.0.1
#### New features
- Implemented abstract API classes for Firebase integration.
- Implemented a base Firebase model conversion class.