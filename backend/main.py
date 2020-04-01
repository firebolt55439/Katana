import flask
from flask import request, jsonify
from flask_cors import CORS
from source import QueryItem

APP_NAME = "Katana Backend"
SOURCES_DIRECTORY = "sources/"
DEBUG_ENABLED = True

app = flask.Flask(APP_NAME)
app.config["DEBUG"] = DEBUG_ENABLED
CORS(app)

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
		main_source = module_object.MainSource()
		sources.append(main_source)

##
# Global Object Definitions:
# [QueryItem Object]: {
# 	"imdb_id" => IMDb ID
# 	"category" => "tv" or "movie"
# 	"title" => title (can be empty)
# 	"season" => season number, if applicable
# 	"episode" => episode number, if applicable
# }
##

##
# API Endpoint: /subtitles
# Method: GET
# Parameters: QueryItem Object
# Return Type: List of Subtitle Objects
# [Subtitle Object]: {
# 	"source" => Source of subtitle (e.g. OpenSubtitles)
# 	"link" => CORS-enabled link to subtitle file (SRT assumed)
# }
##
@app.route('/subtitles', methods=['GET'])
def subtitles():
    return jsonify([])

##
# API Endpoint: /sources/available
# Method: GET
# Parameters: QueryItem Object
# Return Type: List of SourceID's (generic types)
##
@app.route('/sources/available', methods=['GET'])
def available_sources():
	item = QueryItem.from_args(request.args)
	avail = []
	for (idx, source) in enumerate(sources):
		if source.can_handle(item):
			avail.append(idx)
	return jsonify(avail)

##
# API Endpoint: /sources/individual
# Method: GET
# Parameters: QueryItem Object, augmented with an additiona field: {
# 	"source": source ID, returned from /sources/available
# }
# Return Type: List of Source Objects
# [Source Object]: {
# 	"title" => item title (e.g. a filename)
# 	"source" => source name (e.g. Hulu)
# 	"quality" => quality description (e.g. SD, 720p, 4K)
# 	"embed" => embedded video player link, if applicable
# 	"ddl" => direct download link, if applicable
# }
##
@app.route('/sources/individual', methods=['GET'])
def individual_source():
	item = QueryItem.from_args(request.args)
	source_id = int(request.args["source"])
	found_sources = sources[source_id].search(item)
	serialized_sources = [source.__dict__ for source in found_sources]
	return jsonify(serialized_sources)

app.run()
