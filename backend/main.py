import os
import flask
from flask import abort, request, jsonify
from flask_cors import CORS
from source import QueryItem
from functools import wraps

APP_NAME = "Katana Backend"
SOURCES_DIRECTORY = "sources/"
DEBUG_ENABLED = False

app = flask.Flask(APP_NAME, static_url_path="", static_folder="static")
app.config["DEBUG"] = DEBUG_ENABLED
CORS(app, expose_headers="Authorization")

# Import all sources
import os
import importlib.util

sources = []
for (module_index, file) in enumerate(os.listdir(SOURCES_DIRECTORY)):
    if file.endswith(".py"):
        path = os.path.join(SOURCES_DIRECTORY, file)
        spec = importlib.util.spec_from_file_location(
            f"dynamic_source_{module_index}", path
        )
        module_object = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module_object)
        main_source = module_object.MainSource()
        sources.append(main_source)


def require_secret(fn):
    from secrets.secret import SECRET

    @wraps(fn)
    def inner(*args, **kwargs):
        if "token" not in request.args or request.args["token"] != SECRET:
            abort(403, description="Access denied")
        return fn(*args, **kwargs)

    return inner


##
# Global Object Definitions:
# [QueryItem Object]: {
# 	"imdb_id" => IMDb ID or "<none>"
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
@app.route("/subtitles", methods=["GET"])
@require_secret
def subtitles():
    return jsonify([])


##
# API Endpoint: /sources/available
# Method: GET
# Parameters: QueryItem Object
# Return Type: List of SourceID's (generic types)
##
@app.route("/sources/available", methods=["GET"])
@require_secret
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
# Parameters: QueryItem Object, augmented with an additional field: {
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
@app.route("/sources/individual", methods=["GET"])
@require_secret
def individual_source():
    item = QueryItem.from_args(request.args)
    source_id = int(request.args["source"])
    print("Searching source:", sources[source_id].source_name)
    found_sources = sources[source_id].search(item)
    serialized_sources = [source.__dict__ for source in found_sources]
    return jsonify(serialized_sources)


# Route for index.html
@app.route("/")
def root():
    return app.send_static_file("index.html")


# Catch-all route
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    return app.send_static_file(path)


# Main app execution hook
if __name__ == "__main__":
    if "PORT" in os.environ:
        # Heroku instance running on Gunicorn
        app.run(threaded=True)
    else:
        # Local dev environment
        app.run(threaded=True, host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
