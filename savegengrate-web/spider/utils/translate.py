# -!- coding: utf-8 -!-

"""
@Author: Jingcun Yan
@Date: 2021/7/30
@Time: 20:51
@Desctiption:
"""

import requests
import random
from hashlib import md5


def make_md5(s, encoding='utf-8'):
    return md5(s.encode(encoding)).hexdigest()


def baidu_translate(query, from_lang='en', to_lang='zh'):
    appid = '20210730000902191'
    appkey = '9XKendeQU4_OEcNyy5wX'
    url = 'https://api.fanyi.baidu.com/api/trans/vip/translate'
    salt = random.randint(32768, 65536)
    sign = make_md5(appid + query + str(salt) + appkey)

    # Build request
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    payload = {'appid': appid, 'q': query, 'from': from_lang, 'to': to_lang, 'salt': salt, 'sign': sign}

    # Send request
    r = requests.post(url, params=payload, headers=headers)
    result = r.json()
    return result['trans_result'][0]['dst']

    # Show response
    # print(json.dumps(result, indent=4, ensure_ascii=False))
