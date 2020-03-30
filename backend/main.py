import flask
from flask import request, jsonify

APP_NAME = "Katana Backend"
SOURCES_DIRECTORY = "sources/"
DEBUG_ENABLED = True

app = flask.Flask(APP_NAME)
app.config["DEBUG"] = DEBUG_ENABLED

# Import all sources
import os
import importlib.util
sources = []
for (module_index, file) in enumerate(os.listdir(SOURCES_DIRECTORY)):
	if file.endswith(".py"):
		path = os.path.join(SOURCES_DIRECTORY, file)
		spec = importlib.util.spec_from_file_location(f"dynamic_source_{module_index}", path)
		module_object = importlib.util.module_from_spec(spec)
		spec.loader.exec_module(module_object)
		print(foo.MainSource)
		main_source = foo.MainSource
		sources.append(main_source)

##
# Global Object Definitions:
# [ItemParameters Object]: {
# }
##

##
# API Endpoint: /subtitles
# Method: GET
# Parameters: ItemParameters Object
# Return Type: List of Subtitle Objects
# [Subtitle Object]: {
# 	"source" => Source of subtitle (e.g. OpenSubtitles)
# 	"link" => CORS-enabled link to subtitle file (SRT assumed)
# }
##
@app.route('/subtitles', methods=['GET'])
def subtitles():
    return jsonify(books)

##
# API Endpoint: /sources/available
# Method: GET
# Parameters: ItemParameters Object
# Return Type: List of SourceID's (generic types)
##
@app.route('/sources/available', methods=['GET'])
def available_sources():
    return jsonify(books)

##
# API Endpoint: /sources/individual
# Method: GET
# Parameters: {
# 	"item": ItemParameters Object
# 	"source": source ID, returned from /sources/available
# }
# Return Type: List of Source Objects
# [Source Object]: {
# 	"title" => title of item
# 	"source" => source name (e.g. Hulu)
# 	"quality" => quality description (e.g. SD, 720p, 4K)
# 	"embed" => embedded video player link, if applicable
# 	"ddl" => direct download link, if applicable
# }
##
@app.route('/sources/individual', methods=['GET'])
def individual_source():
    return jsonify(books)

app.run()
