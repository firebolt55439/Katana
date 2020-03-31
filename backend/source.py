##
# Class that represents a query item.
##
class QueryItem(object):
	def __init__(self, imdb_id: str, title: str, category: str, season: str, episode: str):
		self.imdb_id = imdb_id
		self.title = title
		self.category = category
		self.season = season
		self.episode = episode

##
# Abstract class for a source.
##
from abc import ABC, abstractmethod

class Source(ABC):
	@property
	@abstractmethod
	def source_name(self) -> str:
		return "<none>"

	@abstractmethod
	def can_handle(self, item: QueryItem) -> bool:
		return False

	@abstractmethod
	def search(self, item: QueryItem) -> list:
		return []

##
# Class that represents a source item.
##
class SourceItem(object):
	def __init__(self, title: str, source: Source, quality: str, embed: str, ddl: str):
		self.title = title
		self.source = source.source_name
		self.quality = quality
		self.embed = embed
		self.ddl = ddl
