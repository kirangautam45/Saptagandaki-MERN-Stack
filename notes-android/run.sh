#!/bin/sh
# Boots the emulator (if needed), then builds, installs and opens the app. No Android Studio required.
set -e
cd "$(dirname "$0")"

SDK="${ANDROID_HOME:-$HOME/Library/Android/sdk}"
AVD="${AVD:-$("$SDK/emulator/emulator" -list-avds | head -1)}"
ADB="$SDK/platform-tools/adb"
export JAVA_HOME="${JAVA_HOME:-/Applications/Android Studio.app/Contents/jbr/Contents/Home}"

if ! "$ADB" devices | grep -q 'emulator-'; then
  echo "Starting emulator $AVD"
  "$SDK/emulator/emulator" -avd "$AVD" -no-snapshot-save >/dev/null 2>&1 &
fi

"$ADB" wait-for-device
until [ "$("$ADB" shell getprop sys.boot_completed | tr -d '\r')" = 1 ]; do sleep 1; done

./gradlew installDebug -q
"$ADB" shell am start -n com.example.notes/.MainActivity
