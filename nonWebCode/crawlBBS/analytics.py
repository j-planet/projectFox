__author__ = 'jennyyuejin'

import json
import pprint

borrows = json.load(open('./output/borrow/crawlResults.json', 'r'))
buys = json.load(open('./output/buy/crawlResults.json', 'r'))

set(borrows.keys()) & set(buys.keys())