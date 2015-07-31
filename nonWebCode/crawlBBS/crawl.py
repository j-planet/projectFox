__author__ = 'JennyYueJin'

import json, sys
reload(sys)
sys.setdefaultencoding('UTF-8')

from pprint import pprint
import os
import re

import shutil
import requests
import urlparse
from bs4 import BeautifulSoup
import json


def get_soup(url):
    """
    :param url: link to the page
    :return: soup object
    """
    v = u' &nbsp;|&nbsp; \n              '
    responseText = requests.get(url).text.replace(v, '')

    return BeautifulSoup(responseText)


def download_pic(link, outputDir, suffix=None):
    """
    downloads a single pic
    :param suffix: extra string to insert at the end of the file name
    :return: output file path
    """

    # get pic object
    rawPic = requests.get(link, stream=True).raw

    # write to file
    name, ext = os.path.splitext(os.path.basename(urlparse.urlparse(link).path))
    filename = name + ('' if suffix is None else '_' + str(suffix)) + ext

    outputFpath = os.path.join(outputDir, filename)

    with open(outputFpath, 'wb') as f:
        shutil.copyfileobj(rawPic, f)

    # clean up
    del rawPic


def convert_price_text(t):
    """
    convert "$175/month' to 175
    :param t:
    :return: price, unit (i.e. 175, 'month')
    """

    tok = t.split('$')[1]
    if '/' in tok:
        price, unit = tok.split('/')
    else:
        price = tok
        unit = None

    return float(price.strip().strip('$').replace(',', '')), unit


def crawl_single_page(url, brandClassName, imgOutputDir=None):
    """
    crawls http://www.bagborroworsteal.com/buy/browse?nodeId=3165&page=9
    :param url:
    :param imgOutputDir:
    :param brandClassName: '.borrowBrowseBrandName' for borrow; '.brandLink' for buy
    :return:
    """

    soup = get_soup(url)

    res = {}    # {id: {price: (price, unit), imgUrl: imgUrl} }

    for prod in soup.select('li.products'):

        # try:
        id = prod.attrs.get('id')
        imgUrl = prod.select('img')[0].attrs.get('src')

        # download image
        if imgOutputDir is not None:
            download_pic(imgUrl, imgOutputDir)

        # compute price
        priceText = prod.find(text = re.compile('.*\$.*'))

        # get designer
        designer = prod.select(brandClassName)[0].text

        res[id] = {'price': convert_price_text(priceText),
                   'imgUrl': imgUrl,
                   'designer': designer}
        # except Exception as e:
        #     print '='*20
        #     print 'Error Msg:', e.message
        #     print '-'*20
        #     print 'element:'
        #     print prod

    return res


# works only for borrow for now
def crawl_page(baseUrl, queryWithoutPageNum, numPages, brandClassName,
               outputDir, outputImages):
    """
    crawls http://www.bagborroworsteal.com/buy
    :param brandClassName: '.borrowBrowseBrandName' for borrow; '.brandLink' for buy
    :return: {id: {price: (price, unit), imgUrl: imgUrl, designer: designer} }
    """

    output = {}  # {id: {price: (price, unit), imgUrl: imgUrl, designer: designer} }

    # crawl by page in 'Designers'
    for pageNum in range(1, numPages+1):
        print '>>>>>>', pageNum

        url = '%s/%s%i' % (baseUrl, queryWithoutPageNum, pageNum)
        curRes = crawl_single_page(url, brandClassName, os.path.join(outputDir, 'pics') if outputImages else None)
        output.update(curRes)

        print 'Got %i results; total %i' % (len(curRes), len(output))

    json.dump(output, open(os.path.join(outputDir, 'crawlResults.json'), 'w'))

    return output


# urlBase = 'http://www.bagborroworsteal.com/buy/browse?nodeId=3165&page='
def crawl_id_and_price(urlBase, numPages):

    res = {}

    for pageNum in range(1, numPages+1):
        print '>>>>', pageNum

        url = '%s%i' % (urlBase, pageNum)
        t = requests.get(url).text.replace('\n', '')

        products = [(m.start(), re.match('.*(product_\d+)', m.group()).group(1))
                       for m in re.finditer(r'id="product_\d+', t)]

        prices = [(m.start(),
                   float(re.match('\$ *([\d,]+)', m.group()).group(1).replace(',','')))
                  for m in re.finditer(r'\$ *[\d,]+', t)]

        firstProductInd = products[0][0]
        filteredPrices = filter(lambda p: p[0] > firstProductInd, prices)

        l = sorted(products + filteredPrices, key=lambda p: p[0])
        res.update(dict(zip([v[1] for v in l[0::2]], [v[1] for v in l[1::2]])))

    return res

if __name__ == '__main__':
    # crawl borrows. # {id: {price: (price, unit), imgUrl: imgUrl, designer: designer} }
    # borrowsDict = crawl_page('http://www.bagborroworsteal.com/borrow', 'browse?nodeId=18&page=', 32, '.borrowBrowseBrandName',
    #                          './output/borrow', True)

    # crawl buys
    buysDict = crawl_id_and_price('http://www.bagborroworsteal.com/buy/browse?nodeId=3165&page=', 9)
    json.dump(buysDict, open('./output/buy/crawlResults.json', 'w'))


    # ---- run some analytics by designer and overall distribution
    # outputByDesigner = {}   # {designer: list of prices}
    #
    # # get all designers
    # for id, d in output.iteritems():
    #     designer = d['designer']
    #
    #     if designer not in outputByDesigner:
    #         outputByDesigner[designer] = []
    #
    #     outputByDesigner[designer].append(d['price'][0])