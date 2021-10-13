# yuni-chanz-react-firebase
Firebase integration plugin for yuni-chanz-react.

## Versions
### 0.5.2 (WIP)
#### New features
- Implemented `adjustForFunctions` for `FirebaseModelConverter` to support model conversion which is compatible for use with firebase function arguments.

### 0.5.1
#### Changes
- Increased `yuni-chanz-react` version.
- Changed return value of `FirebaseModelConverter.encodeDate` to `any`.

### 0.5.0
#### Changes
- Upgraded firebase dependency.

### 0.4.2
#### Fixes
- Fixed bug where streamable data and query apis weren't being cancelled on `stopStream` call.

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