from flask import Flask, request
import findWordCount
import DataScraper
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# yet to complete dont run this
# url = input("Enter the URL you want to scrape: ")
# scrapped_data = DataScraper.getWepageData(url)
# algorithmselected = input("NaiveStringMatching  KMPAlgorithm  RabinKarbAlgorithm")

wordCount = {}
process_time = {}

@app.route("/", methods=["POST"])
def sendProcessTimeAndWordCountand():

    data = request.json
    url = data["data"]
    algorithmselected = data["selectedCheckboxes"]

    scrapped_data = DataScraper.getWepageData(url)
    
    # algorithmselected = ["NaiveStringMatching", "KMPAlgorithm", "RabinKarbAlgorithm"]

    wordCount, process_time = findWordCount.getProcessTimeAndWordCount(scrapped_data, algorithmselected)
    
    # print('Printing URL')
    # print(url)
    # print(wordCount)
    # print(process_time)
    
    return {"data" : wordCount, "process_time": process_time }


if __name__ == "__main__":
    app.run()
