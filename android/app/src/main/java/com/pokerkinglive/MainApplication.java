package com.pokerkinglive;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.zyu.ReactNativeWheelPickerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.BV.LinearGradient.LinearGradientPackage;

import cn.jpush.android.api.JPushInterface;
import cn.jpush.reactnativejpush.JPushPackage;
import com.microsoft.codepush.react.CodePush;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.rnfs.RNFSPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import org.wonday.pdf.RCTPdfView;
import com.vonovak.AddCalendarEventPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import cn.jiguang.share.reactnative.JSharePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import cn.jiguang.share.android.api.JShareInterface;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    // 是否关闭 Log，
    private static boolean SHUTDOWN_LOG = false;
    // 是否关闭 toast，默认不关闭
    private static boolean SHUTDOWN_TOAST = false;
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }
    

    
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeWheelPickerPackage(),
            new RNFetchBlobPackage(),
            new LinearGradientPackage(),
            new JPushPackage(!BuildConfig.DEBUG, !BuildConfig.DEBUG),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
            new RNDeviceInfo(),
            new RNFSPackage(),
            new ImageResizerPackage(),
            new SplashScreenReactPackage(),
            new RCTPdfView(),
            new AddCalendarEventPackage(),
            new PickerPackage(),
            new JSharePackage(SHUTDOWN_TOAST, SHUTDOWN_LOG)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, false);
    JShareInterface.init(this);
    JPushInterface.init(this);
  }
}
