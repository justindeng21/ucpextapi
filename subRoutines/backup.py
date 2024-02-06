import os.path
from datetime import datetime
import boto3
import string
import random
import sys



class File():
    def __init__(self,fileName) -> None:
        self.fileName = fileName
        pass

    def getFullPath(self):
        return os.path.join(os.path.dirname(os.path.abspath(os.path.dirname(__file__))), "subRoutines")+'/'+self.fileName

    def getFileName(self):
        return self.fileName
    
class fileUploader():
    

    def __init__(self) -> None:

        self.file = File(sys.argv[1])
        self.uploadFiles()
        pass


    def randomKey(self):
        return ''.join(random.choices(string.ascii_lowercase + string.digits, k=7))

    def uploadFiles(self) -> None:
        path = self.file.getFullPath()
        s3_client = boto3.client(
            's3',
            aws_access_key_id=os.environ.get('awsAccessID'),
            aws_secret_access_key=os.environ.get('awsSecretKey')
        )
        
        s3_client.upload_file(path, 'umgbackup', self.file.getFileName())
        os.remove(path)



i = fileUploader()