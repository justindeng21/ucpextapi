import json
import countries
import os.path
from datetime import datetime
import csv
import boto3
import string
import random

cwd = os.path.abspath(os.path.dirname(__file__))
data_relative_path = os.path.join(os.path.dirname(cwd), "data")
file_names = os.listdir(data_relative_path)
file_names.remove('keep.txt')
domain = ''


class DateBasedAggregation:
    def __init__(self):
        self.fileName = 'aggregatedData/dateBasedAggregation.csv'
        self.aggregatedData = {}
        self.getAllKeys()
        self.aggregateData()
        self.writeToCSV()
        return

    def getFileLocation(self):
        return self.fileName

    def getAllKeys(self):
        keys = []
        dataframe = {}
        for i in file_names:
            data_file = open('data/'+i)
            data = json.load(data_file)
            keys = keys + list(data['company'].keys())
        keys = list(set(keys))
        keys.sort(key = lambda date: datetime.strptime(date, '%Y-%m-%d'))
        for key in keys:
            dataframe[key] = {'Date':key, 'Sum of unique site visitors':0,'Sum of visitors requiring consent':0, 'Sum of consented visitors':0, 'Sum of newly consented visitors':0,'Calculated value of users who declined consent/took no action':0,'Consent Rate':0}
        self.aggregatedData = dataframe

    def aggregateData(self):
        for file_name in file_names:
            data_file = open('data/'+file_name)
            data = json.load(data_file)
            keys = data['company'].keys()
            for key in keys:
                for country in data['company'][key]:
                    self.aggregatedData[key]['Sum of unique site visitors'] = self.aggregatedData[key]['Sum of unique site visitors'] + country['count']
                    self.aggregatedData[key]['Sum of consented visitors'] = self.aggregatedData[key]['Sum of consented visitors'] + country['consentcount']
                    self.aggregatedData[key]['Sum of newly consented visitors'] = self.aggregatedData[key]['Sum of newly consented visitors'] + country['newconsents']
                    if country['consentrequired'] == True:
                        self.aggregatedData[key]['Sum of visitors requiring consent'] = self.aggregatedData[key]['Sum of visitors requiring consent'] + country['count']
                    self.aggregatedData[key]['Calculated value of users who declined consent/took no action'] = self.aggregatedData[key]['Sum of unique site visitors'] - self.aggregatedData[key]['Sum of consented visitors']
                    self.aggregatedData[key]['Consent Rate'] = str(round(self.aggregatedData[key]['Sum of consented visitors']/self.aggregatedData[key]['Sum of visitors requiring consent'] * 100,2))+'%'
        return

    def writeToCSV(self):
        with open(self.fileName, 'w',newline='') as f:
                writer = csv.writer(f)
                writer.writerow(['url:'+domain])
        field_names= ['Date', 'Sum of unique site visitors', 'Sum of visitors requiring consent','Sum of consented visitors','Sum of newly consented visitors','Calculated value of users who declined consent/took no action','Consent Rate']
        finalAgg = {'Date':'Total', 'Sum of unique site visitors':0,'Sum of visitors requiring consent':0, 'Sum of consented visitors':0, 'Sum of newly consented visitors':0,'Calculated value of users who declined consent/took no action':0,'Consent Rate':0}
        with open(self.fileName, 'a',newline='') as f:
                writer = csv.DictWriter(f,fieldnames = field_names)
                writer.writeheader()

        for key in self.aggregatedData:
            finalAgg['Sum of unique site visitors'] = finalAgg['Sum of unique site visitors'] + self.aggregatedData[key]['Sum of unique site visitors']
            finalAgg['Sum of consented visitors'] = finalAgg['Sum of consented visitors'] + self.aggregatedData[key]['Sum of consented visitors']
            finalAgg['Sum of newly consented visitors'] = finalAgg['Sum of newly consented visitors'] + self.aggregatedData[key]['Sum of newly consented visitors']
            finalAgg['Sum of visitors requiring consent'] = finalAgg['Sum of visitors requiring consent'] + self.aggregatedData[key]['Sum of visitors requiring consent']
            finalAgg['Calculated value of users who declined consent/took no action'] = finalAgg['Sum of unique site visitors'] - finalAgg['Sum of consented visitors']
            finalAgg['Consent Rate'] = str(round(finalAgg['Sum of consented visitors']/finalAgg['Sum of visitors requiring consent'] * 100,2))+'%'

            with open(self.fileName, 'a',newline='') as f:
                writer = csv.DictWriter(f,fieldnames = field_names)
                writer.writerow(self.aggregatedData[key])

        with open(self.fileName, 'a',newline='') as f:
            writer = csv.DictWriter(f,fieldnames = field_names)
            writer.writerow(finalAgg)



class CountryBasedAggregation:
    def __init__(self):
        self.fileName = 'aggregatedData/countryBasedAggregation.csv'
        self.aggregatedData = {}
        self.getAllKeys()
        self.aggregateData()
        self.writeToCSV()
        return

    def getFileLocation(self):
        return self.fileName

    def getAllKeys(self):
        dataframe = {}
        for country in countries.definitions:
            dataframe[country['geonameId']] = {'Name':country['name'], 'Sum of unique site visitors':0,'Sum of visitors requiring consent':0, 'Sum of consented visitors':0, 'Sum of newly consented visitors':0,'Calculated value of users who declined consent/took no action':0,'Consent Rate':0}
        self.aggregatedData = dataframe

    def aggregateData(self):
        for file_name in file_names:
            data_file = open('data/'+file_name)
            data = json.load(data_file)
            keys = data['company'].keys()
            for key in keys:
                for country in data['company'][key]:
                    self.aggregatedData[int(country['country'])]['Sum of unique site visitors'] = self.aggregatedData[int(country['country'])]['Sum of unique site visitors'] + country['count']
                    self.aggregatedData[int(country['country'])]['Sum of consented visitors'] = self.aggregatedData[int(country['country'])]['Sum of consented visitors'] + country['consentcount']
                    self.aggregatedData[int(country['country'])]['Sum of newly consented visitors'] = self.aggregatedData[int(country['country'])]['Sum of newly consented visitors'] + country['newconsents']
                    if country['consentrequired'] == True:
                        self.aggregatedData[int(country['country'])]['Sum of visitors requiring consent'] = self.aggregatedData[int(country['country'])]['Sum of visitors requiring consent'] + country['count']
                    self.aggregatedData[int(country['country'])]['Calculated value of users who declined consent/took no action'] = self.aggregatedData[int(country['country'])]['Sum of unique site visitors'] - self.aggregatedData[int(country['country'])]['Sum of consented visitors']
                    try:
                        self.aggregatedData[int(country['country'])]['Consent Rate'] = str(round(self.aggregatedData[int(country['country'])]['Sum of consented visitors']/self.aggregatedData[int(country['country'])]['Sum of visitors requiring consent'] * 100,2))+'%'
                    except:
                        self.aggregatedData[int(country['country'])]['Consent Rate'] = '100%'

        return

    def writeToCSV(self):
        with open(self.fileName, 'w',newline='') as f:
                writer = csv.writer(f)
                writer.writerow(['url:'+domain])
        field_names= ['Name', 'Sum of unique site visitors', 'Sum of visitors requiring consent','Sum of consented visitors','Sum of newly consented visitors','Calculated value of users who declined consent/took no action','Consent Rate']
        finalAgg = {'Name':'Total', 'Sum of unique site visitors':0,'Sum of visitors requiring consent':0, 'Sum of consented visitors':0, 'Sum of newly consented visitors':0,'Calculated value of users who declined consent/took no action':0,'Consent Rate':0}
        with open(self.fileName, 'a',newline='') as f:
                writer = csv.DictWriter(f,fieldnames = field_names)
                writer.writeheader()
        for key in self.aggregatedData:
            finalAgg['Sum of unique site visitors'] = finalAgg['Sum of unique site visitors'] + self.aggregatedData[key]['Sum of unique site visitors']
            finalAgg['Sum of consented visitors'] = finalAgg['Sum of consented visitors'] + self.aggregatedData[key]['Sum of consented visitors']
            finalAgg['Sum of newly consented visitors'] = finalAgg['Sum of newly consented visitors'] + self.aggregatedData[key]['Sum of newly consented visitors']
            finalAgg['Sum of visitors requiring consent'] = finalAgg['Sum of visitors requiring consent'] + self.aggregatedData[key]['Sum of visitors requiring consent']
            finalAgg['Calculated value of users who declined consent/took no action'] = finalAgg['Sum of unique site visitors'] - finalAgg['Sum of consented visitors']
            finalAgg['Consent Rate'] = str(round(finalAgg['Sum of consented visitors']/finalAgg['Sum of visitors requiring consent'] * 100,2))+'%'

            with open(self.fileName, 'a',newline='') as f:
                writer = csv.DictWriter(f,fieldnames = field_names)
                writer.writerow(self.aggregatedData[key])

        with open(self.fileName, 'a',newline='') as f:
            writer = csv.DictWriter(f,fieldnames = field_names)
            writer.writerow(finalAgg)







class fileUploader():


    def __init__(self) -> None:
        self.countryBasedReport = CountryBasedAggregation()
        self.dateBasedReport = DateBasedAggregation()
        self.uploadFiles()
        pass


    def randomKey(self):
        return ''.join(random.choices(string.ascii_lowercase + string.digits, k=7))

    def uploadFiles(self) -> None:
        s3_client = boto3.client(
            's3',
            aws_access_key_id=os.environ.get('awsAccessID'),
            aws_secret_access_key=os.environ.get('awsSecretKey')
        )
        s3_client.upload_file(self.countryBasedReport.getFileLocation(), 'aggregate-reports-ucp', self.randomKey()+'-countryBasedAggregation.csv')
        s3_client.upload_file(self.dateBasedReport.getFileLocation(), 'aggregate-reports-ucp', self.randomKey()+'-dateBasedAggregation.csv')
        self.deleteFiles()

    def deleteFiles(self):
        os.remove(self.countryBasedReport.getFileLocation())
        os.remove(self.dateBasedReport.getFileLocation())
        for file_name in file_names:
            if file_name != 'keep.txt':
                os.remove('data/'+file_name)


i = fileUploader()