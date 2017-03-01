# honesty.store mobile app

First things first, install fastlane

## Building

- Install cordova tools: `npm install -g cordova`
- Navigate to `app` directory: `cd app`
- Transform `config.xml` to platform-specfic files: `cordova prepare`
- Run on desired platform using `cordova run <platform>`

## Deploying to TestFlight

- Go to `app/fastlane/Fastfile` and modify the `apple_id` variable to be your own.
- Build using `fastlane ios appstore`. You may be prompted to enter your Apple ID password so the match tool can pull down the relevant provisioning profile/certificate gubbins.
- Xcode should open. Open project settings and click on honesty.store target.
- Change `Signing (Release)` provisioning profile to `match AppStore com.scottlogic.honesty-store`
- Change build target to be `Generic iOS Device`
- Click `Product->Archive` and follow instructions to upload. It'll talk about uploading to App Store, but don't worry, it'll go out to TestFlight first presuming that version number has been made available to test.

N.B. Each TestFlight deployment needs to have a unique build number. You can modify this by going to the cordova app's `config.xml` and changing `ios-CFBundleVersion`