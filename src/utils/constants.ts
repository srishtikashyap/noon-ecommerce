import { Dimensions } from 'react-native';
import { isAndroid } from './platformHelper';

const { width, height } = Dimensions.get('window');

export const BASE_URL = isAndroid
  ? 'http://10.0.2.2:3000'
  : 'http://localhost:3000';

