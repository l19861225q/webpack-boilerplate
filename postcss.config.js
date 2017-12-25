/**
 * @Author: LiuQian
 * @Email:  112486391@qq.com
 */

module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 2 versions', '> 5%', 'last 5 iOS versions', 'Android >= 3']
    })
  ]
}
