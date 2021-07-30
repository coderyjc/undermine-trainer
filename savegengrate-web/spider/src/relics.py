# -!- coding: utf-8 -!-

"""
@Author: Jingcun Yan
@Date: 2021/7/30
@Time: 19:35
@Desctiption: 
"""

import requests
from lxml import etree
from utils.translate import baidu_translate
import time

# 设置UA
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
}


def print_relic_data(sort):
    # 设置url
    url = "https://undermine.fandom.com/wiki/" + sort
    # 获取回应的数据
    response = requests.get(url=url, headers=headers).text
    # 将回应的数据转化为json格式
    ul_tree = etree.HTML(response)
    gallery = ul_tree.xpath('//div[@class="gallerytext"]/p/a/@href')
    # 数据的持久化存储
    base_url = 'https://undermine.fandom.com'
    i = 0
    for item in gallery:
        item_url = base_url + item
        response = requests.get(item_url, headers).text
        item_tree = etree.HTML(response)
        # content 是这个物品的 item id 和 effect id
        content = item_tree.xpath('//aside/section[2]/div/div/text()')
        # title 是这个物品的名称
        title = item_tree.xpath('//aside/h2/text()')
        # effect 是这个物品的作用
        effect = item_tree.xpath('//aside/section[1]//div[@data-source="effect"]/div/text()')[0]
        'aside/section[1]/div[7]/div'
        effect = baidu_translate(effect)
        if len(content) == 2:
            print('\"' + title[0] + '\" ' + effect + ' ' + content[0] + ' ' + content[1])
        else:
            print('\"' + title[0] + '\" ' + effect + ' ' + content[0])
        time.sleep(1)

    # print_relic_data('Familiars') 这个比较特殊，单独处理


# print_relic_data('Blessings')
# print_relic_data('Relics')
# print_relic_data('Potions')
# print_relic_data('Curses')
if __name__ == "__main__":
    pass