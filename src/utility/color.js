import { CATEGORY_COLOR } from '../common/constant';

export default class color {
  static getCategoryColor = (category) => {
    const colors = CATEGORY_COLOR.filter((cc)=>{
      return cc.key === category
    });
    return colors.length? colors.shift().value: null;
  }
}
