__author__ = 'JennyYueJin'

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

    responseText = requests.get(url).text

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


def crawl_single_page(url, imgOutputDir=None):
    """
    crawls http://www.bagborroworsteal.com/buy/browse?nodeId=3165&page=9
    :param url:
    :param imgOutputDir:
    :return:
    """

    soup = get_soup(url)

    res = {}    # {id: {price: (price, unit), imgUrl: imgUrl} }

    for prod in soup.select('#featuredProducts li.products'):

        try:
            id = prod.attrs.get('id')
            imgUrl = prod.select('.productImage img')[0].attrs.get('src')

            # download image
            if imgOutputDir is not None:
                download_pic(imgUrl, imgOutputDir)

            # compute price
            priceText = prod.find(text = re.compile('.*\$.*'))

            # get designer
            designer = prod.select('.borrowBrowseBrandName')[0].text

            res[id] = {'price': convert_price_text(priceText),
                       'imgUrl': imgUrl,
                       'designer': designer}
        except Exception as e:
            print '='*20
            print 'Error Msg:', e.message
            print '-'*20
            print 'element:'
            print prod

    return res


def crawl_page(baseUrl, queryWithoutPageNum, numPages, outputDir, outputImages):
    """
    crawls http://www.bagborroworsteal.com/buy
    :return: {id: {price: (price, unit), imgUrl: imgUrl, designer: designer} }
    """

    output = {}  # {id: {price: (price, unit), imgUrl: imgUrl, designer: designer} }

    # crawl by page in 'Designers'
    for pageNum in range(1, numPages+1):
        print '>>>>>>', pageNum

        url = '%s/%s%i' % (baseUrl, queryWithoutPageNum, pageNum)
            # 'http://www.bagborroworsteal.com/borrow/browse?nodeId=18&page=%i' % pageNum
        curRes = crawl_single_page(url, os.path.join(outputDir, 'pics') if outputImages else None)
        output.update(curRes)

        print 'Got %i results; total %i' % (len(curRes), len(output))

    json.dump(output, open(os.path.join(outputDir, 'crawlResults.json'), 'w'))

    return output


if __name__ == '__main__':
    # crawl borrows
    borrowsDict = crawl_page('http://www.bagborroworsteal.com/borrow', 'browse?nodeId=18&page=', 32, './output/borrow', True)

    # crawl buys
    buysDict = crawl_page('http://www.bagborroworsteal.com/buy', 'browse?nodeId=3165&page=', 9, './output/buy', True)


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