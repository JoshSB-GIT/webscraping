from bs4 import BeautifulSoup
from flask import (
    Blueprint, jsonify, make_response,
    send_file
)
from flask_cors import cross_origin
import csv
import datetime
import re
import requests


url_mouses = 'https://www.tiendagamermedellin.co/mouses'
url_mouses2 = 'https://www.tiendagamermedellin.co/mouses?page=2'
url_pc = 'https://www.tiendagamermedellin.co/portatiles'
url_teclado = 'https://www.tiendagamermedellin.co/teclados'
url_teclado2 = 'https://www.tiendagamermedellin.co/teclados?page=2'
url_teclado3 = 'https://www.tiendagamermedellin.co/teclados?page=3'


web_scraping = Blueprint('web_scraping', __name__)


def separe_prices(txt_list: list):
    patron: str = r'\$([\d,.]+) COP \$([\d,.]+) COP'

    prices_list = []

    for cadena in txt_list:
        match = re.search(patron, cadena)
        if match:
            price_1 = match.group(1)
            price_2 = match.group(2)
            prices_list.append(
                (price_1.replace('.', ''), price_2.replace('.', '')))

    return prices_list


def convert_lxml(html_content: str, class_: str, container: str):
    soup = BeautifulSoup(html_content, 'lxml')
    return soup.find_all(
        container, class_=class_
    )


def generate_list_dict(html_list: list, category: list) -> list[dict]:
    con = 0
    list_dict = []
    for pc in html_list:
        con += 1
        # print(con)
        pc_provider = pc.find(
            'span', class_='product-block__brand product-block__brand--upp'
        )

        pc_name = pc.find(
            'a', class_='product-block__name'
        )

        pc_prices = pc.find(
            'div', class_='product-block__price product-block__price--discount'
        )

        pc_discount = pc.find(
            'div', class_='product-block__discount product-block__discount--right'
        )

        cont_img = pc.find(
            'div', class_='product-block__gallery'
        )

        pc_img = cont_img.find('img')['src']

        prices = separe_prices([pc_prices.text])
        price_actual = int(prices[0][0])
        price_real = int(prices[0][1])

        print(pc_discount.text)
        list_dict.append({
            'img': '' if not pc_img else pc_img,
            'provider': '' if not pc_provider else pc_provider.text,
            'name': '' if not pc_name else pc_name.text,
            'price_actual': '' if not price_actual else price_actual,
            'price_real': '' if not price_real else price_real,
            'discount': '' if not pc_discount else pc_discount.text.replace('&percnt;', ''),
            'category': category
        })

    return list_dict


def generate_csv(list_dict: list[dict]) -> tuple:
    try:
        name_csv = (
            'datos-'+str(datetime.datetime.now())
            .replace(' ', '')
            .replace(':', '.')+'.csv')
        headers = list_dict[0].keys()

        with open('./src/temp/'+name_csv, 'w', newline='') as f:
            writher = csv.DictWriter(f, fieldnames=headers)
            writher.writeheader()

            for dict in list_dict:
                writher.writerow(dict)
        return ({'message': 'CSV generated successfully!',
                 'path': 'temp\\\\'+name_csv,
                 'name': name_csv}, 200)
    except Exception as e:
        return ({'message': str(e)}, 200)


@cross_origin
@web_scraping.route('/get_csv', methods=['GET'])
def get_csv_by_url():
    try:
        product_list = []
        list_html = []
        html_mouses = requests.get(url_mouses).text
        html_mouses2 = requests.get(url_mouses2).text
        html_pc = requests.get(url_pc).text
        html_teclado = requests.get(url_teclado).text
        html_teclado2 = requests.get(url_teclado2).text
        html_teclado3 = requests.get(url_teclado3).text

        list_html.append(convert_lxml(
            html_mouses, 'col-6 col-sm-4 col-md-3 product-block text-center', 'div'
        ))

        list_html.append(convert_lxml(
            html_mouses2, 'col-6 col-sm-4 col-md-3 product-block text-center', 'div'
        ))

        list_html.append(convert_lxml(
            html_pc, 'col-6 col-sm-4 col-md-3 product-block text-center', 'div'
        ))

        list_html.append(convert_lxml(
            html_teclado, 'col-6 col-sm-4 col-md-3 product-block text-center', 'div'
        ))

        list_html.append(convert_lxml(
            html_teclado2, 'col-6 col-sm-4 col-md-3 product-block text-center', 'div'
        ))

        list_html.append(convert_lxml(
            html_teclado3, 'col-6 col-sm-4 col-md-3 product-block text-center', 'div'
        ))

        for i in range(0, len(list_html)):
            category = 'Teclados'
            if i <= 1:
                category = 'Mouses'
            elif i == 2:
                category = 'PC portatiles'
            product_list.append(generate_list_dict(list_html[i], category))

        new_product_list = []
        for list in product_list:
            for i in list:
                new_product_list.append(i)

        response = ''
        dct, code_t = generate_csv(new_product_list)
        if code_t == 200:
            response = dct['message']
            code = code_t
            print(dct['name'])
            return send_file(dct['path'], as_attachment=True, mimetype='text/csv', download_name=f"{dct['name']}")
        else:
            return make_response(jsonify({'data': str(response)}), code)
    except Exception as e:
        response = e
        code = 401
        return make_response(jsonify({'data': str(response)}), code)
