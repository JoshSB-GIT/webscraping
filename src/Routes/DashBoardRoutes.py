from flask import (
    Blueprint, jsonify, make_response,
    send_file, request
)
from flask_cors import cross_origin
import csv


dash = Blueprint('dash', __name__)


@cross_origin
@dash.route('/upload_file', methods=['POST'])
def upload_csv_file():
    if 'file' not in request.files:
        return make_response(jsonify({'message': 'Not file found'}), 400)

    file = request.files['file']

    if file.filename == '':
        return make_response(jsonify({'message': 'Bad error'}), 400)

    if file:
        file.save('./src/temp/'+file.filename)

        return make_response(jsonify({'message': 'File saved successfully!',
                                      'file_name': str(file.filename)}), 200)


@cross_origin
@dash.route('/real_price_bar/<filename>/<real>', methods=['GET'])
def get_price_data(filename, real):
    try:
        csv_list: list[list] = []

        with open('./src/temp/'+filename, newline='') as f:
            reader = csv.reader(f)

            for row in reader:
                csv_list.append(row)

        mouses = 0
        pc = 0
        keyboard = 0
        num = 4

        if real == '0':
            num = 3

        for row in range(len(csv_list)):
            for col in range(len(csv_list[row])):
                if col == num and csv_list[row][6] == 'Mouses':
                    mouses += int(csv_list[row][num])
                if col == num and csv_list[row][6] == 'PC portatiles':
                    pc += int(csv_list[row][num])
                if col == num and csv_list[row][6] == 'Teclados':
                    keyboard += int(csv_list[row][num])

        return make_response(jsonify({'message': 'File saved successfully!',
                                      'data': [mouses, pc, keyboard],
                                      'categories': ['mouses', 'PC portatiles', 'Teclados']}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 400)


@cross_origin
@dash.route('/listcsv/<filename>', methods=['GET'])
def get_csv_data(filename):
    try:
        csv_list: list[list] = []

        with open('./src/temp/'+filename, newline='') as f:
            reader = csv.reader(f)

            for row in reader:
                csv_list.append(row)

        return make_response(jsonify({'message': 'File saved successfully!',
                                      'data': csv_list}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 400)

@cross_origin
@dash.route('/real_price_bar/<filename>', methods=['GET'])
def get_price_data_bar(filename):
    try:
        csv_list: list[list] = []

        with open('./src/temp/'+filename, newline='') as f:
            reader = csv.reader(f)

            for row in reader:
                csv_list.append(row)

        mouses = 0
        pc = 0
        keyboard = 0

        for row in range(len(csv_list)):
            for col in range(len(csv_list[row])):
                if col == 3 and csv_list[row][6] == 'Mouses':
                    mouses += int(csv_list[row][3])
                if col == 3 and csv_list[row][6] == 'PC portatiles':
                    pc += int(csv_list[row][3])
                if col == 3 and csv_list[row][6] == 'Teclados':
                    keyboard += int(csv_list[row][3])

        real_list = [mouses, pc, keyboard]

        mouses = 0
        pc = 0
        keyboard = 0

        for row in range(len(csv_list)):
            for col in range(len(csv_list[row])):
                if col == 4 and csv_list[row][6] == 'Mouses':
                    mouses += int(csv_list[row][4])
                if col == 4 and csv_list[row][6] == 'PC portatiles':
                    pc += int(csv_list[row][4])
                if col == 4 and csv_list[row][6] == 'Teclados':
                    keyboard += int(csv_list[row][4])

        actual_list = [mouses, pc, keyboard]

        return make_response(jsonify({'message': 'File saved successfully!',
                                      'real_data': {'real_list': real_list,
                                                    'name': 'Real Price'},
                                      'actual_data': {'actual_list': actual_list,
                                                      'name': 'Actual Price'},
                                      'categories': [1, 2, 3]}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 400)


@cross_origin
@dash.route('/real_price_pie/<filename>', methods=['GET'])
def get_pie_data(filename):
    try:
        csv_list: list[list] = []

        with open('./src/temp/'+filename, newline='') as f:
            reader = csv.reader(f)

            for row in reader:
                csv_list.append(row)

        mouses = 0
        pc = 0
        keyboard = 0

        for row in range(len(csv_list)):
            for col in range(len(csv_list[row])):
                if csv_list[row][6] == 'Mouses':
                    mouses += 1
                if csv_list[row][6] == 'PC portatiles':
                    pc += 1
                if csv_list[row][6] == 'Teclados':
                    keyboard += 1

        total = mouses + pc + keyboard
        
        return make_response(jsonify({'message': 'File saved successfully!',
                                      'data': [(mouses / total * 100), (pc / total * 100), (keyboard / total * 100)],
                                      'labels': ['mouses', 'PC portatiles', 'Teclados']}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 400)
