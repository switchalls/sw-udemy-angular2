# Udemy Angular2 project

See [course](https://www.udemy.com/course/the-complete-guide-to-angular-2/)

To compile:
```bash
$ mvn clean install
```

To execute:
```bash
$ java -jar sw.udemy-angular2.launcher/target/sw-udemy-angular2-launcher-1.0.0-SNAPSHOT.war
```

See `webapp` [overview](sw.udemy-angular2.webapp/README.md)

See `launcher` [overview](sw.udemy-angular2.launcher/README.md)

`git` history shows the commits for each step in [course](https://www.udemy.com/course/the-complete-guide-to-angular-2/), 
eg.

```bash
$ git log
```

## macOS developer tools

Required by [node-gyp](https://github.com/nodejs/node-gyp)

Manually download `Command Line Tools` from [Apple Developers](https://developer.apple.com/download/more/)

Verify installation:

```bash
$ /usr/sbin/pkgutil --packages | grep CL
com.apple.pkg.CLTools_Executables
com.apple.pkg.CLTools_SDK_macOS1015
com.apple.pkg.CLTools_SDK_macOS1014
com.apple.pkg.CLTools_macOS_SDK
com.kyocera.kyoceraMacintosh.PCL_b.pkg
```

*NB.* Required after 10.5.4 and 10.5.5 macOS updates
