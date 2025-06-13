import {
  Navigation,
  OptionsModalPresentationStyle,
} from 'react-native-navigation';

const AppColors = {
  primary: '#007BFF',
  white: '#FFFFFF',
};

export default class NavigationService {
  static push(componentId, screenName, passProps = {}, title = '', topBarProps = {}) {
    const toolbarProps = {
      visible: false,
      drawBehind: false,
      background: {
        color: AppColors.primary,
      },
      title: {
        text: title,
        color: AppColors.white,
      },
      ...topBarProps,
    };

    Navigation.push(componentId, {
      component: {
        name: screenName,
        passProps,
        options: {
          layout: {
            orientation: ['portrait'],
            backgroundColor: AppColors.white,
          },
          topBar: toolbarProps,
        },
      },
    });
  }

  static showModal(screenName, passProps = {}) {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: screenName,
              passProps,
              options: {
                modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
                layout: {
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  orientation: ['portrait'],
                },
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    });
  }

  static pop(componentId) {
    Navigation.pop(componentId);
  }

  static popToRoot(componentId) {
    Navigation.popToRoot(componentId);
  }

  static dismissAllModals() {
    Navigation.dismissAllModals();
  }

  static setRoot(screenName, passProps = {}) {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: screenName,
                passProps,
              },
            },
          ],
        },
      },
    });
  }
}
