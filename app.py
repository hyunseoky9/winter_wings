from flask import Flask, render_template, url_for
from flask import request, redirect, jsonify, flash
import random
import string
#import httplib2
from flask import make_response
import requests
from datetime import date
app = Flask(__name__)

# main page
@app.route('/')
@app.route('/winterwings')
def main():
	return render_template('main.html')

@app.route('/form', methods=['GET','POST'])
def form():
	if request.method == 'POST':
		filename = str(date.today().year) + str(date.today().month) + str(date.today().day)
		fh = open('./data/'+ filename +'.csv','w')
		name = request.form['name']
		date = request.form['day'] + '/' + request.form['month'] + '/' + request.form['year']
		start = request.form['hr'] + ':' request.form['min'] + request.form['ampm']
		finish = request.form['hr2'] + ':' request.form['min2'] + request.form['ampm2']
		place = request.form['place']
		lat = request.form['lat']
		lng = request.form['lng']
		radius = request.form['radius']
		feeder = request.form['feeder']
		env = request.form['env']
		temp = request.form['temp']
		preciptype = request.form['precip-type']
		precipwhen = request.form['precip-when']
		preciphow = request.form['precip-how']
		snowcover = request.form['snowcover']
		snowcondition = request.form['snowcondition']
		fh.write(name)
		fh.close()
		print(name)
		return redirect(url_for('main'))
	else:
		return render_template('form.html')

if __name__ == '__main__':
	app.secret_key = 'super_secret_key'
	app.debug = True
	app.run(host='0.0.0.0', port=5000)
