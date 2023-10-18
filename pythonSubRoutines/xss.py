import json
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

        

class fileUploader():
    

    def __init__(self) -> None:
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
        s3_client.upload_file('data/'+file_names[0], 'aggregate-reports-ucp', self.randomKey()+'-cookie_data.json')
        self.deleteFiles()
    
    def deleteFiles(self):
        for file_name in file_names:
            if file_name != 'keep.txt':
                os.remove('data/'+file_name)


i = fileUploader()