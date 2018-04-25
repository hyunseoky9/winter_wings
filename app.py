from flask import Flask, render_template, url_for
from flask import request, redirect, jsonify, flash
import random
import string
#import httplib2
from flask import make_response
import requests
import datetime 
app = Flask(__name__)

# main page
@app.route('/')
@app.route('/winterwings')
def main():
	return render_template('main.html')

@app.route('/form', methods=['GET','POST'])
def form():
	if request.method == 'POST':
		now = datetime.datetime.now()
		filename = str(now.year) + '-' + str(now.month) + '-' + str(now.day) + '-' + str(now.hour) + '-' + str(now.minute)
		fh = open('./data/'+ filename +'.csv','w')		
		fh.write('name,'+request.form['name']+'\n')
		if request.form['day'] == '' and request.form['month'] == '' and request.form['year'] == '':
			fh.write("day,")
		else:
			fh.write('day,'+request.form['day'] + '/' + request.form['month'] + '/' + request.form['year'] +'\n')
		fh.write('hr,'+request.form['hr'] + ':' + request.form['min'] + request.form['ampm'] +'\n')
		fh.write('hr2,'+request.form['hr2'] + ':' + request.form['min2'] + request.form['ampm2']+'\n')
		fh.write('place,'+request.form['place']+'\n')
		fh.write('lat,'+request.form['lat']+'\n')
		fh.write('lng,'+request.form['lng']+'\n')
		fh.write('radius,'+request.form['radius']+'\n')
		fh.write('feeder,'+request.form['feeder']+'\n')
		fh.write('env,'+request.form['env']+'\n')
		fh.write('temp,'+request.form['temp']+'\n')
		fh.write('precip-type,'+request.form['precip-type']+'\n')
		fh.write('precip-when,'+request.form['precip-when']+'\n')
		fh.write('precip-how,'+request.form['precip-how']+'\n')
		fh.write('snowcover,'+request.form['snowcover']+'\n')
		fh.write('snowcondition,'+request.form['snowcondition']+'\n')
		spnum = int(request.form['sp-count'])
		sessions = 4
		names = ['Accipiter_nisus','Buteo_japonicus', 'Falco_tinnunculus', 'Streptopelia_orientalis', 'Columba_livia', 'Dendrocopos_kizuki',
			'Dendrocopos_major', 'Picus_canus', 'Motacilla_alba', 'Phoenicurus_auroreus', 'Turdus_eunomus', 'Turdus_naumanni', 'Poecile_palustris',
			'Periparus_ater', 'Sittiparus_varius', 'Parus_minor', 'Aegithalos_caudatus', 'Sinosuthera_webbiana', 'Sitta_europaea', 'Lanius_bucephalus',
			'Hypsipetes_amaurotis', 'Pica_pica', 'Garrulus_glandarius', 'Corvus_macrorhynchos', 'Corvus_corone', 'Spodiopsar_cineraceus', 'Passer_montanus',
			'Fringilla_montifringilla', 'Chloris_sinica', 'Coccothraustes_coccothraustes']
		print('names length=%d'%(len(names)))
		print("spnum = %d"%(spnum))
		more_names = []
		if len(names) < spnum:
			for i in range(spnum-len(names)):
				new_name = request.form['sp-name-'+str(i+len(names))]
				more_names.append(new_name)
		names = names + more_names
		print(names)
		#for i in range(spnum):
		#	obs = []
		#	for j in range(sessions):
		#		count = request.form['count'+str(i)+'-'+str((j+1))]
		#		if count == '':
		#			count = 0
		#		else:
		#			count = int(count)
		#		obs.append(count)
		#	fh.write("%s,%d,%d,%d,%d\n"%(names[i],obs[0],obs[1],obs[2],obs[3]))		
		fh.close()
		return redirect(url_for('main'))
	else:
		return render_template('form.html')

if __name__ == '__main__':
	app.secret_key = 'super_secret_key'
	app.debug = True
	app.run(host='0.0.0.0', port=5000)
