# -!- coding: utf-8 -!-

"""
@Author: Jingcun Yan
@Date: 2021/7/30
@Time: 23:48
@Desctiption: 
"""

import json

import pandas as pd

if __name__ == '__main__':
    with open('blessings.json', 'w', encoding='utf8') as fp:
        data = pd.read_table("../rst/blessings.txt", sep=" ", names=['name', 'description', 'item-id','effect-id'])
        t_dict = data.to_dict('records')
        json.dump(t_dict, fp, ensure_ascii=False, indent=4)