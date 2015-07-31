__author__ = 'JennyYueJin'

from pprint import pprint
import os

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
    filename = name + ('' if suffix is None else '_' + str(suffix)) + '.' + ext

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

    price, unit = t.split('$')[1].split('/')
    return float(price.strip().strip('$')), unit


def crawl_page(url, imgOutputDir=None):

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
            priceClass = '.borrowBrowsePrice' \
                if len(prod.select('.borrowBrowsePrice')) > 0 \
                else '.borrowBrowsePriceSale'
            priceText = prod.select(priceClass)[0].text

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

output = {}

# crawl by page in 'Designers'
for pageNum in range(1, 33):
    print '>>>>>>', pageNum

    url = 'http://www.bagborroworsteal.com/borrow/browse?nodeId=18&page=%i' % pageNum
    curRes = crawl_page(url, imgOutputDir=None)
    output.update(curRes)

    print 'Got %i results; total %i' % (len(curRes), len(output))

json.dump(output, open('./output/crawlResults.json', 'w'))


# TODO: crawl by designer
# crawl_page('http://www.bagborroworsteal.com/borrow/designers/alexander-mcqueen')