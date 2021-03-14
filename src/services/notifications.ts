import PushNotification, {
  ReceivedNotification,
} from 'react-native-push-notification';
import {notificationHours, notificationsChannelId} from '../utils/constants';

export class LocalNotifications {
  private static instance = new LocalNotifications();
  private subscribed = false;

  public static getInstance(): LocalNotifications {
    return this.instance;
  }

  public initialize() {
    PushNotification.configure({
      onNotification: function (
        notification: Omit<ReceivedNotification, 'userInfo'>,
      ) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    PushNotification.createChannel(
      {
        channelId: notificationsChannelId,
        channelName: 'Default channel',
        channelDescription: 'A default channel',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) =>
        console.log(`createChannel 'default-channel-id' returned '${created}'`),
    );
  }

  public registerToLocalNotifications() {
    if (!this.subscribed) {
      const now = new Date().getHours();
      notificationHours.forEach((hour: number) => {
        const date = new Date();
        if (now >= hour) {
          date.setDate(date.getDate() + 1);
        }
        date.setHours(hour);
        date.setMinutes(0);
        date.setMilliseconds(0);
        PushNotification.localNotificationSchedule({
          channelId: notificationsChannelId,
          message: 'Time to drink some water!',
          date,
          repeatType: 'day',
        });
      });
      this.subscribed = true;
    }
  }

  public unregisterToLocalNotifications() {
    PushNotification.cancelAllLocalNotifications();
    this.subscribed = false;
  }
}
