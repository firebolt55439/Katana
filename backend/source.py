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
	def search(self, **kwargs) -> list:
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
