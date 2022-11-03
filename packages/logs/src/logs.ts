type levelType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'

export const LOGS_SIGN = {
  DEBUG: '调试日志',
  SYSTEM: '系统日志',
  ERROR: '错误日志'
}

class Logs {
  /**
   * 普通打印
   * @param type - 类型决定字体颜色
   * @param content - 内容
   * @param size - 字体大小
   * @returns 
   */
  print(content: string | object, type?: levelType, size?: number, bold?: boolean) {
    if (typeof content === 'object') {
      console.dir(content)
      return
    }

    console.log(
      `%c${content}`,
      `color: ${this._generateColorByType(type)}; font-size: ${size}px; font-weight: ${bold ? 'bold' : 'normal'}`
    )
  }

  /**
   * 
   * @param type - 类型决定字体/背景颜色
   * @param theme - title
   * @param content - 内容
   * @param size - 字体大小
   * @param bold - boolean 粗体
   */
  printBg(type: levelType | levelType[], theme: string, content: number | string | object, size?: number, bold?: boolean) {
    // 处理内容
    const contentResult = !content ? theme + ' %c' : typeof content === 'string' ? `${theme} %c %s ` : `${theme} %c %o`
    // 处理 type
    const typeResult = typeof type === 'string' ? [type] : type
    // 处理bold
    const boldResult = !!content && bold === undefined ? true : bold

    // 打印
    console.log(
      `%c ${contentResult}`,
      `background: ${this._generateColorByType(typeResult[0])}; line-height: 1.5; border-radius: ${!content ? '3px' : '3px 0 0 3px'}; color: #ffffff;
        font-size: ${size}px; font-weight: ${boldResult ? 'bold' : 'normal'}`,
      `background: ${this._generateColorByType(typeResult[1])}; line-height: 1.5; border-radius: 0 3px 3px 0;
        color: ${this._generateColorByType(typeResult[1]) ? '#ffffff' : this._generateColorByType(typeResult[0])};
        font-size: ${size}px;`,
      content 
    )
  }

  DEBUG(content: number | string | object) {
    this.printBg('info', LOGS_SIGN.DEBUG, content)
  }

  SYSTEM(content: number | string | object) {
    this.printBg('primary', LOGS_SIGN.SYSTEM, content)
  }

  ERROR(content: number | string | object) {
    this.printBg('danger', LOGS_SIGN.ERROR, content)
  }

  /**
   * 内置函数：根据等级获取色值
   * @param type 
   * @returns 
   */
  private _generateColorByType(type?: levelType) {
    let color = ''
    switch (type) {
      case 'primary':
        color = '#409EFF'
        break
      case 'success':
        color = '#10b981'
        break
      case 'warning':
        color = '#E6A23C'
        break
      case 'danger':
        color = '#F56C6C'
        break
      case 'info':
        color = '#909399'
        break
      default:
    }
    return color
  }
}

export default Logs
