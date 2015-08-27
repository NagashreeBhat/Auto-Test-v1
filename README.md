# Auto-Test-v1
Functionality Test
This is a beta test app, version V1 for IBM Mobile First Platform 7.0(https://developer.ibm.com/mobilefirstplatform/get-introduced/#mobilefirst-platform)
The Hybrid app is tried and tested on ios(Xcode Beta 7)
Following are the functionalities that are working on beta 7 xcode version

1. Common UI Controls
2. Form Based Authentication
3. Push Notification
4. Java Adapter
5. Location Services
6. Custom Direct Update

To run the app on beta version, change the following settings
Resources -> App-Info.plist

<key>NSAppTransportSecurity</key>
<dict>
<!--Include to allow all connections (DANGER)-->
<key>NSAllowsArbitraryLoads</key>
<true/>
</dict>

And Turn off the Bitcode to NO
(Path: App -> Build Settings -> All -> Build Options -> Enable Bitcode = No


