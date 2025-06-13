/**
 * @format
 */
import {Navigation} from 'react-native-navigation';
import App from './App';
import {registerScreens} from './src/config/routes';
import SideMenu from './src/screens/SideMenu';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {AppState} from 'react-native';
import messaging from '@react-native-firebase/messaging';

// Register dummy components for demo purposes
Navigation.registerComponent('App.WelcomeScreen', () => null);
Navigation.registerComponent('App.SideMenu', () => null);
registerScreens();

// Setup notification display
const displayNotification = async (title: string, body: string) => {
  console.log('show notification', title, body);
  try {
    const ChannleId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      vibration: true,
      sound: 'default',
      importance: AndroidImportance.HIGH,
      vibrationPattern: [300, 500],
    });
    console.log('channel Id', ChannleId);

    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId: ChannleId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });
  } catch (err) {
    console.log('Error displaying firbase notifictaion', err);
  }
};


// Background message handler
const backgroungMessage = async remoteMessage => {
  console.log('background message', remoteMessage);

};
messaging().setBackgroundMessageHandler(backgroungMessage);
messaging().onMessage(async remotemessage => {
  console.log('foreground message', remotemessage);
  if (remotemessage) {
    const {title, body} = remotemessage.notification;
    await displayNotification(title, body);
  }
});

notifee.onForegroundEvent(async (type, detail) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('User Dismissed', detail.notification);
      break;
    case EventType.PRESS:
      console.log('User Pressed', detail.notification);
      break;
  }
});
notifee.onBackgroundEvent(async (type, detail) => {
  switch (type) {
    case EventType.DISMISSED:
      console.log('User Dismissed', detail.notification);
      break;
    case EventType.PRESS:
      console.log('User Pressed', detail.notification);
      break;
  }
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: 'App.SideMenu',
            options: {
              topBar: {
                visible: false,
              },
              statusBar: {
                // visible: false,
              },
            },
          },
        },
        center: {
          stack: {
            children: [
              {
                component: {
                  name: 'App.WelcomeScreen',
                  id: 'demoId',
                  options: {
                    topBar: {
                      visible: false,
                    },
                    layout: {
                      orientation: ['portrait'],
                    },
                    sideMenu: {
                      left: {
                        enabled: false,
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  });
});
