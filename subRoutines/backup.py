import os.path
from datetime import datetime
import boto3
import string
import random







class FileSystem():
    def __init__(self) -> None:
        self.fileNames = os.listdir(os.path.join(os.path.dirname(os.path.abspath(os.path.dirname(__file__))), "subRoutines"))
        self.fileNames.remove('backup.py')
        pass

    def getFullPath(self):
        return os.path.join(os.path.dirname(os.path.abspath(os.path.dirname(__file__))), "subRoutines")+'/'

    def getFileNames(self):
        return self.fileNames
        


class fileUploader():
    

    def __init__(self) -> None:

        self.fileSystem = FileSystem()
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

        fileNames = self.fileSystem.getFileNames()

        for fileName in fileNames:
            print(fileName)

            s3_client.upload_file(self.fileSystem.getFullPath()+fileName, 'testbackup-corelogic', self.randomKey()+'.json')
            os.remove(self.fileSystem.getFullPath()+fileName)



i = fileUploader()