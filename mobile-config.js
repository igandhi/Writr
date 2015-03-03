App.info({
  name: 'Writr',
  description: 'Collabrative Writing App' ,
  author: 'Ike Gandhi',
  email: 'ikegandhi@gmail.com',
  website: 'http://writr.me',
  version: '0.0.1'
});

App.icons({
  'android_ldpi': 'resources/icons/android.png',
  'android_mdpi': 'resources/icons/android.png',
  'android_hdpi': 'resources/icons/android.png',
  'android_xhdpi': 'resources/icons/android.png'
});

App.launchScreens({
  'android_ldpi_portrait': 'resources/splash/android.png',
  'android_ldpi_landscape': 'resources/splash/android.png',
  'android_mdpi_portrait': 'resources/splash/android.png',
  'android_mdpi_landscape': 'resources/splash/android.png',
  'android_hdpi_portrait': 'resources/splash/android.png',
  'android_hdpi_landscape': 'resources/splash/android.png',
  'android_xhdpi_portrait': 'resources/splash/android.png',
  'android_xhdpi_landscape': 'resources/splash/android.png'
});

App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'default');