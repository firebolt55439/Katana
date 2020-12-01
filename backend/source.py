##
# Class that represents a query item.
##
class QueryItem(object):
    def __init__(
        self, imdb_id: str, category: str, title="", season=None, episode=None
    ):
        self.imdb_id = imdb_id.strip() if imdb_id else imdb_id
        self.title = title.strip() if title else title
        self.category = category.strip() if category else category
        self.season = int(season) if season else season
        self.episode = int(episode) if episode else episode

    def from_args(args):
        return QueryItem(
            args["imdb_id"],
            args["category"],
            **({k: args[k] for k in args if k in ["title", "season", "episode"]})
        )


##
# Abstract class for a source.
##
from abc import ABC, abstractmethod


class SourceItem:  # temporary forward definition
    pass


class Source(ABC):
    @property
    @abstractmethod
    def source_name(self) -> str:
        return "<none>"

    def get_source(self, *args, **kwargs) -> SourceItem:
        return SourceItem(self.source_name, *args, **kwargs)

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
    def __init__(self, source: str, title: str, quality: str, embed: str, ddl: str):
        self.title = title.strip() if title else title
        self.source = source.strip()
        self.quality = quality.strip()
        self.embed = embed.strip() if embed else embed
        self.ddl = ddl.strip() if ddl else ddl
