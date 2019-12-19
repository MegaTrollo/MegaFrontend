import { Image } from './Image';
import {Activity} from './Activity';
import {Label} from './Label';
export class Card {
  id: string;
  name: string;
  description: string;
  images: Array<Image>;
  activity: Array<Activity>;
  labels: Array<Label>;
}
