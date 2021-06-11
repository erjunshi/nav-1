const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const view = localStorage.getItem('view')
const viewObject = JSON.parse(view)
const hashMap = viewObject || [
    { logo: 'B', url: 'https://www.bootcdn.cn/' },
    { logo: 'C', url: 'https://cssgradient.io/' },
    { logo: 'D', url: 'https://mozilla.org/zh-CN/' },
    { logo: 'J', url: 'https://www.jquery123.com/' },
    { logo: 'V', url: 'https://validator.w3.org/' }

]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon" onclick="click(evt)">
            <use xlink:href="#icon-close"></use>
          </svg> 
        </div>
      </div>
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        })

    })
}

render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('view', string)
}

$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})(jQuery);


