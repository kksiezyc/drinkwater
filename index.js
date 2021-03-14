import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LocalNotifications} from './src/services/notifications';

LocalNotifications.getInstance().initialize();
AppRegistry.registerComponent(appName, () => App);
