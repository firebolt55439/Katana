import flask
from flask import request, jsonify

APP_NAME = "Katana Backend"
DEBUG_ENABLED = True

app = flask.Flask(APP_NAME)
app.config["DEBUG"] = DEBUG_ENABLED

##
# Global Object Definitions:
# [ItemParameters Object]: {
# }
##

books = []

##
# API Endpoint: /subtitles
# Method: GET
# Parameters: ItemParameters Object
# Return Type: JSON Subtitles Object
# [Subtitles Object]: [
# 	"subtitles" => (possibly empty) list of Subtitle Objects
# ]
# [Subtitle Object]: {
# 	"source" => Source of subtitle (e.g. OpenSubtitles)
# 	"link" => CORS-enabled link to subtitle file (SRT assumed)
# }
##
@app.route('/subtitles', methods=['GET'])
def sources():
    return jsonify(books)

##
# API Endpoint: /sources
# Method: GET
# Parameters: ItemParameters Object
# Return Type: JSON Sources Object
# [Sources Object]: [
# 	"sources" => (possibly empty) list of Source Objects
# ]
# [Source Object]: {
# 	"title" => title of item
# 	"source" => textual description of source (e.g. Hulu)
# 	"embed" => embedded video player link, if applicable
# 	"ddl" => direct download link, if applicable
# 	"quality" => quality description, if applicable (e.g. SD, 720p, 4K)
# }
##
@app.route('/sources', methods=['GET'])
def sources():
    return jsonify(books)

app.run()
