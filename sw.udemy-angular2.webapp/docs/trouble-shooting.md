# Trouble Shooting

## Always start with a new np-app project

Project files are Angular version related. Using the wrong ones will break 
the application.

I originally started by copying the project files provided by [angular.io](https://angular.io/start).

These triggered browser errors on launch, eg.

```java
compiler.js:2175 Uncaught Error: Can't resolve all parameters for ProductDetailsComponent: (?).
    at syntaxError (compiler.js:2175)
    at CompileMetadataResolver._getDependenciesMetadata (compiler.js:20401)
    at CompileMetadataResolver._getTypeMetadata (compiler.js:20296)
    at CompileMetadataResolver.getNonNormalizedDirectiveMetadata (compiler.js:19925)
    at CompileMetadataResolver._getEntryComponentMetadata (compiler.js:20496)
    at compiler.js:20488
    at Array.forEach (<anonymous>)
    at CompileMetadataResolver._getEntryComponentsFromProvider (compiler.js:20487)
    at compiler.js:20458
    at Array.forEach (<anonymous>)
```

The application only launched (as expected) after copying the [angular.io](https://angular.io/start)
files into a clone of the `np-app` project.

## Avoid manually fixing build errors

[angular.io](https://angular.io/start) declares the following dependencies 

```json
  "devDependencies": {
    "@angular-devkit/build-angular": "~0.10.0",
    "@angular/cli": "~7.0.2",
```

The build (Mac OS X 10.15.3) failed with 

```bash
[INFO] > node-gyp rebuild
[INFO]
[ERROR] No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.
[ERROR]
[ERROR] No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.
[ERROR]
[ERROR] No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.
[ERROR]
[ERROR] gyp: No Xcode or CLT version detected!
[ERROR] gyp ERR! configure error
[ERROR] gyp ERR! stack Error: `gyp` failed with exit code: 1
[ERROR] gyp ERR! stack     at ChildProcess.onCpExit (/Users/stewartw/Desktop/My Stuff/sw-angular.io-example/sw.angular.io-example.webapp/target/node/node_modules/npm/node_modules/node-gyp/lib/configure.js:351:16)
[ERROR] gyp ERR! stack     at ChildProcess.emit (events.js:321:20)
[ERROR] gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:275:12)
[ERROR] gyp ERR! System Darwin 19.3.0
[ERROR] gyp ERR! command "/Users/stewartw/Desktop/My Stuff/sw-angular.io-example/sw.angular.io-example.webapp/target/node/node" "/Users/stewartw/Desktop/My Stuff/sw-angular.io-example/sw.angular.io-example.war/target/node/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
[ERROR] gyp ERR! cwd /Users/stewartw/Desktop/My Stuff/sw-angular.io-example/sw.angular.io-example.webapp/src/main/angular.io-example/node_modules/fsevents
[ERROR] gyp ERR! node -v v13.9.0
[ERROR] gyp ERR! node-gyp -v v5.0.7
[ERROR] gyp ERR! not ok
```

The issue is known ; see `d3-scale-cluster` [issue](https://github.com/schnerd/d3-scale-cluster/issues/7)

... and workarounds exist ; see `node-gyp` [installation notes](https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md)

After installing the required Mac OS dependencies, the build failed with

```bash
[INFO]   c++ '-DNODE_GYP_MODULE_NAME=binding' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DBUILDING_NODE_EXTENSION' -I/Users/stewartw/.node-gyp/12.16.1/include/node -I/Users/stewartw/.node-gyp/12.16.1/src -I/Users/stewartw/.node-gyp/12.16.1/deps/openssl/config -I/Users/stewartw/.node-gyp/12.16.1/deps/openssl/openssl/include -I/Users/stewartw/.node-gyp/12.16.1/deps/uv/include -I/Users/stewartw/.node-gyp/12.16.1/deps/zlib -I/Users/stewartw/.node-gyp/12.16.1/deps/v8/include -I../../nan -I../src/libsass/include  -Os -gdwarf-2 -mmacosx-version-min=10.7 -arch x86_64 -Wall -Wendif-labels -W -Wno-unused-parameter -std=gnu++1y -stdlib=libc++ -fno-rtti -fno-exceptions -std=c++11 -MMD -MF ./Release/.deps/Release/obj.target/binding/src/create_string.o.d.raw   -c -o Release/obj.target/binding/src/create_string.o ../src/create_string.cpp
[INFO] ../src/create_string.cpp:17:25: error: no matching constructor for initialization of 'v8::String::Utf8Value'
[INFO]   v8::String::Utf8Value string(value);
[INFO]                         ^      ~~~~~
[INFO] /Users/stewartw/.node-gyp/12.16.1/include/node/v8.h:3142:5: note: candidate constructor not viable: no known conversion from 'v8::Local<v8::Value>' to 'const v8::String::Utf8Value' for 1st argument
[INFO]     Utf8Value(const Utf8Value&) = delete;
[INFO]     ^
[INFO] /Users/stewartw/.node-gyp/12.16.1/include/node/v8.h:3135:5: note: candidate constructor not viable: requires 2 arguments, but 1 was provided
[INFO]     Utf8Value(Isolate* isolate, Local<v8::Value> obj);
[INFO]     ^
[INFO] 1 error generated.
```

This issue is known ; see `node-gyp` [issue](https://github.com/nodejs/node-gyp/issues/1763/)

After wasting many hours trying to fix the build, I eventually found `angular-cli` [issue](https://github.com/angular/angular-cli/issues/14339)

Cloning a working `np-app` project fixed the issue.

## Fixing node-gyp errors after MacOS update

After applying MacOS `10.15.4` update, `maven` builds failed with ...

```bash
[INFO] > fsevents@1.2.12 install /Users/stewartw/Desktop/My Stuff/sw-angular.io-example/sw.angular.io-example.webapp/src/main/angular.io-example/node_modules/webpack-dev-server/node_modules/fsevents
[INFO] > node-gyp rebuild
[INFO]
[INFO] No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.
[INFO]
[INFO] No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.
[INFO]
[INFO] No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.
[INFO]
[INFO] gyp: No Xcode or CLT version detected!
[INFO] gyp ERR! configure error
[INFO] gyp ERR! stack Error: `gyp` failed with exit code: 1
[INFO] gyp ERR! stack     at ChildProcess.onCpExit (/Users/stewartw/Desktop/My Stuff/sw-angular.io-example/sw.angular.io-example.webapp/target/node/node_modules/npm/node_modules/node-gyp/lib/configure.js:351:16)
[INFO] gyp ERR! stack     at ChildProcess.emit (events.js:321:20)
[INFO] gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:275:12)
[INFO] gyp ERR! System Darwin 19.4.0
[INFO] gyp ERR! command "/Users/stewartw/Desktop/My Stuff/sw-angular.io-example/sw.angular.io-example.webapp/target/node/node" "/Users/stewartw/Desktop/My Stuff/sw-angular.io-example/sw.angular.io-example.webapp/target/node/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
[INFO] gyp ERR! cwd /Users/stewartw/Desktop/My Stuff/sw-angular.io-example/sw.angular.io-example.webapp/src/main/angular.io-example/node_modules/webpack-dev-server/node_modules/fsevents
[INFO] gyp ERR! node -v v13.9.0
[INFO] gyp ERR! node-gyp -v v5.0.7
[INFO] gyp ERR! not ok
[INFO] npm notice created a lockfile as package-lock.json. You should commit this file.
[INFO] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 (node_modules/watchpack/node_modules/fsevents):
[INFO] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 install: `node-gyp rebuild`
[INFO] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: Exit status 1
[INFO] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 (node_modules/webpack-dev-server/node_modules/fsevents):
[INFO] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.12 install: `node-gyp rebuild`
[INFO] npm WARN optional SKIPPING OPTIONAL DEPENDENCY: Exit status 1
[INFO]
[INFO] audited 15576 packages in 7.018s
[INFO]
[INFO] 33 packages are looking for funding
[INFO]   run `npm fund` for details
[INFO]
[INFO] found 70 vulnerabilities (68 low, 2 moderate)
[INFO]   run `npm audit fix` to fix them, or `npm audit` for details
```

Manually deleting `node_modules` allowed builds to pass, but subsequent builds failed.

Used `node-gyp` [installation notes](https://github.com/nodejs/node-gyp/blob/master/macOS_Catalina.md) to diagnose fault.

Command line tools had been removed, eg.

```bash
$ /usr/sbin/pkgutil --packages | grep CL
com.kyocera.kyoceraMacintosh.PCL_b.pkg
```

After applying `Installing node-gyp using the Xcode Command Line Tools via manual download` ...

```bash
$ /usr/sbin/pkgutil --packages | grep CL
com.apple.pkg.CLTools_Executables
com.apple.pkg.CLTools_SDK_macOS1015
com.apple.pkg.CLTools_SDK_macOS1014
com.apple.pkg.CLTools_macOS_SDK
com.kyocera.kyoceraMacintosh.PCL_b.pkg
```

Maven build passed with ...

```bash
[INFO] --- frontend-maven-plugin:1.9.1:install-node-and-npm (install node and npm) @ sw-udemy-angular2-webapp ---
[INFO] Node v13.9.0 is already installed.
[INFO] NPM 6.13.7 is already installed.
[INFO]
[INFO] --- frontend-maven-plugin:1.9.1:npm (npm install) @ sw-udemy-angular2-webapp ---
[INFO] Running 'npm install' in /Users/stewartw/Desktop/My Stuff/sw-udemy-angular2/sw.udemy-angular2.webapp/src/main/web
[INFO]
[INFO] > fsevents@1.2.12 install /Users/stewartw/Desktop/My Stuff/sw-udemy-angular2/sw.udemy-angular2.webapp/src/main/course-project/node_modules/watchpack/node_modules/fsevents
[INFO] > node-gyp rebuild
[INFO]
[INFO]   SOLINK_MODULE(target) Release/.node
[INFO]   CXX(target) Release/obj.target/fse/fsevents.o
[INFO]   SOLINK_MODULE(target) Release/fse.node
[INFO]
[INFO] > fsevents@1.2.12 install /Users/stewartw/Desktop/My Stuff/sw-udemy-angular2/sw.udemy-angular2.webapp/src/main/course-project/node_modules/webpack-dev-server/node_modules/fsevents
[INFO] > node-gyp rebuild
[INFO]
[INFO]   SOLINK_MODULE(target) Release/.node
[INFO]   CXX(target) Release/obj.target/fse/fsevents.o
[INFO]   SOLINK_MODULE(target) Release/fse.node
[INFO] added 137 packages from 33 contributors and audited 15720 packages in 14.525s
[INFO]
[INFO] 37 packages are looking for funding
[INFO]   run `npm fund` for details
[INFO]
[INFO] found 3 low severity vulnerabilities
[INFO]   run `npm audit fix` to fix them, or `npm audit` for details
```
